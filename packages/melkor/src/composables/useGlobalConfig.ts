import { isValue } from '@skgn/kit';
import { inject } from 'vue';

import { type GlobalConfig, globalConfigContextKey } from '../features/config';

export function useGlobalConfig(): GlobalConfig {
  const context = inject(globalConfigContextKey);

  if (!isValue(context)) {
    throw new Error('useGlobalConfig must be called inside an App which provides globalConfigContextKey');
  }

  return context;
}
