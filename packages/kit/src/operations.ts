import type { Linter } from 'eslint';

import { bold, dim, green } from 'colorette';
import { ESLint } from 'eslint';
import fs from 'fs-extra';
import path from 'pathe';

import { log } from './utils';

async function lint(filePath: string, eslintConfigPath?: string, eslintConfig?: Linter.Config, iteration = 0) {
  let _eslintConfig = eslintConfig ?? null;
  if (!_eslintConfig) {
    const __eslintConfig = eslintConfigPath ? await import(eslintConfigPath) : null;
    _eslintConfig = __eslintConfig ? await __eslintConfig.default as Linter.Config : null;
  }

  const eslint = new ESLint({
    baseConfig: _eslintConfig,
    fix: true,
  });

  const results = await eslint.lintFiles(filePath);

  await ESLint.outputFixes(results);

  // Hack to correctly lint tsconfig for multiple paths
  if (iteration === 1) {
    return;
  }

  await lint(filePath, undefined, _eslintConfig ?? undefined, iteration + 1);
}

export async function write(filePath: string, data: any, options?: { eslintConfigPath?: string; writeMessage?: string }) {
  const dir = path.dirname(filePath);

  let dataAsString = data;
  if (typeof data === 'object') {
    dataAsString = JSON.stringify(data, null, 2);
  }

  await fs.ensureDir(dir);

  await fs.writeFile(
    filePath,
    dataAsString,
    { encoding: 'utf-8' },
  );

  const short = filePath.split(`packages${path.sep}melkor${path.sep}`);

  log(`${green('✔')} ${options?.writeMessage ?? ''}${bold(short[short.length - 1])}`);
  log(dim(`at → ${filePath}`));

  if (options?.eslintConfigPath) {
    await lint(filePath, options.eslintConfigPath);
  }
}
