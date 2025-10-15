import { globSync } from 'glob';
import path from 'pathe';

export const rootPath = path.resolve(import.meta.dirname, '..');

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
