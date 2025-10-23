import type { ComputedRef, InjectionKey, Ref } from 'vue';

import { isValue } from '@skgn/kit';
import { isClient } from '@vueuse/core';

import { STORAGE_THEME_KEY, Theme } from '#melkor/features';

export type Themes = string[];

export type SystemTheme = 'light' | 'dark';

export interface ThemeInstance {
  preference: string;
  value: string;
}

export function getSystemColorScheme(): string | null {
  if (isClient) {
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
  if (isClient) {
    return window.localStorage.getItem(STORAGE_THEME_KEY);
  }
  return null;
}

export function persistThemePreference(themePreference: string | null): void {
  if (isClient) {
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
    .at(0);
  if (fallbackColorScheme) {
    return fallbackColorScheme;
  }
  throw new Error('No default theme provided, Melkor UI needs at least 1 real theme (dark, light or custom)');
}

export function setElementTheme(el: HTMLElement, theme: string): void {
  el.setAttribute('data-theme', theme);
}

export function watchSystemThemeChange(systemTheme: SystemTheme, onChange: () => void): void {
  if (isClient) {
    window.matchMedia(`(prefers-color-scheme: ${systemTheme})`).addEventListener('change', (e) => {
      if (e.matches) {
        onChange();
      }
    });
  }
}

// Local theme config

export const globalThemeContextKey = Symbol('melkor.global-theme-context') as InjectionKey<Ref<ThemeInstance>>;
export const themeContextKey = Symbol('melkor.theme-context') as InjectionKey<ComputedRef<ThemeInstance>>;
