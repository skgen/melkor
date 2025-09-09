import type { Plugin, UserConfig } from 'vite';

import { extractMeta } from './meta/extract-meta';

interface Config {
  root?: string;
  debug?: boolean;
}

export function vitePluginBuildLib(config: Config): Plugin {
  let componentsWithCss: string[] = [];
  // let hasSourceMaps = false;

  // function log(message?: any, ...optionalParams: any[]) {
  //   if (config.debug) {
  //     console.log(message, ...optionalParams);
  //   }
  // }

  return {
    name: 'melkor',
    apply: 'build',
    config(userConfig: UserConfig) {
      const { entry } = userConfig.build?.lib || {};
      // hasSourceMaps = !!userConfig.build?.sourcemap;
      if (!entry)
        throw new Error('Required field "build.lib.entry" could not be found');
      return {
        build: {
          cssCodeSplit: true,
          lib: {
            entry,
          },
          rollupOptions: {
            output: {
              preserveModules: true,
              preserveModulesRoot: config?.root ?? 'src',
            },
          },
        },
      };
    },
    transform(code, id) {
      // It's a vue file
      const res = id.match(/(\w+).vue$/);
      const component = res ? res[1] : null;
      if (component) {
        // It has a style section
        if (code.match(/(\w+).vue\?[a-z&=]+style/)) {
          if (!componentsWithCss.includes(component)) {
            componentsWithCss.push(component);
          }
        }
        else {
          componentsWithCss = componentsWithCss.filter(c => c !== component);
        }
      }
    },
    banner(chunk) {
      const res = chunk.name.match(/(\w+).vue/);
      const component = res ? res[1] : null;
      const cssImport = component ? `import './${component}.css';` : null;

      return new Promise<string>((resolve) => {
        if (chunk.fileName.endsWith('.vue.js') && cssImport && component && componentsWithCss.includes(component)) {
          resolve(cssImport);
        }
        else {
          resolve('');
        }
      });
    },
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const originalFile = bundle[fileName];
        if (originalFile.fileName.endsWith('.js')) {
          let newFileName = originalFile.fileName;
          if (originalFile.fileName.endsWith('.vue.js')) {
            newFileName = fileName.replace('.vue.js', '.js');
          }
          const newFile = {
            ...originalFile,
            fileName: newFileName,
          };
          if (newFile.type === 'chunk') {
            newFile.code = newFile.code.replace(/(\.vue\.js)/g, '.js');
            newFile.code = newFile.code.replace(/import ["']([./A-Za-z]+)(.vue[23]?.js)["';\n]+/g, '');
          }
          bundle[newFileName] = newFile;
          if (originalFile.fileName.endsWith('.vue.js')
            || originalFile.fileName.endsWith('.vue3.js')
            || originalFile.fileName.endsWith('.vue2.js')) {
            delete bundle[originalFile.fileName];
          }
        }
      }
    },
    closeBundle() {
      extractMeta();
    },
  };
};
