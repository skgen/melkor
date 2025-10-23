import type { Linter } from 'eslint';

import { bold, dim, green } from 'colorette';
import { ESLint } from 'eslint';
import fs from 'fs-extra';
import path from 'pathe';

import { log } from './utils';

async function lint(filepath: string, eslintConfigPath?: string, eslintConfig?: Linter.Config, iteration = 0) {
  let _eslintConfig = eslintConfig ?? null;
  if (!_eslintConfig) {
    const __eslintConfig = eslintConfigPath ? await import(eslintConfigPath) : null;
    _eslintConfig = __eslintConfig ? await __eslintConfig.default as Linter.Config : null;
  }

  const eslint = new ESLint({
    baseConfig: _eslintConfig,
    fix: true,
  });

  const results = await eslint.lintFiles(filepath);

  await ESLint.outputFixes(results);

  // Hack to correctly lint tsconfig for multiple paths
  if (iteration === 1) {
    return;
  }

  await lint(filepath, undefined, _eslintConfig ?? undefined, iteration + 1);
}

export async function write(filepath: string, data: any, options?: { eslintConfigPath?: string; writeMessage?: string }) {
  const dir = path.dirname(filepath);

  let dataAsString = data;
  if (typeof data === 'object') {
    dataAsString = JSON.stringify(data, null, 2);
  }

  await fs.ensureDir(dir);

  await fs.writeFile(
    filepath,
    dataAsString,
    { encoding: 'utf-8' },
  );

  const short = filepath.split(`packages${path.sep}melkor${path.sep}`);

  log(`${green('✔')} ${options?.writeMessage ?? ''}${bold(short[short.length - 1])}`);
  log(dim(`at → ${filepath}`));

  if (options?.eslintConfigPath) {
    await lint(filepath, options.eslintConfigPath);
  }
}
