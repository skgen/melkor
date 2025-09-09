import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';

export const rootPath = fileURLToPath(new URL('..', import.meta.url));

export function getAllComponentPaths() {
  const componentsPath = path.join(rootPath, 'src/components/**/*.vue');
  const components = globSync(componentsPath);
  return components;
}

export function getComponentNameFromFile(filePath: string): string | null {
  const cName = /([^/]+)\.vue$/.exec(filePath);
  if (cName && cName[1]) {
    return cName[1];
  }
  return null;
}
