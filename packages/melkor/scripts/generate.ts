import {
  generateIndexFiles as _generateIndexFiles,
  log,
  write,
} from '@skgn/melkor-kit';
import { cyan, green } from 'colorette';
import esbuild from 'esbuild';
import path from 'pathe';

import { rootPath } from './utils';
import { eslintConfigPath } from './utils';

async function generateIndexFiles(rootPath: string) {
  const files = await _generateIndexFiles(rootPath);

  const operations = files.map((file) => {
    return write(file.filePath, file.content, { eslintConfigPath });
  });

  return Promise.all(operations);
}

async function buildSSRTheme(rootPath: string) {
  const build = await esbuild.build({
    entryPoints: [
      path.resolve(rootPath, './src/nuxt/ssr-theme.js'),
    ],
    write: false,
  });

  const out = build.outputFiles[0];

  await write(
    path.resolve(rootPath, `./src/runtime/nuxt/ssr-theme.min.js`),
    out.text,
    { eslintConfigPath },
  );
}

log(`${cyan(`ℹ Generation starting...\n`)}`);

await buildSSRTheme(rootPath);

await generateIndexFiles(rootPath);

console.log();
log(`${green(`✔ Generation succeeded`)}`);
