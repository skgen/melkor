import type { GlobOptionsWithFileTypesUnset } from 'glob';

import { glob } from 'glob';
import path from 'pathe';

import { type Export, type RuntimeResolver, vNamespace } from '../utils';

export type ExportedComposables = Map<string, Export>;

type ResolveComposablesOptions = {
  resolver: RuntimeResolver;
};

async function resolveComposables(globOptions: { pattern: string; options?: GlobOptionsWithFileTypesUnset }): Promise<ExportedComposables> {
  const composables = await glob(globOptions.pattern, globOptions.options);
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

export async function resolveVueComposables(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return resolveComposables({
    pattern: path.resolve(options.resolver.vueDir, 'composables/**/*.{ts,js}'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  });
}

export async function resolveVueComposablesIndex(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return resolveComposables({
    pattern: path.resolve(options.resolver.vueDir, 'composables/index.{ts,js}'),
  });
}

export async function resolveNuxtComposables(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return new Map([...await resolveVueComposables(options), ...await resolveNuxtOverrideComposables(options)]);
}

export async function resolveNuxtComposablesIndex(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return new Map([...await resolveVueComposablesIndex(options), ...await resolveNuxtOverrideComposablesIndex(options)]);
}

async function resolveNuxtOverrideComposables(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return resolveComposables({
    pattern: path.resolve(options.resolver.nuxtDir, 'composables/**/*.{ts,js}'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  });
}

async function resolveNuxtOverrideComposablesIndex(options: ResolveComposablesOptions): Promise<ExportedComposables> {
  return resolveComposables({
    pattern: path.resolve(options.resolver.nuxtDir, 'composables/index.{ts,js}'),
  });
}
