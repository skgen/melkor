import type { DeepPartial } from '@skgn/kit';

import type { Export, RuntimeResolver } from './utils';

import defu from 'defu';
import { globSync } from 'glob';
import path from 'pathe';

import { vNamespace } from './utils';

type ResolveComponentsOptions = {
  resolver: RuntimeResolver;
  prefix?: string;
};

export type ExportedComponents = Map<string, Export>;

const defaultOptions = {
  prefix: '',
} satisfies DeepPartial<ResolveComponentsOptions>;

function resolveComponents(pattern: string, prefix: string = ''): ExportedComponents {
  const components = globSync(pattern);
  return new Map(components.map((componentPath) => {
    const filename = componentPath.split('/').pop();
    const __name = filename?.replace(/\.vue$/, '');
    const scopedFilepath = componentPath.split(/\/components\//).pop();
    const scopedPath = scopedFilepath?.replace(/\.vue$/, '');

    if (!__name || !filename || !scopedFilepath || !scopedPath) {
      throw new Error(`Error resolving component ${componentPath}`);
    }
    return [
      __name,
      {
        __name,
        name: `${prefix}${__name}`,
        filename,
        filepath: componentPath,
        scopedFilepath,
        scopedPath,
        alias: `${vNamespace}/components/${scopedFilepath}`,
      },
    ];
  }));
}

export function resolveVueComponents(_options: ResolveComponentsOptions) {
  const options = defu({}, _options, defaultOptions);
  return resolveComponents(path.resolve(options.resolver.vueDir, 'components/**/*.vue'), options.prefix);
}

export function resolveNuxtComponents(_options: ResolveComponentsOptions) {
  const options = defu({}, _options, defaultOptions);
  return new Map([...resolveVueComponents(options), ...resolveNuxtOverrideComponents(options)]);
}

function resolveNuxtOverrideComponents(_options: ResolveComponentsOptions) {
  const options = defu({}, _options, defaultOptions);
  return resolveComponents(path.resolve(options.resolver.nuxtDir, 'components/**/*.vue'), options.prefix);
}
