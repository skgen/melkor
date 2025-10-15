import type { App } from 'vue';

import { vTheme } from './theme';

export function registerDirectives(app: App): void {
  app.directive(...vTheme);
}
