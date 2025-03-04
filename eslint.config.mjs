import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'lib',
    typescript: true,
    vue: true,
    stylistic: {
      semi: true,
    },
    ignores: [
      'packages/melkor/lib',
      'packages/melkor/dist',
      'packages/melkor/playground/dist',
      'packages/melkor-nuxt/.nuxt',
      'packages/melkor-nuxt/.output',
      'packages/melkor-nuxt/dist',
      'packages/melkor-nuxt/playground/.nuxt',
      'packages/melkor-nuxt/playground/.output',
      'packages/melkor-nuxt/playground/dist',
      'packages/melkor-docs/playground/.nuxt',
      'packages/melkor-docs/playground/.output',
      'packages/melkor-docs/playground/dist',
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
