// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import type { NormalizedPropertiesAST, NormalizedProperty } from '../src/lib/components';

import path from 'node:path';

import { cyan, gray } from 'colorette';
import fse from 'fs-extra';
import tsj, { RootlessError } from 'ts-json-schema-generator';
import z from 'zod';

import { config } from './config';

const rawPropertyBaseSchema = z.union([
  z.object({
    $ref: z.string(),
  }),
  z.object({
    type: z.literal('string'),
    enum: z.array(z.string()).optional(),
  }),
  z.object({
    type: z.literal('number'),
  }),
  z.object({
    type: z.literal('boolean'),
  }),
  z.object({
    type: z.literal('null'),
  }),
  z.object({
    type: z.array(z.string()),
  }),
]);

export type RawProperty = z.infer<typeof rawPropertyBaseSchema> | {
  type: 'array';
  items: RawProperty;
  minItems?: number;
  maxItems?: number;
} | {
  type: 'object';
  properties: Record<string, RawProperty>;
  required?: string[];
} | {
  anyOf: RawProperty[];
};

const rawPropertySchema: z.ZodType<RawProperty> = z.union([
  rawPropertyBaseSchema,
  z.object({
    type: z.literal('array'),
    items: z.lazy(() => rawPropertySchema),
    minItems: z.number().optional(),
    maxItems: z.number().optional(),
  }),
  z.object({
    type: z.literal('object'),
    properties: z.lazy(() => z.record(
      z.string(),
      rawPropertySchema,
    )),
    required: z.array(
      z.string(),
    ).optional(),
  }),
  z.object({
    anyOf: z.lazy(() => z.array(rawPropertySchema)),
  }),
]);

export const componentRawPropsSchema = z.object({
  $schema: z.string().optional(),
  $ref: z.string().optional(),
  definitions: z.record(
    z.string(),
    rawPropertySchema,
  ),
});

export type ComponentRawProps = z.infer<typeof componentRawPropsSchema>;

const root = path.resolve(import.meta.filename, '../..');

export function generateComponentPropsSchema(component: string, debug = false): 0 | 1 | 2 {
  fse.mkdirSync(path.resolve(root, 'content/generated/components'), { recursive: true });
  const filepath = path.resolve(root, `node_modules/@skgn/melkor/lib/components/${component}/${component}.d.ts`);
  const generatorConfig = {
    path: filepath,
    type: config.propsName,
  };
  try {
    const schema = tsj
      .createGenerator(generatorConfig)
      .createSchema(generatorConfig.type);
    console.dir(schema, { depth: 8 });
    const formattedSchema = JSON
      .stringify(schema, null, 2)
      .replaceAll(`#/definitions/${config.propsName}`, `#/definitions/_${component}${config.propsName}`);

    if (debug) {
      const outputPath = path.resolve(root, `content/generated/components/${component}-props-schema.raw.json`);
      fse.writeFileSync(
        outputPath,
        decodeURIComponent(formattedSchema),
        {
          encoding: 'utf-8',
        },
      );
    }

    try {
      const propertyAST = transformComponentProps(JSON.parse(decodeURIComponent(formattedSchema)));
      const defaults = extractDefaults(component);
      if (propertyAST.props?.type === 'object' && defaults && propertyAST) {
        for (const k of Object.keys(propertyAST.props.properties)) {
          if (
            defaults[k] !== undefined
            && (
              propertyAST.props.properties[k].type === 'object'
              || propertyAST.props.properties[k].type === 'array'
              || propertyAST.props.properties[k].type === 'boolean'
              || propertyAST.props.properties[k].type === 'enum'
              || propertyAST.props.properties[k].type === 'null'
              || propertyAST.props.properties[k].type === 'number'
              || propertyAST.props.properties[k].type === 'string'
              || propertyAST.props.properties[k].type === 'union'
            )) {
            propertyAST.props.properties[k].default = defaults[k];
          }
        }
      }

      const outputPath = path.resolve(root, `content/generated/components/${component}-props-schema.json`);
      fse.writeFileSync(
        outputPath,
        JSON.stringify(propertyAST, null, 2),
        {
          encoding: 'utf-8',
        },
      );
      console.log(gray(`🟩 ${component}-props-schema.json ${cyan('generated')}.`));
    }
    catch (e) {
      console.log(`🟥 ${component}-props-schema.json failed to generate.`);
      console.error(e);
      return 1;
    }
  }
  catch (e) {
    if (e instanceof RootlessError) {
      console.log(gray(`🟨 ${component} has no ${generatorConfig.type}.`));

      return 2;
    }
    else {
      console.error(e);
      return 1;
    }
  }
  return 0;
}

