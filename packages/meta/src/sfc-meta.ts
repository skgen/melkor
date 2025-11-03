import type { RuntimeResolver, ScopedModulesResolverFunction } from '@skgn/melkor-kit';
import type { MetaCheckerOptions, PropertyMeta } from 'vue-component-meta';

import type { SFCComponentMeta, SFCCssMeta, SFCMeta } from './types';

import fs from 'fs-extra';
import { createChecker as vueCreateChecker } from 'vue-component-meta';

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  // schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
};

type Checker = ReturnType<typeof vueCreateChecker>;

export function createChecker(tsConfigPath: string): Checker {
  return vueCreateChecker(
  // Write your tsconfig path
    tsConfigPath,
    checkerOptions,
  );
}

export function extractSFCComponentMeta(filePath: string, checker: Checker): SFCComponentMeta {
  const meta = checker.getComponentMeta(filePath);

  const removedProps = ['key', 'ref', 'ref_for', 'ref_key', 'class', 'style'];

  const filteredProps = meta.props
    .filter(v => !removedProps.includes(v.name))
    .map((v) => {
      // Dirty way to reasolve values deeply and breaking refs
      const properties = JSON.parse(JSON.stringify(v)) as PropertyMeta;
      const { declarations, ...otherProps } = properties;
      return {
        ...otherProps,
        declarations: [],
      };
    });

  return {
    props: filteredProps,
  };
}

export function extractSFCCssMeta(filePath: string): SFCCssMeta {
  const content = fs.readFileSync(filePath, 'utf8');

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

export function extractSFCMeta(options: { filePath: string; checker: Checker }): Omit<SFCMeta, 'name'> {
  const { filePath, checker } = options;
  const componentMeta = extractSFCComponentMeta(filePath, checker);
  const cssMeta = extractSFCCssMeta(filePath);

  return {
    component: componentMeta,
    css: cssMeta,
  };
}

export async function extractSFCsMeta(options: {
  runtimeResolver: RuntimeResolver;
  tsConfigPath: string;
  modulesResolverFunction: ScopedModulesResolverFunction;
}) {
  const { tsConfigPath, runtimeResolver, modulesResolverFunction } = options;

  const checker = createChecker(tsConfigPath);

  const scoppedModules = await modulesResolverFunction(runtimeResolver);

  return scoppedModules.components
    .filter(m => m.type === 'sfc')
    .map(component => ({
      name: component.name,
      ...extractSFCMeta({
        filePath: component.filePath,
        checker,
      }),
    }));
};
