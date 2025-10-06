// import type { Resolver } from '@nuxt/kit';
// import type { Nuxt } from '@nuxt/schema';
import type { DeepObjectPartial, DeepPartial } from '@skgn/kit';

import fs from 'node:fs';
import path from 'node:path';

import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import merge from 'deepmerge';

// import { create } from './runtime'
import { createMelkorOptions, type MelkorOptions, STORAGE_THEME_KEY, Theme } from './runtime/isomorphic/features';
// Melkor
// import { loadComponents } from './namespaces/load-components';
// import { loadComposables } from './namespaces/load-composables';
// import { loadFeatures } from './namespaces/load-features';
// import { loadMeta } from './namespaces/load-meta';
// import { loadScss } from './namespaces/load-scss';
// import { loadThemeScript } from './namespaces/load-theme-script';
// import { meta } from './utils/meta';

const pkg = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../package.json'), { encoding: 'utf-8' }));

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    melkor: MelkorOptions;
  }
}

export interface ModuleOptions {
  debug: boolean;
  prefix?: {
    components?: string;
    hooks?: string;
  };
  ui: MelkorOptions;
}

export interface ModuleHooks {
}

export interface ModuleRuntimeHooks {
}

export interface ModuleRuntimeConfig {
}

export interface ModulePublicRuntimeConfig {
}

export interface MelkorModuleOptions {
  moduleOptions?: DeepObjectPartial<ModuleOptions>;
  melkorOptions?: DeepObjectPartial<MelkorOptions>;
}

// const logger = useLogger(`nuxt:melkor`);

const defaultModuleOptions: ModuleOptions = {
  debug: false,
  prefix: {
    components: 'Mk',
  },
  ui: createMelkorOptions(),
};

function createModuleOptions(moduleOptions?: DeepPartial<ModuleOptions> & Pick<ModuleOptions, 'ui'>): ModuleOptions {
  if (!moduleOptions) {
    return structuredClone(defaultModuleOptions);
  }
  return merge(defaultModuleOptions, moduleOptions, {
    arrayMerge: (_, source) => {
      return source;
    },
  });
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
    const vNamespace = '#melkor';
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('./runtime');
    const runtimeIsomorphicDir = resolver.resolve(runtimeDir, './isomorphic');
    const runtimeNuxtDir = resolver.resolve(runtimeDir, './nuxt');

    const options = createModuleOptions(_options);

    // Inject config
    nuxt.options.runtimeConfig.public.melkor = options.ui;

    nuxt.options.alias[`${vNamespace}/stubs`] = resolver.resolve(runtimeIsomorphicDir, `stubs`);

    // await loadMeta(ctx);

    nuxt.options.alias[`${vNamespace}/styles/scss`] = resolver.resolve(runtimeIsomorphicDir, `styles/index.scss`);
    nuxt.options.alias[`${vNamespace}/styles/mixins`] = resolver.resolve(runtimeIsomorphicDir, `styles/mixins.scss`);

    addComponentsDir({
      path: resolver.resolve(runtimeIsomorphicDir, 'components'),
      pathPrefix: false,
      prefix: options.prefix?.components,
      // ignore: ['color-mode/**', 'content/**', 'prose/**'],
    });

    // @todo need to allow prefixing
    addImportsDir(resolver.resolve(runtimeIsomorphicDir, 'composables'));

    addImportsDir(resolver.resolve(runtimeIsomorphicDir, 'features'));

    /* NUXT specific features */

    addComponentsDir({
      path: resolver.resolve(runtimeNuxtDir, 'components'),
      pathPrefix: false,
      prefix: options.prefix?.components,
      // ignore: ['color-mode/**', 'content/**', 'prose/**'],
    });

    // Load plugin
    addPlugin({
      src: resolver.resolve(runtimeNuxtDir, 'plugin'),
    });

    // SSR theme
    const scriptCtx = {
      storageKey: STORAGE_THEME_KEY,
      themes: JSON.stringify(options.ui.themes),
      ThemeEnum: JSON.stringify(Theme),
    };

    const ssrThemeScript = fs.readFileSync(resolver.resolve(runtimeNuxtDir, 'ssr-theme.min.js'), 'utf-8')
      .replace(/<%= ctx\.([^ ]+) %>/g, (_, option: keyof typeof scriptCtx) => scriptCtx[option])
      .trim();

    nuxt.hook('nitro:config', (config) => {
      config.virtual = config.virtual || {};
      config.virtual[`${vNamespace}/nuxt/ssr-theme`] = `export const script = ${JSON.stringify(ssrThemeScript, null, 2)}`;
      config.plugins = config.plugins || [];
      config.plugins.push(resolver.resolve(runtimeNuxtDir, 'nitro-plugin'));
    });
  },
});
