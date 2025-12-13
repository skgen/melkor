import type { PropertyMetaSchema } from 'vue-component-meta';

import { isObject, isString } from 'lodash-es';

const scalars = ['string', 'number', 'boolean'];

const fallbackString = 'Hello there';
const fallbackNumber = 0;
const fallbackBoolean = false;

export type ScalarProp = {
  propType: 'scalar';
  type: 'string';
  required: true;
  value: string;
} | {
  propType: 'scalar';
  type: 'number';
  required: true;
  value: number;
} | {
  propType: 'scalar';
  type: 'string';
  required: false;
  value: string | null;
} | {
  propType: 'scalar';
  type: 'number';
  required: false;
  value: number | null;
} | {
  propType: 'scalar';
  type: 'boolean';
  required: boolean;
  value: boolean;
};

export function parseDefaultString(value?: string): string | null {
  if (!value) {
    return null;
  }
  return value.replace(/^"(.*)"$/, '$1');
}

export function parseDefaultNumber(value?: string): number | null {
  if (!value) {
    return null;
  }
  const maybeParsed = Number.parseFloat(value.trim());
  if (!Number.isNaN(maybeParsed)) {
    return maybeParsed;
  }
  return null;
}

export function parseDefaultBoolean(value?: string): boolean | null {
  if (!value) {
    return null;
  }
  if (value === 'true') {
    return true;
  }
  return false;
}

export function isScalarProp(schema: PropertyMetaSchema): schema is string {
  if (isString(schema)) {
    const normalizedSchema = normalizeSchema(schema);

    if (normalizedSchema) {
      return scalars.includes(normalizedSchema);
    }
  }
  if (isObject(schema) && schema.kind === 'enum' && schema.schema) {
    const filteredSchema = schema.schema.filter(v => v !== 'undefined');
    // Booleans are treated as true and false
    const [boolean1, boolean2] = filteredSchema;
    if ((boolean1 === 'true' && boolean2 === 'false') || (boolean1 === 'false' && boolean2 === 'true')) {
      return isScalarProp('boolean');
    }
    // Default other scalar
    const [childSchema] = filteredSchema;
    if (childSchema && filteredSchema.length === 1) {
      return isScalarProp(childSchema);
    }
  }
  return false;
}

export function createScalarProp(schema: PropertyMetaSchema, options?: { required?: boolean; default?: string }): ScalarProp | null {
  if (!isScalarProp(schema)) {
    return null;
  }

  const normalizedSchema = normalizeSchema(schema);
  if (normalizedSchema === 'string') {
    if (options?.required) {
      return {
        propType: 'scalar',
        type: 'string',
        required: true,
        value: parseDefaultString(options?.default) ?? fallbackString,
      };
    }
    else {
      return {
        propType: 'scalar',
        type: 'string',
        required: false,
        value: parseDefaultString(options?.default),
      };
    }
  }
  if (normalizedSchema === 'number') {
    if (options?.required) {
      return {
        propType: 'scalar',
        type: 'number',
        required: true,
        value: parseDefaultNumber(options?.default) ?? fallbackNumber,
      };
    }
    else {
      return {
        propType: 'scalar',
        type: 'number',
        required: false,
        value: parseDefaultNumber(options?.default),
      };
    }
  }

  // Booleans are treated as enums of true and false
  if (normalizedSchema === 'true' || normalizedSchema === 'false') {
    return {
      propType: 'scalar',
      type: 'boolean',
      required: options?.required ?? false,
      value: parseDefaultBoolean(options?.default) ?? fallbackBoolean,
    };
  }

  return null;
}
