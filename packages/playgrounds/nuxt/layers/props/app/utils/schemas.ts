import type { PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';

import { isObject, isString } from 'lodash-es';

export type SingleProp = ScalarProp | UnsupportedProp;

export function normalizeSchema(schema: PropertyMetaSchema) {
  if (isString(schema)) {
    return schema.replace(' | undefined', '');
  }
  if (isObject(schema) && schema.kind === 'enum' && schema.schema) {
    const childSchema = schema.schema.filter(v => v !== 'undefined').at(0);
    if (childSchema) {
      return normalizeSchema(childSchema);
    }
  }
  return null;
}

export function resolvePropType(prop: PropertyMeta): ArrayProp | SingleProp {
  if (isScalarProp(prop.schema)) {
    const maybeScalarProp = createScalarProp(prop.schema, {
      default: prop.default,
      required: prop.required,
    });
    if (maybeScalarProp) {
      return maybeScalarProp;
    }
  }
  else if (isArrayProp(prop.schema)) {
    const maybeArrayProp = createArrayProp(prop.schema, {
      default: prop.default,
      required: prop.required,
    });
    if (maybeArrayProp) {
      return maybeArrayProp;
    }
  }
  // else if (isArrayProp(prop)) {
  // }
  return createUnsupportedProp(prop);
}
