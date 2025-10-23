import type { Export, RuntimeResolver } from '@skgn/melkor-kit';
import type { UnpluginOptions } from 'unplugin';

import type { MelkorUnpluginOptions } from '../unplugin';

import { resolveVueComponents, resolveVueComposables, resolveVueFeatures, vNamespace } from '@skgn/melkor-kit';

export function resolveInternalAliasPlugin(options: MelkorUnpluginOptions, resolver: RuntimeResolver): UnpluginOptions {
  let vueComponents: [string, Export][] = [];
  let vueComposables: [string, Export][] = [];
  let vueFeatures: [string, Export][] = [];

  resolveVueComponents({
    resolver,
    prefix: options.prefix?.components,
  }).then((components) => {
    vueComponents = [...components];
  }).catch((e) => {
    console.error('Failed to load components.');
    console.error(e);
  });

  resolveVueComposables({
    resolver,
  }).then((composables) => {
    vueComposables = [...composables];
  }).catch((e) => {
    console.error('Failed to load composables.');
    console.error(e);
  });

  resolveVueFeatures({
    resolver,
  }).then((features) => {
    vueFeatures = [...features];
  }).catch((e) => {
    console.error('Failed to load features.');
    console.error(e);
  });

  return {
    name: 'melkor:resolve-internal-alias',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith(`${vNamespace}/components`)) {
        const [_, component] = vueComponents.find(([_, v]) => v.alias === id) ?? [];
        if (component) {
          return component.filepath;
        }
      }
      if (id.startsWith(`${vNamespace}/composables`)) {
        const [_, composable] = vueComposables.find(([_, v]) => v.alias === id) ?? [];
        if (composable) {
          return composable.filepath;
        }
      }
      if (id.startsWith(`${vNamespace}/features`)) {
        const [_, feature] = vueFeatures.find(([_, v]) => v.alias === id) ?? [];
        if (feature) {
          return feature.filepath;
        }
      }
    },
  };
}
