import { globSync } from 'glob';
import path from 'pathe';

import { type Export, type RuntimeResolver, vNamespace } from './utils';

export type ExportedFeatures = Map<string, Export>;

type ResolveFeaturesOptions = {
  resolver: RuntimeResolver;
};

function resolveFeatures(pattern: string): ExportedFeatures {
  const features = globSync(pattern);
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

export function resolveVueFeatures(options: ResolveFeaturesOptions) {
  return resolveFeatures(path.resolve(options.resolver.vueDir, 'features/index.{ts,js}'));
}

export function resolveNuxtFeatures(options: ResolveFeaturesOptions) {
  return new Map([...resolveVueFeatures(options), ...resolveNuxtOverrideFeatures(options)]);
}

function resolveNuxtOverrideFeatures(options: ResolveFeaturesOptions) {
  return resolveFeatures(path.resolve(options.resolver.nuxtDir, 'features/index.{ts,js}'));
}
