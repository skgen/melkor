import type { RuntimeResolver } from '@skgn/melkor-kit';
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';

import type { PluginOptions } from '../unplugin';

import { defu } from 'defu';
import path from 'pathe';
import AutoImport from 'unplugin-auto-import';

export default function autoImportLogicPlugin(options: PluginOptions, resolver: RuntimeResolver, meta: UnpluginContextMeta): UnpluginOptions {
  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: options.dts ?? true,
    dirs: [
      path.join(resolver.vueDir, 'composables'),
      path.join(resolver.vueDir, 'features'),
    ],
  });

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions;
}
