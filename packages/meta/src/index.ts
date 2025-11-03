import type { Meta } from './types';

import { createGeneratedResolver, createRuntimeResolver, resolveNuxtModules, resolveVueModules } from '@skgn/melkor-kit';
import path from 'pathe';

import { extractSFCsMeta } from './sfc-meta';

type ExtractMetaOptions = {
  cwd: string;
};

// @todo rewrite whole module in async
export async function extractMeta(options: ExtractMetaOptions): Promise<Meta> {
  const runtimeResolver = createRuntimeResolver(path.resolve(options.cwd, 'src'));
  const generatedResolver = createGeneratedResolver(options.cwd);

  return {
    vue: {
      components: await extractSFCsMeta({
        runtimeResolver,
        tsConfigPath: generatedResolver.vueTsConfigPath,
        modulesResolverFunction: resolveVueModules,
      }),
    },
    nuxt: {
      components: await extractSFCsMeta({
        runtimeResolver,
        tsConfigPath: generatedResolver.nuxtTsConfigPath,
        modulesResolverFunction: resolveNuxtModules,
      }),
    },
  };
}

export * from './types';
