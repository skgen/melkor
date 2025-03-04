import type { ThemeInstance } from '.';

export interface GlobalConfig {
  debug: boolean;
  themes: string[];
  theme: ThemeInstance;
  icons: {
    AppInputSelect: {
      arrow: string;
    };
    AppInputText: {
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
