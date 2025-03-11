import type { InjectionKey } from 'vue';

import { Theme, type ThemeInstance } from '.';

export interface GlobalConfig {
  debug: boolean;
  themes: string[];
  theme: ThemeInstance;
  icons: {
    AppInputSelect: {
      arrow: string;
    };
    AppInputTextable: {
      passwordToggleVisibility: {
        show: string;
        hide: string;
      };
    };
    AppInputTextableCancel: {
      cancel: string;
    };
  };
}

export interface MelkorOptions {
  debug: boolean;
  themes: string[];
  // dateFnsLocales?: DateFnsLocales;
  // components?: {
  //   icon?: IconOptions;
  // };
}

export const globalConfigContextKey = Symbol('Inject key of global config') as InjectionKey<GlobalConfig>;

export const STORAGE_THEME_KEY = 'mk-theme-preference';

export function createGlobalConfig(): GlobalConfig {
  return {
    debug: false,
    themes: [Theme.system, Theme.light, Theme.dark],
    theme: {
      value: Theme.system,
      preference: Theme.system,
    },
    icons: {
      AppInputSelect: {
        arrow: 'material-symbols:keyboard-arrow-down',
      },
      AppInputTextable: {
        passwordToggleVisibility: {
          show: 'material-symbols:visibility',
          hide: 'material-symbols:visibility-off',
        },
      },
      AppInputTextableCancel: {
        cancel: 'material-symbols:cancel',
      },
    },
  };
}

export function createMelkorOptions(): MelkorOptions {
  return {
    debug: false,
    themes: [Theme.system, Theme.light, Theme.dark],
    // components: {
    //   icon: {
    //     shape: IconShape.rounded,
    //   },
    // },
  };
}

export enum Shape {
  circle = 'circle',
  rectangle = 'rectangle',
}
