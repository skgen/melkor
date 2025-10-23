import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    // Vue support
    './src/unplugin',
    './src/vite',
  ],
  externals: [
    'pathe',
  ],
  failOnWarn: false,
});
