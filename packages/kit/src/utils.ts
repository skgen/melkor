import path from 'pathe';

export function createRuntimeResolver(cwd: string) {
  const dir = path.resolve(cwd, './runtime');
  const vueDir = path.resolve(dir, './vue');
  const nuxtDir = path.resolve(dir, './nuxt');

  return {
    dir,
    vueDir,
    nuxtDir,
  };
}

export function createGeneratedResolver(cwd: string) {
  const dir = path.resolve(cwd, '.melkor');
  const vueTsConfigPath = path.resolve(dir, 'tsconfig.vue.json');
  const nuxtTsConfigPath = path.resolve(dir, 'tsconfig.nuxt.json');

  return {
    dir,
    vueTsConfigPath,
    nuxtTsConfigPath,
  };
}

export type RuntimeResolver = ReturnType<typeof createRuntimeResolver>;

export const vNamespace = '#melkor';

export type Export = {
  __name: string;
  name: string;
  filename: string;
  filepath: string;
  scopedFilepath: string;
  scopedPath: string;
  alias: string;
};
