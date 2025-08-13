import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { cyan } from 'colorette';

import { log } from '../logger';
import { extractCssVariablesFromComponents } from './extract-css.meta';
import { extractSchema } from './extract-schema.meta';

const rootPath = fileURLToPath(new URL('../..', import.meta.url));

type ExtractMetaOptions = {
  bundleKeys: string[];
};

export function extractMeta(options: ExtractMetaOptions) {
  const meta = {
    schema: extractSchema(options.bundleKeys),
    css: {
      components: extractCssVariablesFromComponents(),
    },
  };

  const libPath = path.join(rootPath, 'lib');
  if (!existsSync(libPath)) {
    mkdirSync(libPath);
  }
  const metaFilePath = path.resolve(libPath, 'meta.json');
  if (existsSync(metaFilePath)) {
    rmSync(metaFilePath);
  }
  writeFileSync(metaFilePath, `${JSON.stringify(meta, null, 2)}\n`, { encoding: 'utf-8' });

  log(`Schema updated at ${cyan(metaFilePath)}`);
}
