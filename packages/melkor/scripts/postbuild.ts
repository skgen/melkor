import { log, vNamespace, write } from '@skgn/melkor-kit';
import { extractMeta } from '@skgn/melkor-meta';
import { cyan, dim, green } from 'colorette';
import fs from 'fs-extra';
import { glob, globSync } from 'glob';
import MagicString from 'magic-string';
import path from 'pathe';

import { rootPath } from './utils';

function resolveStyles(from: string, ...paths: string[]): string {
  return path.resolve(from, 'runtime/vue/styles', ...paths);
}

async function stylesTask(rootPath: string) {
  log('Copying styles ...\n');

  const srcStyles = resolveStyles(path.resolve(rootPath, 'src'));
  const distStyles = resolveStyles(path.resolve(rootPath, 'dist'));

  // Removes all css extra files
  (await glob(path.resolve(distStyles, '**/*.css'), {
    ignore: [
      path.resolve(distStyles, '**/index.css'),
      path.resolve(distStyles, '**/normalize.css'),
    ],
  })).forEach(fs.removeSync);

  // Removes all empty directories
  const dirs = await glob(path.resolve(distStyles, '**'), {
    ignore: [
      path.resolve(distStyles, '**/*.*'),
      distStyles,
    ],
  });

  const removeDirPromises: Promise<void>[] = [];

  for (const dir of dirs) {
    removeDirPromises.push(new Promise((resolve, reject) => {
      try {
        const children = globSync(path.resolve(dir, '*'));
        if (children.length === 0) {
          fs.removeSync(dir);
        }
        resolve();
      }
      catch (e) {
        reject(e);
      }
    }));
  }

  await Promise.all(removeDirPromises);

  // Copy styles assets
  const copyPaths = await glob(path.resolve(srcStyles, '**/*.scss'));
  const copyPathsPromises = copyPaths.map(p => fs.copy(p, p.replace('src', 'dist')));

  await Promise.all(copyPathsPromises);
}

// Assigning default props other than inline ends up messy with _mergeDefaults function assigned
async function mergeDefaultTask(rootPath: string) {
  log('Overriding mergeDefault ...\n');

  const pattern = '/* @__PURE__ */ _mergeDefaults';

  async function replacePattern(filepath: string) {
    if (!await fs.exists(filepath)) {
      throw new Error(`File ${filepath} not found`);
    }
    const text = await fs.readFile(filepath, { encoding: 'utf-8' });
    if (!text.includes(pattern)) {
      return;
    }
    const ms = new MagicString(text);
    ms.replace(/(<script setup>)/, `$0\nimport { _mergeDefaults } from "${vNamespace}/stubs";`);
    await write(filepath, ms.toString(), {
      writeMessage: dim('(override) '),
    });
  }

  const filePaths = await glob(path.resolve(rootPath, 'dist/runtime/**/*.vue'));

  await Promise.all(filePaths.map(replacePattern));
}

async function generateMetaTask(rootPath: string) {
  log('Generating meta ...\n');

  const distDir = path.resolve(rootPath, 'dist');

  const meta = await extractMeta({
    cwd: path.resolve(rootPath),
  });

  await write(
    path.resolve(distDir, 'meta.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
  );
}

log(`${cyan(`ℹ Postbuild starting...\n`)}`);

await stylesTask(rootPath);
await mergeDefaultTask(rootPath);
console.log();
await generateMetaTask(rootPath);

console.log();
log(`${green(`✔ Postbuild succeeded`)}`);
