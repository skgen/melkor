export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    'dist/**',
    '.node_modules/**',
  ],
};
