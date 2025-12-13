import type { KitModule } from '@skgn/melkor-kit';
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';

import type { MelkorUnpluginOptions } from '../unplugin';

import { resolveVueModules, type RuntimeResolver } from '@skgn/melkor-kit';
import { defu } from 'defu';
import AutoImportComponents from 'unplugin-vue-components';

export function autoImportComponentsPlugin(options: MelkorUnpluginOptions, resolver: RuntimeResolver, meta: UnpluginContextMeta): UnpluginOptions | UnpluginOptions[] {
  let vueComponents: KitModule[] = [];

  resolveVueModules(resolver)
    .then((modules) => {
      vueComponents = modules.components;
    })
    .catch((e) => {
      console.error('Failed to load components.');
      console.error(e);
    });

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      /[\\/]node_modules[\\/](?!\.pnpm|@skgn\/melkor)/,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      {
        type: 'component',
        resolve: (_componentName) => {
          const componentName = _componentName.replace(options.prefix?.components ?? '', '');
          const component = vueComponents.find(component => component.name === componentName);

          if (component) {
            return { name: 'default', from: component.absoluteFilePath };
          }
        },
      },
    ],
  });

  return AutoImportComponents.raw(pluginOptions, meta);
}
