import type { DeepPartial } from '@skgn/kit';

import fs from 'node:fs';
import path from 'node:path';

import { addComponent, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import {
  createRuntimeResolver,
  resolveNuxtComponents,
  vNamespace,
} from '@skgn/melkor-kit';

import { createMelkorOptions, type MelkorOptions, mergeConfig, STORAGE_THEME_KEY, Theme } from './runtime/vue/features/config';
// Melkor
// import { loadMeta } from './namespaces/load-meta';
// import {  } from './runtime/vue/features';

const pkg = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../package.json'), { encoding: 'utf-8' }));

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    melkor: MelkorOptions;
  }
}

export type ModuleOptions = MelkorOptions & {
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
  public: {
    melkor: ModuleOptions;
  };
}

export interface ModulePublicRuntimeConfig {
}

const defaultModuleOptions: ModuleOptions = {
  ...createMelkorOptions(),
  prefix: {
    components: 'Mk',
  },
};

export function createModuleOptions(moduleOptions?: DeepPartial<ModuleOptions>): ModuleOptions {
  return mergeConfig({}, moduleOptions, defaultModuleOptions);
}

export default defineNuxtModule<ModuleOptions>({
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

    const runtimeConfigOptions = nuxt.options.runtimeConfig.public.melkor ?? {};
    const options = createModuleOptions(mergeConfig({}, runtimeConfigOptions, _options));

    // Inject config
    nuxt.options.runtimeConfig.public.melkor = options;

    // await loadMeta(ctx);

    /* STUBS */

    nuxt.options.alias[`${vNamespace}/stubs`] = resolver.resolve(runtimeResolver.vueDir, `stubs`);

    /* STYLES */

    nuxt.options.alias[`${vNamespace}/styles/scss`] = resolver.resolve(runtimeResolver.vueDir, `styles/index.scss`);
    nuxt.options.alias[`${vNamespace}/styles/mixins`] = resolver.resolve(runtimeResolver.vueDir, `styles/mixins.scss`);

    /* COMPONENTS */

    const components = resolveNuxtComponents({
      resolver: runtimeResolver,
      prefix: options.prefix?.components,
    });

    components.forEach((component) => {
      addComponent({
        name: component.name,
        filePath: component.filepath,
      });

      nuxt.options.alias[component.alias] = `${component.filepath}`;
    });

    /* COMPOSABLES */

    nuxt.options.alias[`${vNamespace}/composables`] = resolver.resolve(runtimeResolver.nuxtDir, `composables`);

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

    nuxt.options.alias[`${vNamespace}/features`] = resolver.resolve(runtimeResolver.nuxtDir, `features`);

    addImportsDir(resolver.resolve(runtimeResolver.vueDir, 'features'));

    /* PLUGIN */
    addPlugin({
      src: resolver.resolve(runtimeResolver.nuxtDir, 'plugin'),
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
});
