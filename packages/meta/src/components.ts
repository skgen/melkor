import type { GeneratedResolver, RuntimeResolver } from '@skgn/melkor-kit';

import { resolveNuxtComponents, resolveVueComponents } from '@skgn/melkor-kit';

import { createChecker, extractSFCMeta } from './sfc-meta';

export function extractVueSFCMeta(options: { runtimeResolver: RuntimeResolver; generatedResolver: GeneratedResolver }) {
  const { generatedResolver, runtimeResolver } = options;

  const checker = createChecker(generatedResolver.vueTsConfigPath);

  const vueComponents = resolveVueComponents({
    resolver: runtimeResolver,
  });

  return [...vueComponents].map(([_, component]) => extractSFCMeta({
    name: component.__name,
    filepath: component.filepath,
    checker,
  }));
}

export function extractNuxtSFCMeta(options: { runtimeResolver: RuntimeResolver; generatedResolver: GeneratedResolver }) {
  const { generatedResolver, runtimeResolver } = options;

  const checker = createChecker(generatedResolver.nuxtTsConfigPath);

  const nuxtComponents = resolveNuxtComponents({
    resolver: runtimeResolver,
  });

  return [...nuxtComponents].map(([_, component]) => extractSFCMeta({
    name: component.__name,
    filepath: component.filepath,
    checker,
  }));
}
