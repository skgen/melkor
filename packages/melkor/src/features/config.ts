import type { InjectionKey } from 'vue';

import type { GlobalConfig, MelkorOptions } from '../types';
import { Theme } from '.';

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
      AppInputText: {
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
