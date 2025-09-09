import type { Meta } from './meta';

import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { cyan } from 'colorette';

import { log } from '../logger';
import { getAllComponentPaths, getComponentNameFromFile, rootPath } from '../utils';
import { extractComponentMetaFromSFC } from './extract-component';
import { extractCssMetaFromSFC } from './extract-css';
import { extractMetaTypes } from './extract-meta-types';
import { extractSchema } from './extract-schema';

function writeMeta(meta: Meta) {
  const libPath = path.join(rootPath, 'lib');
  if (!existsSync(libPath)) {
    mkdirSync(libPath);
  }
  const metaFilePath = path.resolve(libPath, 'meta.json');
  if (existsSync(metaFilePath)) {
    rmSync(metaFilePath);
  }

  writeFileSync(metaFilePath, `${JSON.stringify(meta, null, 2)}\n`, { encoding: 'utf-8' });

  return metaFilePath;
}

export function extractMeta() {
  const components: Meta['components'] = [];

  const componentPaths = getAllComponentPaths();
  for (const componentPath of componentPaths) {
    const componentName = getComponentNameFromFile(componentPath);
    if (componentName) {
      const componentMeta = extractComponentMetaFromSFC(componentPath, componentName);
      const cssMeta = extractCssMetaFromSFC(componentPath);
      components.push({
        name: componentName,
        component: componentMeta,
        css: cssMeta,
      });
    }
  }

  const meta: Meta = {
    schema: extractSchema(),
    components,
  };

  const metaFilePath = writeMeta(meta);

  log(`Meta updated at ${cyan(metaFilePath)}`);

  const metaTypesFilePath = extractMetaTypes();

  log(`Meta types updated at ${cyan(metaTypesFilePath)}`);
}
