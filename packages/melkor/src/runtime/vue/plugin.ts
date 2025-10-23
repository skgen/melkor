import type { DeepObjectPartial } from '@skgn/kit';
import type { App, Plugin } from 'vue';

import { createGlobalConfig, createMelkorOptions, globalConfigContextKey, type MelkorOptions } from '#melkor/features';

import { registerDirectives } from './directives';

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

export type MelkorPluginOptions = DeepObjectPartial<MelkorOptions>;

// export function createMelkor(options?: DeepObjectPartial<MelkorOptions>): Plugin<MelkorOptions> {
export const createMelkor: Plugin<MelkorPluginOptions> = {
  install(app: App, _options) {
    const options = createMelkorOptions(_options);

    const globalConfig = createGlobalConfig(options);

    if (options.themes.length === 0) {
      throw new Error('Melkor UI needs at least 1 theme (dark, light or custom), please don\'t provide an empty theme array.');
    }

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

//   return plugin;
// };
