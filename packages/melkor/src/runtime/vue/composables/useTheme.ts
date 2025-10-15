import { isValue } from '@skgn/kit';
import { type ComputedRef, inject } from 'vue';

import { themeContextKey, type ThemeInstance } from '../features';

export function useTheme(): ComputedRef<ThemeInstance> {
  const context = inject(themeContextKey);

  if (!isValue(context)) {
    throw new Error('useTheme must be called inside an <AppThemeContext />');
  }

  return context;
}
