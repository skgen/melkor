import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';

const rootPath = fileURLToPath(new URL('../..', import.meta.url));

function extractCssVariablesFromSFC(sfcPath: string) {
  const content = fs.readFileSync(sfcPath, 'utf8');

  const _css = content.match(/<style\s+lang=["']scss["']>([\s\S]*?)<\/style>/g);
  const css = _css ? _css[0].trim() : null;

  if (!css) {
    return null;
  }

  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const cssVariableRegx = /(--[\w-]+)\s*:\s*([^;]+);/g;

  let match;
  const variables: Record<string, string> = {};
  while (match !== null) {
    match = cssVariableRegx.exec(css);
    if (match) {
      variables[match[1]] = match[2];
    }
  }

  return variables;
}

export function extractCssVariablesFromComponents() {
  const componentsPath = path.join(rootPath, 'src/components/**/*.vue');
  const components = globSync(componentsPath);
  const meta: Record<string, Record<string, string>> = {};
  for (const c of components) {
    const cssVariables = extractCssVariablesFromSFC(c);
    const cName = /([^/]+)\.vue$/.exec(c);
    if (cName && cName[1] && cssVariables) {
      meta[cName[1]] = cssVariables;
    }
  }
  return meta;
}
