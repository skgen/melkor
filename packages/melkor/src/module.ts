import type { DeepPartial } from '@skgn/kit';
import type {
  KitModule,
} from '@skgn/melkor-kit';
import type { NuxtModule } from 'nuxt/schema';

import fs from 'node:fs';
import path from 'node:path';

import { addComponent, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import {
  createRuntimeResolver,
  namespaces,
  resolveNuxtModules,
  vNamespace,
} from '@skgn/melkor-kit';

import { createMelkorOptions, type MelkorOptions, mergeConfig, STORAGE_THEME_KEY, Theme } from './runtime/vue/features/config';

const pkg = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../package.json'), { encoding: 'utf-8' }));

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    melkor: ModuleOptions;
  }
}

export interface ModuleOptions extends MelkorOptions {
  prefix?: {
    components?: string;
    // composables?: string;
  };
};

export interface ModuleHooks {
}

export interface ModuleRuntimeHooks {
}

export interface ModuleRuntimeConfig {
  melkor: ModuleOptions;
}

export interface ModulePublicRuntimeConfig {
}

const defaultModuleOptions: ModuleOptions = {
  ...createMelkorOptions(),
  prefix: {
    components: 'Mk',
  },
};

function createModuleOptions(moduleOptions?: DeepPartial<ModuleOptions>): ModuleOptions {
  return mergeConfig({}, moduleOptions, defaultModuleOptions);
}

export default defineNuxtModule<DeepPartial<ModuleOptions>>({
  meta: {
    name: pkg.name,
    version: pkg.version,
    configKey: 'melkor',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.dirname);
    const runtimeResolver = createRuntimeResolver(import.meta.dirname);

    const options = createModuleOptions(_options);

    // Needed to pass down to the plugin
    nuxt.options.runtimeConfig.public.melkor = options;

    const scopedModules = await resolveNuxtModules(runtimeResolver);

    /* STUBS */

    // @todo check to remove
    // nuxt.options.alias[`${vNamespace}/stubs`] = resolver.resolve(runtimeResolver.vueDir, `stubs`);

    /* STYLES */

    // @todo check if needed to remove
    nuxt.options.alias[`${vNamespace}/styles/scss`] = resolver.resolve(runtimeResolver.vueDir, `styles/index.scss`);
    // @todo check if needed to remove
    nuxt.options.alias[`${vNamespace}/styles/mixins`] = resolver.resolve(runtimeResolver.vueDir, `styles/mixins.scss`);

    /* COMPONENTS */

    scopedModules.components.forEach((component) => {
      if (component.type === 'sfc') {
        addComponent({
          name: `${options.prefix?.components}${component.name}`,
          filePath: component.filePath,
        });
      }
    });

    /* COMPOSABLES */

    // @todo need to allow prefixing
    // if (!options.prefix?.composables) {
    addImportsDir(resolver.resolve(runtimeResolver.nuxtDir, 'composables'));
    // }
    // else {
    //   const files = globSync(path.resolve(runtimeResolver.vueDir, 'composables/*.ts'));
    //   // const composables = await import(resolver.resolve(runtimeResolver.nuxtDir, 'composables'));
    //   console.log(files);

    //   addImportsSources([
    //     {
    //       // 'from'
    //       // from:
    //       from: resolver.resolve(runtimeResolver.vueDir, 'composables/useToast'),
    //       imports: [
    //         {
    //           name: 'useToast',
    //           as: `use${options.prefix.composables}Toast`,
    //         },
    //       ],
    //       // imports: [
    //       //   {
    //       //     imports: [
    //       //       {
    //       //         im
    //       //       }
    //       //     ]
    //       //   }
    //       // ]
    //     },
    //   ]);
    // const keys = Object.keys(composables);
    // const
    // addImportsSources({
    //   ''
    // });
    // console.log(composables);
    // }

    /* FEATURES */

    // nuxt.options.alias[`${vNamespace}/features`] = resolver.resolve(runtimeResolver.nuxtDir, `features/index`);

    addImportsDir(resolver.resolve(runtimeResolver.nuxtDir, 'features'));

    /* PLUGIN */
    addPlugin({
      src: resolver.resolve(runtimeResolver.nuxtDir, 'plugin'),
    });

    nuxt.hooks.hook('vite:extend', ({ config }) => {
      if (!config.plugins) {
        config.plugins = [];
      }

      config.plugins.push({
        name: 'melkor:resolve-internal',
        enforce: 'pre',
        async resolveId(id, importer) {
          // Passes if import comes from melkor
          if (!importer || !path.normalize(importer).includes(runtimeResolver.dir)) {
            return;
          }

          // Passes if import is relative
          if (!/^\.{1,2}\//.test(id)) {
            return;
          }

          const splitted = id.split(path.sep);
          const maybeNamespace = splitted[splitted.length - 1];

          let module: KitModule | null = null;
          if (maybeNamespace && (namespaces as Readonly<string[]>).includes(maybeNamespace)) {
            const namespace = maybeNamespace as typeof namespaces[number];
            module = scopedModules[namespace].find(m => m.id === 'index') ?? null;
          }
          if (module) {
            return module.filePath;
          }
        },
      });
    });

    /* SSR theme */

    const ssrThemePath = resolver.resolve(runtimeResolver.nuxtDir, 'ssr-theme.min.js');
    // Bypass if file doesn't exists, aka on prepare
    // ssr-theme is built on prebuild script but after nuxt-module-build prepare
    if (fs.existsSync(ssrThemePath)) {
      const scriptCtx = {
        storageKey: STORAGE_THEME_KEY,
        themes: JSON.stringify(options.themes),
        ThemeEnum: JSON.stringify(Theme),
      };

      const ssrThemeScript = fs.readFileSync(resolver.resolve(runtimeResolver.nuxtDir, 'ssr-theme.min.js'), 'utf-8')
        .replace(/<%= ctx\.([^ ]+) %>/g, (_, option: keyof typeof scriptCtx) => scriptCtx[option])
        .trim();

      nuxt.hook('nitro:config', (config) => {
        config.virtual = config.virtual || {};
        config.virtual[`${vNamespace}/nuxt/ssr-theme`] = `export const script = ${JSON.stringify(ssrThemeScript, null, 2)}`;
        config.plugins = config.plugins || [];
        config.plugins.push(resolver.resolve(runtimeResolver.nuxtDir, 'nitro-plugin'));
      });
    }
  },
}) as NuxtModule<DeepPartial<ModuleOptions>>;
