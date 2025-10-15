import type { UnpluginOptions } from 'unplugin';

export function detectPluginsDuplicationPlugin(): UnpluginOptions {
  return {
    name: 'melkor:detect-plugins-duplication',
    vite: {
      configResolved(config) {
        const plugins = config.plugins || [];

        if (plugins.filter(i => i.name === 'unplugin-auto-import').length > 1) {
          throw new Error('[Melkor] Multiple instances of `unplugin-auto-import` detected. Melkor includes `unplugin-auto-import` already, and you can configure it using `autoImport` option in Melkor module options.');
        }
        if (plugins.filter(i => i.name === 'unplugin-vue-components').length > 1) {
          throw new Error('[Melkor] Multiple instances of `unplugin-vue-components` detected. Nuxt UI includes `unplugin-vue-components` already, and you can configure it using `components` option in Melkor module options.');
        }
      },
    },
  };
}
