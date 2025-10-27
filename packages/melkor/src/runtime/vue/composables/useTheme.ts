import type { ComputedRef } from 'vue';

import { isValue } from '@skgn/kit';
import { inject } from 'vue';

import { themeContextKey, type ThemeInstance } from '#melkor/features';

export function useTheme(): ComputedRef<ThemeInstance> {
  const context = inject(themeContextKey);

  if (!isValue(context)) {
    throw new Error('useTheme must be called inside an <AppThemeContext />');
  }

  return context;
}
