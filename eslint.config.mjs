import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'lib',
    typescript: {
      overrides: {
        // lack of vue support, see https://github.com/un-ts/eslint-plugin-import-x/issues/177
        'import/first': ['off'],
        // lack of vue support, same as https://github.com/un-ts/eslint-plugin-import-x/issues/177
        'import/no-duplicates': ['off'],
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'type',
              [
                'parent-type',
                'sibling-type',
                'index-type',
                'internal-type',
              ],
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              // 'side-effect',
              'object',
              'unknown',
            ],
            newlinesBetween: 'always',
            internalPattern: ['^#melkor/.+'],
            order: 'asc',
            type: 'natural',
          },
        ],
        'ts/explicit-function-return-type': ['off'],
        'ts/consistent-type-definitions': ['off'],
        'ts/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
      },
    },
    vue: true,
    stylistic: {
      semi: true,
    },
    ignores: [
      'packages/*/dist',
      'packages/*/.nuxt',
      'packages/*/.output',
      'packages/docs/content/generated',
    ],
    formatters: {
      css: true,
    },
  },
  {
    rules: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'perfectionist/sort-exports': ['error', {
        partitionByComment: true,
        ignoreCase: false,
      }],
    },
  },
);
