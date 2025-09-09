import type { CssMeta } from './meta';

import fs from 'node:fs';

import { getAllComponentPaths, getComponentNameFromFile } from '../utils';

export function extractCssMetaFromSFC(sfcPath: string): CssMeta | null {
  const content = fs.readFileSync(sfcPath, 'utf8');

  const _css = content.match(/<style\s+lang=["']scss["']>([\s\S]*?)<\/style>/g);
  const css = _css ? _css[0].trim() : null;

  if (!css) {
    return null;
  }

  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const cssVariableRegx = /(--mk[\w-]+)\s*:\s*([^;]+);/g;

  let match;
  const variables: CssMeta['variables'] = [];
  while (match !== null) {
    match = cssVariableRegx.exec(css);
    if (match) {
      variables.push({
        key: match[1],
        value: match[2],
      });
    }
  }

  return {
    variables,
  };
}

export function extractCssMetaFromComponents() {
  const componentPaths = getAllComponentPaths();
  const meta: Record<string, CssMeta> = {};
  for (const componentPath of componentPaths) {
    const cssVariables = extractCssMetaFromSFC(componentPath);
    const componentName = getComponentNameFromFile(componentPath);
    if (componentName && cssVariables) {
      meta[componentName] = cssVariables;
    }
  }
  return meta;
}
