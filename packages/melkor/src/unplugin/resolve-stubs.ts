import type { RuntimeResolver } from '@skgn/melkor-kit';
import type { UnpluginOptions } from 'unplugin';

import type { MelkorUnpluginOptions } from '../unplugin';

import path from 'pathe';

export function resolveStubsPlugin(options: MelkorUnpluginOptions, resolver: RuntimeResolver): UnpluginOptions {
  return {
    name: 'melkor:resolve-stubs',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith('#melkor/stubs')) {
        return path.resolve(resolver.vueDir, 'stubs.js');
      }
    },
  } satisfies UnpluginOptions;
}
