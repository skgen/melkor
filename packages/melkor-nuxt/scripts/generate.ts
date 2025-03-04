import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';
import shell from 'shelljs';
import yargs from 'yargs';

// && esbuild --minify src/ssr-theme.js --outfile=dist/ssr-theme.js

const argv = await yargs(process.argv.slice(2)).options({
  dest: { type: 'string', default: 'src' },
}).parse();

const root = fileURLToPath(new URL('..', import.meta.url));

esbuild.buildSync({
  entryPoints: [
    path.resolve(root, './src/ssr-theme.js'),
  ],
  outfile: path.resolve(root, `./${argv.dest}/ssr-theme.min.js`),
  // minify: true,
});

shell.cp(
  '-r',
  path.resolve(root, 'node_modules/@skgn/melkor/lib/schema.json'),
  path.resolve(root, `${argv.dest}/schema.json`),
);
