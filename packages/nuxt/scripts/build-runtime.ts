import path from 'node:path';
import { fileURLToPath } from 'node:url';

import esbuild from 'esbuild';

const root = fileURLToPath(new URL('..', import.meta.url));

esbuild.buildSync({
  entryPoints: [
    path.resolve(root, './src/ssr-theme.js'),
  ],
  outfile: path.resolve(root, `./src/runtime/ssr-theme.min.js`),
});
