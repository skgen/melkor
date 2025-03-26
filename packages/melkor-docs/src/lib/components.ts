import { z } from 'zod';

export const components = {
  button: {
    label: 'Button',
    path: '/components/button',
  },
  card: {
    label: 'Card',
    path: '/components/card',
  },
  image: {
    label: 'Image',
    path: '/components/image',
  },
  pagination: {
    label: 'Pagination',
    path: '/components/pagination',
  },
  themeToggle: {
    label: 'Theme Toggle',
    path: '/components/theme-toggle',
  },
  checkables: {
    label: 'Checkables',
    path: '/components/checkables',
  },
  textInput: {
    label: 'Text Input',
    path: '/components/input-text',
  },
  numberInput: {
    label: 'Number Input',
    path: '/components/input-number',
  },
  colorInput: {
    label: 'Color Input',
    path: '/components/input-color',
  },
};

const propertyCoreSchema = z.object({
  required: z.boolean().optional(),
});

export const propertyBaseSchema = z.union([
  propertyCoreSchema.merge(
    z.object({
      type: z.literal('boolean'),
      default: z.boolean().optional(),
    }),
  ),
  propertyCoreSchema.merge(
    z.object({
      type: z.literal('string'),
      default: z.string().optional(),
    }),
  ),
  propertyCoreSchema.merge(
    z.object({
      type: z.literal('number'),
      default: z.number().optional(),
    }),
  ),
  propertyCoreSchema.merge(
    z.object({
      type: z.literal('enum'),
      ref: z.string().optional(),
      values: z.array(z.string()),
      default: z.string().optional(),
    }),
  ),
  propertyCoreSchema.merge(
    z.object({
      type: z.literal('null'),
      default: z.null().optional(),
    }),
  ),
  propertyCoreSchema.merge(
    z.object({
      type: z.null(),
    }),
  ),
]);

export type Property = {
  required?: boolean;
} &
(
  {
    type: 'object';
    ref?: string;
    properties: Record<string, Property>;
    default?: object;
  } | {
    type: 'boolean';
    default?: boolean;
  } | {
    type: 'string';
    default?: string;
  } | {
    type: 'number';
    default?: number;
  } | {
    type: 'enum';
    ref?: string;
    values: string[];
    default?: string;
  } | {
    type: 'array';
    of: Property;
    default?: unknown;
    min?: number;
    max?: number;
  } | {
    type: 'union';
    anyOf: Property[];
    default?: unknown;
  } | {
    type: 'null';
    default?: null;
  } | {
    type: null;
  }
);

export const propertySchema: z.ZodType<Property> = z.union(
  [
    propertyBaseSchema,
    z.object({
      type: z.literal('object'),
      ref: z.string().optional(),
      properties: z.record(z.string(), z.lazy(() => propertySchema)),
    }),
    propertyCoreSchema.merge(
      z.object({
        type: z.literal('array'),
        of: z.lazy(() => propertySchema),
        default: z.unknown(),
        min: z.number().optional(),
        max: z.number().optional(),
      }),
    ),
    propertyCoreSchema.merge(
      z.object({
        type: z.literal('union'),
        anyOf: z.array(z.lazy(() => propertySchema)),
        default: z.unknown(),
      }),
    ),
  ],
);

// Keep in sync with propertySchema { type: 'object' } definition
const propertyObjectSchema = propertyCoreSchema.merge(
  z.object({
    type: z.literal('object'),
    ref: z.string().optional(),
    properties: z.record(z.string(), z.lazy(() => propertySchema)),
  }),
);

export const propertyASTSchema = z.object({
  props: propertyObjectSchema,
}).catchall(propertySchema);

export type PropertyAST = z.infer<typeof propertyASTSchema> & {
  [key: string]: Property;
};
