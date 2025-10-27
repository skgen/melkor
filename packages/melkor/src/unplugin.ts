import type { UnpluginInstance } from 'unplugin';
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types';
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types';

import { createRuntimeResolver } from '@skgn/melkor-kit';
import { createUnplugin } from 'unplugin';

import { mergeConfig } from './runtime/vue/features/config';
import { autoImportComponentsPlugin } from './unplugin/auto-import-components';
import autoImportLogicPlugin from './unplugin/auto-import-logic';
import { detectPluginsDuplicationPlugin } from './unplugin/detect-plugins-duplication';
import { resolveInternalAliasPlugin } from './unplugin/resolve-internal-alias';
import { resolveStubsPlugin } from './unplugin/resolve-stubs';

export type MelkorUnpluginOptions = {
  debug?: boolean;
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

const defaultMelkorUnpluginOptions: MelkorUnpluginOptions = {
  debug: false,
  prefix: {
    components: 'Mk',
  },
  dts: true,
};

export function createPluginOptions(pluginOptions?: MelkorUnpluginOptions): MelkorUnpluginOptions {
  return mergeConfig({}, pluginOptions, defaultMelkorUnpluginOptions);
}

export const melkor: UnpluginInstance<MelkorUnpluginOptions | undefined> = createUnplugin((_options, meta) => {
  const options = createPluginOptions(_options);
  const resolver = createRuntimeResolver(import.meta.dirname);

  return [
    resolveStubsPlugin(options, resolver),
    resolveInternalAliasPlugin(options, resolver),
    autoImportComponentsPlugin(options, resolver, meta),
    autoImportLogicPlugin(options, resolver, meta),
    detectPluginsDuplicationPlugin(),
  ].flat(1);
});
