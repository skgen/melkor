import type { Schema } from './meta';

import fs from 'node:fs';
import path from 'node:path';

import { rootPath } from '../utils';

function extractExportedComponents() {
  const exportedRoot = path.join(rootPath, 'lib/components/index.d.ts');
  const content = fs.readFileSync(exportedRoot, 'utf8');
  const regex = /as\s+(\w+)\s*\}\s*from\s+['"](?:\.\/|\.\.\/)?([^'"]+)['"]\s*;?/g;

  const components = [...content.matchAll(regex)].map(m => ({
    name: m[1],
    module: path.join('lib/components', `${m[2]}.js`),
    types: path.join('lib/components', `${m[2]}.d.ts`),
  }));

  return components;
}

function extractExportedComposables() {
  const exportedRoot = path.join(rootPath, 'lib/composables/index.d.ts');
  const content = fs.readFileSync(exportedRoot, 'utf8');
  const regex = /export\s+(?:\*|\{[^}]+\})\s+from\s+['"](?:\.\/|\.\.\/)?([^'"/]+)['"]/g;

  const composables = [...content.matchAll(regex)].map(m => ({
    name: m[1],
    module: path.join('lib/composables', `${m[1]}.js`),
    types: path.join('lib/composables', `${m[1]}.d.ts`),
  }));

  return composables;
}

export function extractSchema(): Schema {
  const schema = {
    components: extractExportedComponents(),
    composables: extractExportedComposables(),
  };

  return schema;
}
