import type { App, Plugin } from 'vue';
import defu from 'defu';
import { registerDirectives } from './directives';
import {
  createGlobalConfig,
  createMelkorOptions,
  type DeepObjectPartial,
  getDefaultAs,
  globalConfigContextKey,
  type MelkorOptions,
} from './features';

// import registerComponents from '@src/registerComponents';
// import registerDirectives from '@src/registerDirectives';
// import { setLocales } from '@src/features/modules/i18n';
// import { registerFloatingConfig } from '@src/plugins/floating';
// import { getPreferedTheme, setDocumentTheme, setThemes } from '@src/features/modules/theme';
// import {
//   configContextKey, IconShape,
// } from '@src/definition';
// import { setDateFnsLocales, type DateFnsLocales } from '@src/features/modules/date';

// interface IconOptions {
//   shape?: IconShape;
// }

export function createMelkorUI(options?: DeepObjectPartial<MelkorOptions>): Plugin<[]> {
  const melkorOptions: MelkorOptions = options as MelkorOptions;

  const globalConfig = createGlobalConfig(melkorOptions);

  if (melkorOptions.themes.length === 0) {
    throw new Error('Melkor UI needs at least 1 theme (dark, light or custom), please don\'t provide an empty theme array.');
  }

  const plugin: Plugin<[]> = {
    install(app: App) {
      // if (pluginOptions.dateFnsLocales) {
      //   setDateFnsLocales(pluginOptions.dateFnsLocales);
      // }

      // if (!app.config.globalProperties.$i18n) {
      //   throw new Error('[MelkorUI] Missing vue-i18n plugin active instance');
      // }
      // if (!app.config.globalProperties.$router) {
      //   throw new Error('[MelkorUI] Missing vue-router plugin active instance');
      // }

      // setLocales(app.config.globalProperties.$i18n.availableLocales);

      // app.config.globalProperties.$melkor = globalConfig;

      // registerComponents(app);

      registerDirectives(app);
      // registerFloatingConfig();

      app.provide(globalConfigContextKey, globalConfig);
    },
  };

  return plugin;
};
