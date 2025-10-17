import type { MetaCheckerOptions, PropertyMeta } from 'vue-component-meta';

import type { SFCComponentMeta, SFCCssMeta, SFCMeta } from './meta';

import fs from 'fs-extra';
import { createChecker as vueCreateChecker } from 'vue-component-meta';

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  // schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
};

type Checker = ReturnType<typeof vueCreateChecker>;

export function createChecker(tsconfigPath: string): Checker {
  return vueCreateChecker(
  // Write your tsconfig path
    tsconfigPath,
    checkerOptions,
  );
}

export function extractSFCComponentMeta(filepath: string, checker: Checker): SFCComponentMeta {
  const meta = checker.getComponentMeta(filepath);

  const removedProps = ['key', 'ref', 'ref_for', 'ref_key', 'class', 'style'];

  const filteredProps = meta.props
    .filter(v => !removedProps.includes(v.name))
    .map((v) => {
      // Dirty way to resolve values deeply and breaking refs
      const properties = JSON.parse(JSON.stringify(v)) as PropertyMeta;
      const { declarations, ...otherProps } = properties;
      // const defaultValue = v.default ?? resolveDefaultProp(componentName, v.name);
      return {
        ...otherProps,
      };
    });

  return {
    props: filteredProps,
  };
}

export function extractSFCCssMeta(filepath: string): SFCCssMeta {
  const content = fs.readFileSync(filepath, 'utf8');

  const _css = content.match(/<style\s+lang=["']scss["']>([\s\S]*?)<\/style>/g);
  const css = _css ? _css[0].trim() : null;

  if (!css) {
    return {
      variables: [],
    };
  }

  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const cssVariableRegx = /(--mk[\w-]+)\s*:\s*([^;]+);/g;

  let match;
  const variables: { key: string; value: string }[] = [];
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

export function extractSFCMeta(options: { filepath: string; checker: Checker; name: string }): SFCMeta {
  const { filepath, checker, name } = options;
  const componentMeta = extractSFCComponentMeta(filepath, checker);
  const cssMeta = extractSFCCssMeta(filepath);

  return {
    name,
    component: componentMeta,
    css: cssMeta,
  };
}
