import { buildSSRTheme } from './build-ssr-theme';
import { generateTsConfigs } from './generate-tsconfigs';
import { rootPath } from './utils';

await Promise.all([
  buildSSRTheme(rootPath),
  generateTsConfigs(rootPath),
]);
