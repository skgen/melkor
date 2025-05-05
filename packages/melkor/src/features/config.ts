import type { InjectionKey } from 'vue';

import merge from 'deepmerge';

import { type DeepPartial, Theme, type ThemeInstance } from '.';

export interface MelkorOptions {
  debug: boolean;
  themes: ('system' | 'light' | 'dark' | string)[];
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
    AppPagination: {
      prev: string;
      next: string;
      gap: string;
    };
    AppThemeToggle: {
      system: string;
      light: string;
      dark: string;
      [key: string]: string;
    };
    AppCheckbox: {
      checked: string;
    };
  };
}

export type GlobalConfig = MelkorOptions & {
  theme: ThemeInstance;
};

export const globalConfigContextKey = Symbol('Inject key of global config') as InjectionKey<GlobalConfig>;

export const STORAGE_THEME_KEY = 'mk-theme-preference';

const defaultMelkorOptions: MelkorOptions = {
  debug: false,
  themes: [Theme.system, Theme.light, Theme.dark],
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
    AppPagination: {
      prev: 'material-symbols:arrow-back-ios-new',
      next: 'material-symbols:arrow-forward-ios',
      gap: 'material-symbols:more-horiz',
    },
    AppThemeToggle: {
      system: 'material-symbols:settings',
      light: 'material-symbols:light-mode',
      dark: 'material-symbols:dark-mode',
    },
    AppCheckbox: {
      checked: 'material-symbols:check',
    },
  },
};

export function createMelkorOptions(melkorOptions?: DeepPartial<MelkorOptions>): MelkorOptions {
  if (!melkorOptions) {
    return structuredClone(defaultMelkorOptions);
  }
  return merge(defaultMelkorOptions, melkorOptions, {
    arrayMerge: (_, source) => {
      return source;
    },
  }) as MelkorOptions;
}

export function createGlobalConfig(melkorOptions = createMelkorOptions()): GlobalConfig {
  return {
    ...melkorOptions,
    theme: {
      value: Theme.system,
      preference: Theme.system,
    },
  };
}

export enum Shape {
  circle = 'circle',
  rectangle = 'rectangle',
}
