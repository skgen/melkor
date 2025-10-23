import type { DeepPartial } from '@skgn/kit';
import type { TooltipContentProps, TooltipProviderProps } from 'reka-ui';
import type { InjectionKey } from 'vue';

import type { ThemeInstance, ToastPosition } from '#melkor/features';

import { createDefu } from 'defu';
import { isArray } from 'lodash-es';

export enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export type MelkorOptions = {
  /**
   * Enable or disable debug logs
   * @defaultValue `false`
   */
  debug: boolean;
  /**
   * List of all themes activated
   * @defaultValue `[Theme.system, Theme.light, Theme.dark]`
   */
  themes: ('system' | 'light' | 'dark' | string)[];
  /**
   * Default icons for specified components
   */
  icons: {
    InputSelectNative: {
      arrow: string;
    };
    InputSelect: {
      arrow: string;
    };
    InputTextable: {
      passwordToggleVisibility: {
        show: string;
        hide: string;
      };
    };
    FieldTextableCancel: {
      cancel: string;
    };
    Pagination: {
      prev: string;
      next: string;
      gap: string;
    };
    ThemeToggle: {
      system: string;
      light: string;
      dark: string;
      [key: string]: string;
    };
    Checkbox: {
      checked: string;
    };
    Toast: {
      close: string;
    };
  };
  /**
   * Global toast config
   */
  toast: {
    /**
     * Global toast position
     * @defaultValue `'bottom-right'`
     */
    position: ToastPosition;
    /**
     * Global toast count at the same time
     * @defaultValue `10 ** 1e2`
     */
    limit: number;
    /**
     * Global toast duration before automatic removal
     * @defaultValue `5000` (value is in **ms**)
     */
    duration: number;
    /**
     * Global toast swipe distance before triggering removal
     * @defaultValue `50` (value is in **px**)
     */
    swipeThreshold: number;
  };
  tooltip: Required<Pick<TooltipProviderProps, 'delayDuration' | 'disableClosingTrigger' | 'disableHoverableContent' | 'ignoreNonKeyboardFocus' | 'skipDelayDuration'>>
    & Required<Pick<TooltipContentProps, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'avoidCollisions' | 'collisionPadding' | 'hideWhenDetached' | 'positionStrategy' | 'sticky' | 'updatePositionStrategy'>>;
};

export type GlobalConfig = MelkorOptions & {
  theme: ThemeInstance;
};

export const globalConfigContextKey = Symbol('melkor.config-global-context') as InjectionKey<GlobalConfig>;

export const STORAGE_THEME_KEY = 'mk-theme-preference';

const defaultMelkorOptions: MelkorOptions = {
  debug: false,
  themes: [Theme.system, Theme.light, Theme.dark],
  icons: {
    InputSelect: {
      arrow: 'material-symbols:keyboard-arrow-down',
    },
    InputSelectNative: {
      arrow: 'material-symbols:keyboard-arrow-down',
    },
    InputTextable: {
      passwordToggleVisibility: {
        show: 'material-symbols:visibility',
        hide: 'material-symbols:visibility-off',
      },
    },
    FieldTextableCancel: {
      cancel: 'material-symbols:cancel',
    },
    Pagination: {
      prev: 'material-symbols:arrow-back-ios-new',
      next: 'material-symbols:arrow-forward-ios',
      gap: 'material-symbols:more-horiz',
    },
    ThemeToggle: {
      system: 'material-symbols:settings',
      light: 'material-symbols:light-mode',
      dark: 'material-symbols:dark-mode',
    },
    Checkbox: {
      checked: 'material-symbols:check',
    },
    Toast: {
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

// Factory to create config based on array overring rather than merging
export const mergeConfig = createDefu((obj, key, value) => {
  if (isArray(obj[key]) && isArray(value)) {
    obj[key] = value;
    return true;
  }
});

export function createMelkorOptions(melkorOptions?: DeepPartial<MelkorOptions>): MelkorOptions {
  return mergeConfig({}, melkorOptions, defaultMelkorOptions);
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

export const floatingLayerId = 'floating-layer';
