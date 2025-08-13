import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { DeepObjectPartial, DeepPartial } from '@skgn/kit';

import { addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { createMelkorOptions, type MelkorOptions } from '@skgn/melkor/features';
import merge from 'deepmerge';

import { name, version } from '../package.json';
// Melkor
import { loadComponents } from './namespaces/load-components';
import { loadComposables } from './namespaces/load-composables';
import { loadFeatures } from './namespaces/load-features';
import { loadMeta } from './namespaces/load-meta';
import { loadScss } from './namespaces/load-scss';
import { loadThemeScript } from './namespaces/load-theme-script';
import { meta } from './utils/meta';

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    melkor: MelkorOptions;
  }
}

export interface ModuleOptions {
  debug: false;
  namespace: string;
  prefix?: {
    components?: string;
    hooks?: string;
  };
}

export interface MelkorNuxtContext<TMeta extends Record<string, any> = Record<string, any>> {
  resolver: Resolver;
  logger: ReturnType<typeof import('@nuxt/kit')['useLogger']>;
  moduleOptions: ModuleOptions;
  melkorOptions: MelkorOptions;
  meta: TMeta;
  nuxt: Nuxt;
  runtimeDir: string;
  melkorDir: string;
}

export interface MelkorModuleOptions {
  moduleOptions?: DeepObjectPartial<ModuleOptions>;
  melkorOptions?: DeepObjectPartial<MelkorOptions>;
}

const logger = useLogger(`nuxt:melkor`);

const defaultModuleOptions: ModuleOptions = {
  debug: false,
  namespace: '#melkor',
};

function createModuleOptions(moduleOptions?: DeepPartial<MelkorOptions>): ModuleOptions {
  if (!moduleOptions) {
    return structuredClone(defaultModuleOptions);
  }
  return merge(defaultModuleOptions, moduleOptions, {
    arrayMerge: (_, source) => {
      return source;
    },
  });
}

export default defineNuxtModule<MelkorModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'melkor',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = await resolver.resolve('./runtime');
    const melkorDir = await resolver.resolve('./runtime/melkor');

    const ctx: MelkorNuxtContext = {
      logger,
      resolver,
      melkorOptions: createMelkorOptions(options.melkorOptions),
      moduleOptions: createModuleOptions(options.moduleOptions),
      meta,
      nuxt,
      runtimeDir,
      melkorDir,
    };

    // Inject css
    // ctx.nuxt.options.css = ['@skgn/melkor/styles', ...nuxt.options.css];

    ctx.nuxt.options.build.transpile = [
      ...ctx.nuxt.options.build.transpile,
      '@skgn/melkor',
    ];

    // Inject config
    ctx.nuxt.options.runtimeConfig.public.melkor = ctx.melkorOptions;

    // // Load plugin
    addPlugin({
      src: ctx.resolver.resolve(ctx.runtimeDir, 'plugin'),
    });

    await loadMeta(ctx);

    await loadScss(ctx);

    await loadComponents(ctx);

    await loadComposables(ctx);

    await loadFeatures(ctx);

    await loadThemeScript(ctx);
  },
});
