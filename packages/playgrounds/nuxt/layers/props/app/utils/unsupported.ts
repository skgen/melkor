import type { PropertyMeta } from 'vue-component-meta';

export type UnsupportedProp = {
  type: string;
  required: boolean;
  value: void;
  propType: 'unsupported';
};

export function createUnsupportedProp(prop: PropertyMeta): UnsupportedProp {
  return {
    type: normalizeSchema(prop.type),
    required: prop.required,
    value: void 0,
    propType: 'unsupported',
  };
}
