import type { RuntimeResolver } from './utils';

import { createDefu } from 'defu';
import { glob } from 'glob';
import { isArray } from 'lodash-es';
import path from 'pathe';

export const namespaces = ['components', 'composables', 'features'] as const;

const privatePatterns = [/internal/];

export type KitModule = {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  private: boolean;
  type: 'sfc' | 'module';
};

export type ScopedModules = {
  [K in typeof namespaces[number]]: KitModule[];
};

function resolveKitModule(filePath: string, namespace: string): KitModule {
  const _np = filePath.split(`${namespace}/`);
  const namespacedPath = _np[_np.length - 1];

  const fileName = filePath.split(path.sep).pop()!;
  const name = fileName.split('.').shift()!;
  const id = namespacedPath.replace(/\.(ts|js|vue)$/, '');
  const ext = namespacedPath.split('.').pop()!;
  let _private = false;

  for (const pattern of privatePatterns) {
    if (pattern.test(namespacedPath)) {
      _private = true;
      break;
    }
  }

  return {
    id,
    name,
    fileName,
    filePath,
    private: _private,
    type: ext === 'vue' ? 'sfc' : 'module',
  };
}

async function resolveModules(baseDir: string, namespace: string): Promise<KitModule[]> {
  const sfcPattern = '**/*.vue';
  const modulesPattern = '**/*.{ts,js}';
  const modules = (await Promise.all([
    glob(path.resolve(baseDir, modulesPattern)),
    glob(path.resolve(baseDir, sfcPattern)),
  ]))
    .flat(1)
    .map(filePaths => resolveKitModule(filePaths, namespace));

  return modules;
}

async function resolveScopedModules(runtimeScopedDir: string): Promise<ScopedModules> {
  return (
    await Promise.all(
      namespaces.map(namespace => resolveModules(path.resolve(runtimeScopedDir, namespace), namespace)),
    ))
    .reduce((acc, modules, index) => {
      acc[namespaces[index]] = modules;
      return acc;
    }, {} as { [K in typeof namespaces[number]]: KitModule[] });
}

const mergeScopedModules = createDefu((obj, key, value) => {
  if (isArray(obj[key]) && isArray(value)) {
    const ids: string[] = value.map((v: any) => v.id);
    const filtered = [
      ...[
        ...obj[key],
      ].filter(v => !ids.includes(v.id)),
      ...value,
    ];
    obj[key] = filtered as any;
    return true;
  }
});

export type ScopedModulesResolverFunction = (resolver: RuntimeResolver) => Promise<ScopedModules>;

export const resolveVueModules: ScopedModulesResolverFunction = async (resolver: RuntimeResolver) => {
  return resolveScopedModules(resolver.vueDir);
};

export const resolveNuxtModules: ScopedModulesResolverFunction = async (resolver: RuntimeResolver) => {
  const [n, v] = await Promise.all([resolveScopedModules(resolver.nuxtDir), resolveVueModules(resolver)]);
  return mergeScopedModules(n, v);
};
