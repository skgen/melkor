import type { ComputedRef, InjectionKey, Ref } from 'vue';

import { isClient, isValue, STORAGE_THEME_KEY } from '.';

export type Themes = string[];

export type SystemTheme = 'light' | 'dark';

export interface ThemeInstance {
  preference: string;
  value: string;
}

// function onThemeChange(newThemeValue: string): void {
//   console.log('theme changed');
//   persistTheme(newThemeValue);
//   setDocumentTheme(newThemeValue);
// }

// function onSeedChange(): void {
//   console.log('seed changed');
//   persistTheme(globalConfig.theme.value);
//   setDocumentTheme(globalConfig.theme.value);
// }

export enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export function getSystemColorScheme(): string | null {
  if (isClient()) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.dark;
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return Theme.light;
    }
  }

  return null;
}

export function getPersistedThemePreference(): string | null {
  if (isClient()) {
    return window.localStorage.getItem(STORAGE_THEME_KEY);
  }
  return null;
}

export function persistThemePreference(themePreference: string | null): void {
  if (isClient()) {
    if (isValue(themePreference)) {
      window.localStorage.setItem(STORAGE_THEME_KEY, themePreference);
    }
    else {
      window.localStorage.removeItem(STORAGE_THEME_KEY);
    }
  }
}

export function getThemeValue(preference: string, themes: string[]): string {
  if (preference !== Theme.system) {
    return preference;
  }
  const systemColorScheme = getSystemColorScheme();
  if (systemColorScheme && themes.includes(systemColorScheme)) {
    return systemColorScheme;
  }

  const fallbackColorScheme = themes
    .filter(t => t !== Theme.system)
    .find((v, i) => i === 0);
  if (fallbackColorScheme) {
    return fallbackColorScheme;
  }
  throw new Error('No default theme provided, Melkor UI needs at least 1 real theme (dark, light or custom)');
}

export function setElementTheme(el: HTMLElement, theme: string): void {
  el.setAttribute('data-theme', theme);
}

export function watchSystemThemeChange(systemTheme: SystemTheme, onChange: () => void): void {
  if (isClient()) {
    window.matchMedia(`(prefers-color-scheme: ${systemTheme})`).addEventListener('change', (e) => {
      if (e.matches) {
        onChange();
      }
    });
  }
}

// export function setupThemes(newThemes: Themes): void {
//   return;
//   // Persist system theme for future use
//   const preferredThemeValue = getPreferredThemeValue();
//   if (isClient()) {
//     localStorage.setItem(globalConfig.cookies.preferredTheme, preferredThemeValue);
//   }

//   if (newThemes.length === 0) {
//     throw new Error('Melkor UI needs at least 1 theme (dark, light or custom), please don\'t provide an empty theme array.');
//   }

//   globalConfig.themes = newThemes;

//   if (globalConfig.themes.includes(Theme.light)) {
//     watchSystemThemeChange(Theme.light);
//   }
//   if (globalConfig.themes.includes(Theme.dark)) {
//     watchSystemThemeChange(Theme.dark);
//   }

//   globalConfig.theme.value = getPreferredTheme();

//   // Force loading system theme real value
//   onThemeChange(globalConfig.theme.value);

//   // Only watch after to prevent triggering twice
//   watch(() => globalConfig.theme.value, onThemeChange);
//   watch(() => globalConfig.theme.seed, onSeedChange);
// }

// Local theme config

export const globalThemeContextKey = Symbol('Inject key of global theme') as InjectionKey<Ref<ThemeInstance>>;
export const themeContextKey = Symbol('Inject key of theme context') as InjectionKey<ComputedRef<ThemeInstance>>;
