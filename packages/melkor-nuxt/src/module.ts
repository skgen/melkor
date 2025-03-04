import type { MelkorOptions } from '@skgn/melkor/types';
import type { MelkorModuleOptions, MelkorNuxtContext, ModuleOptions } from './types';
import { readFileSync } from 'node:fs';
import { addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { createMelkorOptions, getDefaultAs } from '@skgn/melkor/features';
import defu from 'defu';
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

function createModuleOptions(): ModuleOptions {
  return {
    debug: false,
  };
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
      melkorOptions: getDefaultAs(options.melkorOptions, melkorOptions => ({
        ...defu(melkorOptions, createMelkorOptions()),
        themes: melkorOptions.themes ?? createMelkorOptions().themes,
      }), createMelkorOptions()),
      moduleOptions: getDefaultAs(options.moduleOptions, moduleOptions => defu(moduleOptions, createModuleOptions()), createModuleOptions()),
      schema,
      nuxt,
      runtimeDir: await resolver.resolve('./runtime'),
    };

    // Inject css
    // ctx.nuxt.options.css = ['@skgn/melkor/styles/index.scss', ...nuxt.options.css];
    ctx.nuxt.options.css = ['@skgn/melkor/styles/index.css', ...nuxt.options.css];

    ctx.nuxt.options.alias['@skgen/melkor/styles/mixins'] = '@skgn/melkor/styles/mixins.scss';

    // Inject config
    ctx.nuxt.options.runtimeConfig.public.melkor = defu(nuxt.options.runtimeConfig.public.melkor, ctx.melkorOptions);

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
