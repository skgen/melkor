import type { DeepPartial } from '@skgn/kit';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';

import { createRuntimeResolver, resolveVueComposables } from '@skgn/melkor-kit';
import { createUnplugin, type UnpluginOptions } from 'unplugin';

import { createMelkorOptions, mergeConfig } from './runtime/vue/features';
import { autoImportComponentsPlugin } from './unplugin/auto-import-components';
import autoImportLogicPlugin from './unplugin/auto-import-logic';
import { detectPluginsDuplicationPlugin } from './unplugin/detect-plugins-duplication';
import { resolveInternalAliasPlugin } from './unplugin/resolve-internal-alias';
import { resolveStubsPlugin } from './unplugin/resolve-stubs';

export type PluginOptions = {
  /**
   * Prefix for components
   */
  prefix?: {
    components?: string;
    // composables?: string;
  };
  /**
   * Whether to generate declaration files for auto-imported components.
   */
  dts?: boolean;
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>;
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>;
};

const defaultPluginOptions: PluginOptions = {
  ...createMelkorOptions(),
  prefix: {
    components: 'Mk',
  },
  dts: true,
};

export function createPluginOptions(pluginOptions?: DeepPartial<PluginOptions>): PluginOptions {
  return mergeConfig({}, pluginOptions, defaultPluginOptions);
}

export const melkor = createUnplugin<PluginOptions | undefined>((_options, meta) => {
  const options = createPluginOptions(_options);
  const resolver = createRuntimeResolver(import.meta.dirname);

  return [
    resolveStubsPlugin(options, resolver),
    resolveInternalAliasPlugin(options, resolver),
    autoImportComponentsPlugin(options, resolver, meta),
    autoImportLogicPlugin(options, resolver, meta),
    detectPluginsDuplicationPlugin(),
  ].flat(1) as UnpluginOptions[];
});
