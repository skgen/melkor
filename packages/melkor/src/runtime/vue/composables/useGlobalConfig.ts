import type { GlobalConfig } from '#melkor/features';

import { isValue } from '@skgn/kit';
import { inject } from 'vue';

import { globalConfigContextKey } from '#melkor/features';

export function useGlobalConfig(): GlobalConfig {
  const context = inject(globalConfigContextKey);

  if (!isValue(context)) {
    throw new Error('useGlobalConfig must be called inside an App which provides globalConfigContextKey');
  }

  return context;
}
