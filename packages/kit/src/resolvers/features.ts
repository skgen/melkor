import type { GlobOptionsWithFileTypesUnset } from 'glob';

import { glob } from 'glob';
import path from 'pathe';

import { type Export, type RuntimeResolver, vNamespace } from '../utils';

export type ExportedFeatures = Map<string, Export>;

type ResolveFeaturesOptions = {
  resolver: RuntimeResolver;
};

async function resolveFeatures(globOptions: { pattern: string; options?: GlobOptionsWithFileTypesUnset }): Promise<ExportedFeatures> {
  const features = await glob(globOptions.pattern, globOptions.options);
  return new Map(features.map((featurePath) => {
    const filename = featurePath.split('/').pop();
    const __name = filename?.replace(/\.(ts|js)$/, '');
    const scopedFilepath = featurePath.split(/\/features\//).pop();
    const scopedPath = scopedFilepath?.replace(/\.(ts|js)$/, '');

    if (!__name || !filename || !scopedFilepath || !scopedPath) {
      throw new Error(`Error resolving features ${featurePath}`);
    }
    return [
      __name,
      {
        __name,
        name: __name,
        filename,
        filepath: featurePath,
        scopedFilepath,
        scopedPath,
        alias: `${vNamespace}/features${__name === 'index' ? '' : `/${scopedFilepath}`}`,
      },
    ];
  }));
}

export async function resolveVueFeatures(options: ResolveFeaturesOptions): Promise<ExportedFeatures> {
  return resolveFeatures({
    pattern: path.resolve(options.resolver.vueDir, 'features/**/*.{ts,js}'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  });
}

export async function resolveVueFeaturesIndex(options: ResolveFeaturesOptions): Promise<ExportedFeatures> {
  return resolveFeatures({
    pattern: path.resolve(options.resolver.vueDir, 'features/index.{ts,js}'),
  });
}

export async function resolveNuxtFeatures(options: ResolveFeaturesOptions): Promise<ExportedFeatures> {
  return new Map([...await resolveVueFeatures(options), ...await resolveNuxtOverrideFeatures(options)]);
}

export async function resolveNuxtFeaturesIndex(options: ResolveFeaturesOptions): Promise<ExportedFeatures> {
  return resolveFeatures({
    pattern: path.resolve(options.resolver.nuxtDir, 'features/index.{ts,js}'),
  });
}

async function resolveNuxtOverrideFeatures(options: ResolveFeaturesOptions): Promise<ExportedFeatures> {
  return resolveFeatures({
    pattern: path.resolve(options.resolver.nuxtDir, 'features/**/*.{ts,js}'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  });
}
