import type { GlobalConfig } from '../types';
import { inject } from 'vue';
import { globalConfigContextKey, isValue } from '../features';

export function useGlobalConfig(): GlobalConfig {
  const context = inject(globalConfigContextKey);

  if (!isValue(context)) {
    throw new Error('useGlobalConfig must be called inside an App which provides globalConfigContextKey');
  }

  return context;
}
