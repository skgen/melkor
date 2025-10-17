import type { Meta } from './meta';

import { createGeneratedResolver, createRuntimeResolver } from '@skgn/melkor-kit';
import path from 'pathe';

import { extractNuxtSFCMeta, extractVueSFCMeta } from './components';

type ExtractMetaOptions = {
  cwd: string;
};

// @todo rewrite whole module in async
export async function extractMeta(options: ExtractMetaOptions): Promise<Meta> {
  const runtimeResolver = createRuntimeResolver(path.resolve(options.cwd, 'src'));
  const generatedResolver = createGeneratedResolver(options.cwd);

  return {
    vue: {
      components: extractVueSFCMeta({
        runtimeResolver,
        generatedResolver,
      }),
    },
    nuxt: {
      components: extractNuxtSFCMeta({
        runtimeResolver,
        generatedResolver,
      }),
    },
  };
}
