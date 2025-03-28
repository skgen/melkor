import type { MelkorModuleOptions, MelkorNuxtContext, ModuleOptions } from './types';
import { readFileSync } from 'node:fs';
import { addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { createMelkorOptions, type DeepPartial, type MelkorOptions } from '@skgn/melkor/features';
import merge from 'deepmerge';
import { name, version } from '../package.json';
// Melkor
import { loadComponents } from './namespaces/load-components';
import { loadComposables } from './namespaces/load-composables';
import { loadFeatures } from './namespaces/load-features';
import { loadThemeScript } from './namespaces/load-theme-script';

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    melkor: MelkorOptions;
  }
}

const logger = useLogger(`nuxt:melkor`);

const defaultModuleOptions: ModuleOptions = {
  debug: false,
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

    const schema = JSON.parse(readFileSync(resolver.resolve('./schema.json'), { encoding: 'utf-8' })) as Record<string, any>;
    // const schema = { components: {}, composables: {} };

    const ctx: MelkorNuxtContext = {
      logger,
      resolver,
      melkorOptions: createMelkorOptions(options.melkorOptions),
      moduleOptions: createModuleOptions(options.moduleOptions),
      schema,
      nuxt,
      runtimeDir: await resolver.resolve('./runtime'),
    };

    // Inject css
    // ctx.nuxt.options.css = ['@skgn/melkor/styles', ...nuxt.options.css];

    ctx.nuxt.options.alias['@skgn/melkor-nuxt/styles/mixins'] = '@skgn/melkor/styles/mixins';
    ctx.nuxt.options.alias['@skgn/melkor-nuxt/styles'] = '@skgn/melkor/styles';

    // Inject config
    ctx.nuxt.options.runtimeConfig.public.melkor = ctx.melkorOptions;

    // Load plugin
    addPlugin({
      src: ctx.resolver.resolve(ctx.runtimeDir, 'plugin'),
    });

    loadComponents(ctx);

    loadComposables(ctx);

    loadFeatures();

    loadThemeScript(ctx);
  },
});