function transformComponentProps(data: unknown): NormalizedPropertiesAST {
  const rawProps = componentRawPropsSchema.parse(data);

  const props = rawProps.definitions[config.propsName];
  const otherProps = Object.keys(rawProps.definitions)
    .filter(k => k !== config.propsName)
    .reduce((acc, k) => {
      acc[k as keyof typeof rawProps.definitions] = rawProps.definitions[k];
      return acc;
    }, {} as Record<string, RawProperty>);

  const normalizedPropertiesAST: NormalizedPropertiesAST = {
    props: createProperty(props, rawProps.definitions) as { type: 'object' } & NormalizedProperty,
  };
  for (const [key, value] of Object.entries(otherProps)) {
    normalizedPropertiesAST[key] = createProperty(value, rawProps.definitions);
  }
  return normalizedPropertiesAST;
}

function createProperty(propertyType: RawProperty, rootPropertyType: Record<string, RawProperty>): NormalizedProperty {
  if ('$ref' in propertyType) {
    const refKey = propertyType.$ref.replace('#/definitions/', '');

    const ref = createProperty(rootPropertyType[refKey], rootPropertyType);

    if (ref.type === 'object' || ref.type === 'enum') {
      return {
        ref: refKey,
        ...ref,
      };
    }
  }
  else if ('anyOf' in propertyType) {
    const anyOf = propertyType.anyOf.map(v => createProperty(v, rootPropertyType));
    return {
      type: 'union',
      anyOf,
    };
  }
  else if ('type' in propertyType) {
    if (propertyType.type === 'object') {
      const properties: Record<keyof typeof propertyType.properties, ReturnType<typeof createProperty>> = {};
      for (const k of Object.keys(propertyType.properties)) {
        properties[k] = createProperty(propertyType.properties[k], rootPropertyType);
        if (propertyType.required?.includes(k)) {
          properties[k].required = true;
        }
      }
      return {
        type: 'object',
        properties,
      };
    }
    else if (propertyType.type === 'boolean') {
      return {
        type: 'boolean',
      };
    }
    else if (propertyType.type === 'string') {
      if (!propertyType.enum) {
        return {
          type: 'string',
        };
      }
      else {
        return {
          type: 'enum',
          values: propertyType.enum,
        };
      }
    }
    else if (propertyType.type === 'number') {
      return {
        type: 'number',
      };
    }
    else if (propertyType.type === 'null') {
      return {
        type: 'null',
      };
    }
    else if (propertyType.type === 'array') {
      const of = createProperty(propertyType.items, rootPropertyType);
      return {
        type: 'array',
        of,
        min: propertyType.minItems,
        max: propertyType.maxItems,
      };
    }
    else if (Array.isArray(propertyType.type)) {
      const anyOf = propertyType.type.map(
        v => createProperty({
          type: v as Exclude<Extract<RawProperty, { type: string | null }>['type'], 'object' | 'array'>,
        }, rootPropertyType),
      );
      return {
        type: 'union',
        anyOf,
      };
    }
  }
  return {
    type: null,
  };
}

function extractDefaults(component: string) {
  const filepath = path.resolve(root, `node_modules/@skgn/melkor/lib/components/${component}/${component}.js`);
  const file = fse.readFileSync(filepath, { encoding: 'utf-8' });
  const regex = /props:\s*(\{(?:[^{}]|\{[^{}]*\})*\})/;
  const match = file.match(regex);
  if (match && match[1]) {
    const json = JSON.parse(
      match[1]
        .replace(/(\w+):/g, '"$1":')
        .replace(/"type": (\[[\w,\s]+\])/g, '"type": "$1"')
        .replace(/(:\s(Boolean|undefined|Number|Object))/g, ': "$2"')
        .replace(/(:\s(void 0))/g, ': "undefined"')
        .replace(/(:\s(!1))/g, ': false')
        .replace(/(:\s(!0))/g, ': true'),
    );

    const parsedSchema = z.record(
      z.string(),
      z.object({
        default: z.unknown(),
      }),
    ).parse(json);

    const defaults = Object
      .entries(parsedSchema)
      .reduce((acc, [k, v]) => {
        if (v.default !== undefined) {
          acc[k] = v.default;
        }
        return acc;
      }, {} as Record<string, unknown>);
    return defaults;
  }
  return null;
}
