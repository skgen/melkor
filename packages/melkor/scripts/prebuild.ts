import { generateTsConfigs } from './generate-tsconfigs';
import { buildSSRTheme } from './nuxt/build-ssr-theme';
import { rootPath } from './utils';

await Promise.all([
  buildSSRTheme(rootPath),
  generateTsConfigs(rootPath),
]);
