import { isClient } from '@vueuse/core';
import { onMounted, provide, toRef, watch } from 'vue';

import { useGlobalConfig, useThemes } from '..';
import { getPersistedThemePreference, getThemeValue, globalThemeContextKey, persistThemePreference, setElementTheme, Theme, watchSystemThemeChange } from '../../features';

export function useProvideGlobalTheme() {
  const globalConfig = useGlobalConfig();
  const themes = useThemes();
  const globalTheme = toRef(globalConfig.theme);

  const persistedPreference = getPersistedThemePreference();

  if (persistedPreference) {
    globalTheme.value.preference = persistedPreference;
  }
  if (!globalConfig.themes.includes(globalTheme.value.preference)) {
    globalTheme.value.preference = globalConfig.themes.at(0) as string;
    persistThemePreference(null);
  }

  onThemePreferenceChange(globalTheme.value.preference);

  watch(() => globalTheme.value.preference, onThemePreferenceChange);

  function onThemePreferenceChange(newPreference: string) {
    globalTheme.value = {
      preference: newPreference,
      value: getThemeValue(newPreference, themes),
    };
    globalConfig.theme = {
      preference: newPreference,
      value: getThemeValue(newPreference, themes),
    };
    if (isClient) {
      setElementTheme(document.documentElement, globalTheme.value.value);
    }
    persistThemePreference(newPreference);
  }

  provide(globalThemeContextKey, globalTheme);

  onMounted(() => {
    ([Theme.light, Theme.dark] as const).forEach((themeToWatch) => {
      if (globalConfig.themes.includes(themeToWatch)) {
        watchSystemThemeChange(themeToWatch, () => {
          if (globalTheme.value.preference === Theme.system) {
            onThemePreferenceChange(globalTheme.value.preference);
          }
        });
      }
    });
  });

  return {
    theme: globalTheme,
  };
}
