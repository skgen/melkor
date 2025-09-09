import type { MetaCheckerOptions, PropertyMeta } from 'vue-component-meta';

import type { ComponentMeta } from './meta';

import path from 'node:path';

import { createChecker } from 'vue-component-meta';

import { getAllComponentPaths, getComponentNameFromFile, rootPath } from '../utils';
import { resolveDefaultProp } from './resolvers/inputs';

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  // schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
};

const tsconfigChecker = createChecker(
  // Write your tsconfig path
  path.join(rootPath, 'tsconfig.app.json'),
  checkerOptions,
);

export function extractComponentMetaFromSFC(componentPath: string, componentName: string): ComponentMeta {
  const meta = tsconfigChecker.getComponentMeta(componentPath);

  const removedProps = ['key', 'ref', 'ref_for', 'ref_key', 'class', 'style'];

  const filteredProps = meta.props
    .filter(v => !removedProps.includes(v.name))
    .map((v) => {
      const { declarations, ...otherProps } = v;
      const defaultValue = v.default ?? resolveDefaultProp(componentName, v.name);
      return {
        ...otherProps,
        default: defaultValue,
      };
    });

  return {
    props: filteredProps,
  };
}

export function extractComponentMetaFromComponents() {
  const componentPaths = getAllComponentPaths();
  const meta: Record<string, ComponentMeta> = {};

  for (const componentPath of componentPaths) {
    const componentName = getComponentNameFromFile(componentPath);

    if (componentName) {
      const vueMeta = extractComponentMetaFromSFC(componentPath, componentName);
      if (vueMeta) {
        meta[componentName] = vueMeta;
      }
    }
  }
  return meta;
}
