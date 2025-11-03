import type { ThemeInstance } from '../features';

import { isValue } from '@skgn/kit';
import { inject, type Ref } from 'vue';

import { globalThemeContextKey } from '../features';

export function useGlobalTheme(): Ref<ThemeInstance> {
  const context = inject(globalThemeContextKey);

  if (!isValue(context)) {
    throw new Error('useGlobalTheme was used without <TheApp /> instance in your application, you need to wrap your applicatinon with <TheApp /> component');
  }

  return context;
}
