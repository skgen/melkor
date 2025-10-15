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

export type RuntimeResolver = ReturnType<typeof createRuntimeResolver>;

export const vNamespace = '#melkor';
export const generatedDir = '.melkor';

export type Export = {
  __name: string;
  name: string;
  filename: string;
  filepath: string;
  scopedFilepath: string;
  scopedPath: string;
  alias: string;
};
