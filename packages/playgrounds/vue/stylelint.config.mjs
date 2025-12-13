export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
      rules: {
        'selector-class-pattern': ['(sk-[A-Z][a-zA-Z]+)', { resolveNestedSelectors: false }],
      },
    },
  ],
  ignoreFiles: [
    'dist/**',
    '.node_modules/**',
  ],
};
