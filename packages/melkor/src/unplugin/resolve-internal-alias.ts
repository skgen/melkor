import type { RuntimeResolver } from '@skgn/melkor-kit';
import type { UnpluginOptions } from 'unplugin';

import type { MelkorUnpluginOptions } from '../unplugin';

import { resolveVueComponents, resolveVueComposables, resolveVueFeatures, vNamespace } from '@skgn/melkor-kit';

export function resolveInternalAliasPlugin(options: MelkorUnpluginOptions, resolver: RuntimeResolver): UnpluginOptions[] {
  const vueComponents = [...resolveVueComponents({
    resolver,
    prefix: options.prefix?.components,
  })];

  const vueComposables = [...resolveVueComposables({
    resolver,
  })];

  const vueFeatures = [...resolveVueFeatures({
    resolver,
  })];

  return [
    /**
     * This plugin aims to resolve aliased imports internally
     */
    {
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
    },

  ] satisfies UnpluginOptions[];
}
