import path from 'node:path';

import esbuild from 'esbuild';

export async function buildSSRTheme(rootPath: string) {
  await esbuild.build({
    entryPoints: [
      path.resolve(rootPath, './src/nuxt/ssr-theme.js'),
    ],
    outfile: path.resolve(rootPath, `./src/runtime/nuxt/ssr-theme.min.js`),
  });
}
