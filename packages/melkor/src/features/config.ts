import type { DeepPartial } from '@skgn/kit';
import type { TooltipContentProps, TooltipProviderProps } from 'reka-ui';
import type { InjectionKey } from 'vue';

import type { ThemeInstance } from './theme';
import type { ToastPosition } from './toast';

import merge from 'deepmerge';

export enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export interface MelkorOptions {
  debug: boolean;
  themes: ('system' | 'light' | 'dark' | string)[];
  icons: {
    AppInputSelectNative: {
      arrow: string;
    };
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
    AppToast: {
      close: string;
    };
  };
  toast: {
    position: ToastPosition;
    limit: number;
    duration: number;
    swipeThreshold: number;
  };
  tooltip: Required<Pick<TooltipProviderProps, 'delayDuration' | 'disableClosingTrigger' | 'disableHoverableContent' | 'ignoreNonKeyboardFocus' | 'skipDelayDuration'>>
    & Required<Pick<TooltipContentProps, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'avoidCollisions' | 'collisionPadding' | 'hideWhenDetached' | 'positionStrategy' | 'sticky' | 'updatePositionStrategy'>>;
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
    AppInputSelectNative: {
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
    AppToast: {
      close: 'material-symbols:close',
    },
  },
  toast: {
    position: 'bottom-right',
    limit: 10 ** 1e2,
    duration: 5000,
    swipeThreshold: 50,
  },
  tooltip: {
    delayDuration: 300,
    disableClosingTrigger: false,
    disableHoverableContent: false,
    ignoreNonKeyboardFocus: false,
    skipDelayDuration: 300,
    align: 'center',
    alignOffset: 0,
    side: 'top',
    sideOffset: 4,
    avoidCollisions: true,
    collisionPadding: 0,
    hideWhenDetached: true,
    positionStrategy: 'fixed',
    sticky: 'partial',
    updatePositionStrategy: 'optimized',
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
