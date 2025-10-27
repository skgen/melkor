import type { DeepPartial } from '@skgn/kit';
import type { GlobOptionsWithFileTypesUnset } from 'glob';

import type { Export, RuntimeResolver } from '../utils';

import defu from 'defu';
import { glob } from 'glob';
import path from 'pathe';

import { vNamespace } from '../utils';

type ResolveComponentsOptions = {
  resolver: RuntimeResolver;
  prefix?: string;
};

export type ExportedComponents = Map<string, Export>;

const defaultOptions = {
  prefix: '',
} satisfies DeepPartial<ResolveComponentsOptions>;

function resolveSFCComponentFileAttributes(componentPath: string) {
  const filename = componentPath.split('/').pop();
  const __name = filename?.replace(/\.vue$/, '');
  const scopedFilepath = componentPath.split(/\/components\//).pop();
  const scopedPath = scopedFilepath?.replace(/\.vue$/, '');

  return {
    filename,
    __name,
    scopedFilepath,
    scopedPath,
  };
}

function resolveModuleComponentFileAttributes(componentPath: string) {
  const filename = componentPath.split('/').pop();
  const __name = filename?.replace(/\.(ts|js)$/, '');
  const scopedFilepath = componentPath.split(/\/components\//).pop();
  const scopedPath = scopedFilepath?.replace(/\.(ts|js)$/, '');

  return {
    filename,
    __name,
    scopedFilepath,
    scopedPath,
  };
}

async function resolveComponents(globOptions: { pattern: string; options?: GlobOptionsWithFileTypesUnset }, options: { prefix?: string; type: 'sfc' | 'module' }): Promise<ExportedComponents> {
  const components = await glob(globOptions.pattern, globOptions.options ?? {});

  return new Map(components.map((componentPath) => {
    const { filename, __name, scopedFilepath, scopedPath } = options.type === 'sfc'
      ? resolveSFCComponentFileAttributes(componentPath)
      : resolveModuleComponentFileAttributes(componentPath);

    if (!__name || !filename || !scopedFilepath || !scopedPath) {
      throw new Error(`Error resolving component ${componentPath}`);
    }
    return [
      __name,
      {
        __name,
        name: `${options.prefix ?? ''}${__name}`,
        filename,
        filepath: componentPath,
        scopedFilepath,
        scopedPath,
        alias: `${vNamespace}/components${__name === 'index' ? '' : `/${scopedFilepath}`}`,
      },
    ];
  }));
}

export async function resolveVueComponents(_options: ResolveComponentsOptions): Promise<ExportedComponents> {
  const options = defu({}, _options, defaultOptions);
  return resolveComponents({
    pattern: path.resolve(options.resolver.vueDir, 'components/**/*.vue'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  }, {
    prefix: options.prefix,
    type: 'sfc',
  });
}

export async function resolveVueComponentsIndex(_options: Omit<ResolveComponentsOptions, 'prefix'>): Promise<ExportedComponents> {
  const { prefix, ..._defaultOptions } = defaultOptions;
  const options = defu({}, _options, _defaultOptions);
  return resolveComponents({
    pattern: path.resolve(options.resolver.vueDir, 'components/index.{ts,js}'),
  }, {
    type: 'module',
  });
}

export async function resolveNuxtComponents(_options: ResolveComponentsOptions): Promise<ExportedComponents> {
  const options = defu({}, _options, defaultOptions);
  return new Map([...await resolveVueComponents(options), ...await resolveNuxtOverrideComponents(options)]);
}

export async function resolveNuxtComponentsIndex(_options: Omit<ResolveComponentsOptions, 'prefix'>): Promise<ExportedComponents> {
  const { prefix, ..._defaultOptions } = defaultOptions;
  const options = defu({}, _options, _defaultOptions);
  return resolveComponents({
    pattern: path.resolve(options.resolver.nuxtDir, 'components/index.{ts,js}'),
  }, {
    type: 'module',
  });
}

async function resolveNuxtOverrideComponents(_options: ResolveComponentsOptions): Promise<ExportedComponents> {
  const options = defu({}, _options, defaultOptions);
  return resolveComponents({
    pattern: path.resolve(options.resolver.nuxtDir, 'components/**/*.vue'),
    options: {
      ignore: [
        '**/index.{ts,js}',
      ],
    },
  }, {
    prefix: options.prefix,
    type: 'sfc',
  });
}
