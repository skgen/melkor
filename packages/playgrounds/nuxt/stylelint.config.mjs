export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    'dist/**',
    '.nuxt/**',
    '.output/**',
    '.node_modules/**',
  ],
};
