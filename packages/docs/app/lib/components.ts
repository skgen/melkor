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
  textareaInput: {
    label: 'Textarea Input',
    path: '/components/input-textarea',
  },
  numberInput: {
    label: 'Number Input',
    path: '/components/input-number',
  },
  colorInput: {
    label: 'Color Input',
    path: '/components/input-color',
  },
  checkboxInput: {
    label: 'Checkbox Input',
    path: '/components/input-checkbox',
  },
  radioInput: {
    label: 'Radio Input',
    path: '/components/input-radio',
  },
  toggleInput: {
    label: 'Toggle Input',
    path: '/components/input-toggle',
  },
  selectNativeInput: {
    label: 'Select Native Input',
    path: '/components/input-select-native',
  },
  selectInput: {
    label: 'Select Input',
    path: '/components/input-select',
  },
  iconInput: {
    label: 'Icon Input',
    path: '/components/input-icon',
  },
  toast: {
    label: 'Toast',
    path: '/components/toast',
  },
  progress: {
    label: 'Progress',
    path: '/components/progress',
  },
  tooltip: {
    label: 'Tooltip',
    path: '/components/tooltip',
  },
  prose: {
    label: 'Prose',
    path: '/components/prose',
  },
};

const normalizedPropertyCoreSchema = z.object({
  required: z.boolean().optional(),
});

export const normalizedPropertyBaseSchema = z.union([
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.literal('boolean'),
      default: z.boolean().optional(),
    }),
  ),
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.literal('string'),
      default: z.string().optional(),
    }),
  ),
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.literal('number'),
      default: z.number().optional(),
    }),
  ),
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.literal('enum'),
      ref: z.string().optional(),
      values: z.array(z.string()),
      default: z.string().optional(),
    }),
  ),
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.literal('null'),
      default: z.null().optional(),
    }),
  ),
  normalizedPropertyCoreSchema.merge(
    z.object({
      type: z.null(),
    }),
  ),
]);

export type NormalizedProperty = {
  required?: boolean;
} &
(
  {
    type: 'object';
    ref?: string;
    properties: Record<string, NormalizedProperty>;
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
    of: NormalizedProperty;
    default?: unknown;
    min?: number;
    max?: number;
  } | {
    type: 'union';
    anyOf: NormalizedProperty[];
    default?: unknown;
  } | {
    type: 'null';
    default?: null;
  } | {
    type: null;
  }
);

export const normalizedPropertySchema: z.ZodType<NormalizedProperty> = z.union(
  [
    normalizedPropertyBaseSchema,
    normalizedPropertyCoreSchema.merge(
      z.object({
        type: z.literal('object'),
        ref: z.string().optional(),
        properties: z.record(z.string(), z.lazy(() => normalizedPropertySchema)),
      }),
    ),
    normalizedPropertyCoreSchema.merge(
      z.object({
        type: z.literal('array'),
        of: z.lazy(() => normalizedPropertySchema),
        default: z.unknown(),
        min: z.number().optional(),
        max: z.number().optional(),
      }),
    ),
    normalizedPropertyCoreSchema.merge(
      z.object({
        type: z.literal('union'),
        anyOf: z.array(z.lazy(() => normalizedPropertySchema)),
        default: z.unknown(),
      }),
    ),
  ],
);

export const normalizedPropertiesASTSchema = z.record(z.string(), normalizedPropertySchema);

export type NormalizedPropertiesAST = z.infer<typeof normalizedPropertiesASTSchema>;
