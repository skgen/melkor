import type { InferDefaults } from './features';

export function _mergeDefaults(definition: Record<string, any>, defaults: InferDefaults<any>) {
  const props = definition;
  for (const key of Object.keys(defaults)) {
    const defaultValue = defaults[key];
    if (!props[key]) {
      continue;
    }
    props[key].default = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }
  return props;
}
