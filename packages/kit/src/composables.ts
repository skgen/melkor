import { globSync } from 'glob';
import path from 'pathe';

import { type Export, type RuntimeResolver, vNamespace } from './utils';

export type ExportedComposables = Map<string, Export>;

type ResolveComposablesOptions = {
  resolver: RuntimeResolver;
};

function resolveComposables(pattern: string): ExportedComposables {
  const composables = globSync(pattern);
  return new Map(composables.map((composablePath) => {
    const filename = composablePath.split('/').pop();
    const __name = filename?.replace(/\.(ts|js)$/, '');
    const scopedFilepath = composablePath.split(/\/composables\//).pop();
    const scopedPath = scopedFilepath?.replace(/\.(ts|js)$/, '');

    if (!__name || !filename || !scopedFilepath || !scopedPath) {
      throw new Error(`Error resolving composables ${composablePath}`);
    }
    return [
      __name,
      {
        __name,
        name: __name,
        filename,
        filepath: composablePath,
        scopedFilepath,
        scopedPath,
        alias: `${vNamespace}/composables${__name === 'index' ? '' : `/${scopedFilepath}`}`,
      },
    ];
  }));
}

export function resolveVueComposables(options: ResolveComposablesOptions) {
  return resolveComposables(path.resolve(options.resolver.vueDir, 'composables/index.{ts,js}'));
}

export function resolveNuxtComposables(options: ResolveComposablesOptions) {
  return new Map([...resolveVueComposables(options), ...resolveNuxtOverrideComposables(options)]);
}

function resolveNuxtOverrideComposables(options: ResolveComposablesOptions) {
  return resolveComposables(path.resolve(options.resolver.nuxtDir, 'composables/index.{ts,js}'));
}
