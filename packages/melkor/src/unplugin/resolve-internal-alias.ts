import type { Export, RuntimeResolver } from '@skgn/melkor-kit';
import type { UnpluginOptions } from 'unplugin';

import type { MelkorUnpluginOptions } from '../unplugin';

import { resolveVueComponentsIndex, resolveVueComposablesIndex, resolveVueFeaturesIndex, vNamespace } from '@skgn/melkor-kit';

export function resolveInternalAliasPlugin(options: MelkorUnpluginOptions, resolver: RuntimeResolver): UnpluginOptions {
  let vueComponents: [string, Export][] = [];
  let vueComposables: [string, Export][] = [];
  let vueFeatures: [string, Export][] = [];

  resolveVueComponentsIndex({
    resolver,
  }).then((components) => {
    vueComponents = [...components];
  }).catch((e) => {
    console.error('Failed to load components.');
    console.error(e);
  });

  resolveVueComposablesIndex({
    resolver,
  }).then((composables) => {
    vueComposables = [...composables];
  }).catch((e) => {
    console.error('Failed to load composables.');
    console.error(e);
  });

  resolveVueFeaturesIndex({
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
      if (id === `${vNamespace}/components`) {
        const [_, component] = vueComponents.find(([_, v]) => v.alias === id) ?? [];
        if (component) {
          return component.filepath;
        }
      }
      if (id === `${vNamespace}/composables`) {
        const [_, composable] = vueComposables.find(([_, v]) => v.alias === id) ?? [];
        if (composable) {
          return composable.filepath;
        }
      }
      if (id === `${vNamespace}/features`) {
        const [_, feature] = vueFeatures.find(([_, v]) => v.alias === id) ?? [];
        if (feature) {
          return feature.filepath;
        }
      }
    },
  };
}
