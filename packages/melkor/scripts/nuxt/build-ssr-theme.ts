import path from 'node:path';

import esbuild from 'esbuild';

import { rootPath } from '../utils';

esbuild.buildSync({
  entryPoints: [
    path.resolve(rootPath, './src/nuxt/ssr-theme.js'),
  ],
  outfile: path.resolve(rootPath, `./src/runtime/nuxt/ssr-theme.min.js`),
});
