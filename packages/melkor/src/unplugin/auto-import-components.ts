import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';

import type { PluginOptions } from '../unplugin';

import { resolveVueComponents, type RuntimeResolver } from '@skgn/melkor-kit';
import { defu } from 'defu';
import AutoImportComponents from 'unplugin-vue-components';

export function autoImportComponentsPlugin(options: PluginOptions, resolver: RuntimeResolver, meta: UnpluginContextMeta): UnpluginOptions {
  const vueComponents = resolveVueComponents({
    resolver,
    prefix: options.prefix?.components,
  });

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      /[\\/]node_modules[\\/](?!\.pnpm|@skgn\/melkor)/,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: [
      (_componentName) => {
        const componentName = _componentName.replace(options.prefix?.components ?? '', '');
        if (vueComponents.has(componentName)) {
          return { name: 'default', from: vueComponents.get(componentName)!.filepath };
        }
      },
    ],
  });

  return AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions;
}
