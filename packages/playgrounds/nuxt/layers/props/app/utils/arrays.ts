import type { ComponentMeta, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';

import { isObject } from 'lodash-es';

export type ArrayProp = {
  propType: 'array';
  required: boolean;
  value: SingleProp['value'];
  options: SingleProp[];
};

export function isArrayProp(schema: PropertyMetaSchema): schema is {
  kind: 'array';
  type: string;
  schema?: PropertyMetaSchema[];
} {
  // Simple array
  if (isObject(schema) && schema.kind === 'array') {
    return true;
  }
  // Array of type & undefined
  if (isObject(schema) && schema.kind === 'enum' && schema.schema) {
    const childSchema = schema.schema.filter(v => v !== 'undefined').at(0);
    if (childSchema) {
      return isArrayProp(childSchema);
    }
  }
  return false;
}

export function createArrayProp(schema: PropertyMetaSchema, options?: { required?: boolean; default?: string }): ArrayProp | null {
  if (!isArrayProp(schema)) {
    return null;
  }

  const propOptions: SingleProp[] = [];

  let defaultValue = null;
  if (options?.default) {
    try {
      // If the value is a JSON encoded array
      defaultValue = JSON.parse(options?.default);
    }
    catch {}
  }

  console.log(schema.schema);

  // function resolveEnum(schema: PropertyMetaSchema) {
  //   if (isObject(schema) && schema.kind === 'array' && schema.schema) {
  //     for (const grandChildSchema of schema.schema) {
  //       if (isScalarProp(grandChildSchema)) {
  //         const maybeScalarProp = createScalarProp(grandChildSchema, {
  //           required: options?.required,
  //         });
  //         if (maybeScalarProp) {
  //           propOptions.push(maybeScalarProp);
  //         }
  //       }
  //     }
  //   }
  // }

  if (schema.schema) {
    for (const childSchema of schema.schema) {
      // Type
      if (isScalarProp(childSchema)) {
        // console.log(childSchema);
        const maybeScalarProp = createScalarProp(childSchema, {
          required: options?.required,
        });
        if (maybeScalarProp) {
          propOptions.push(maybeScalarProp);
        }
      }
      // Type or undefined or Union or Union & undefined
      else if (isObject(childSchema) && (childSchema.kind === 'array' || childSchema.kind === 'enum') && childSchema.schema) {
        for (const grandChildSchema of childSchema.schema) {
          // Type or undefined
          if (isScalarProp(grandChildSchema)) {
            const maybeScalarProp = createScalarProp(grandChildSchema, {
              required: options?.required,
            });
            if (maybeScalarProp) {
              propOptions.push(maybeScalarProp);
            }
          }
          // Union or Union & undefined
          if (isObject(grandChildSchema) && grandChildSchema.kind === 'enum' && grandChildSchema.schema) {
            for (const grandGrandChildSchema of grandChildSchema.schema) {
              if (isScalarProp(grandGrandChildSchema)) {
                const maybeScalarProp = createScalarProp(grandGrandChildSchema, {
                  required: options?.required,
                });
                if (maybeScalarProp) {
                  propOptions.push(maybeScalarProp);
                }
              }
            }
          }
        }
      }
    }
  }

  if (!defaultValue && options?.required) {
    defaultValue = propOptions.at(0)?.value;
  }

  return {
    propType: 'array',
    required: options?.required ?? false,
    value: defaultValue,
    options: propOptions,
  };
}
