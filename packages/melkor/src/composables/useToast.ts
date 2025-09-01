import { isValue } from '@skgn/kit';
import { inject } from 'vue';

import { globalToastContextKey } from '../features/toast';

export function useToast() {
  const context = inject(globalToastContextKey);

  if (!isValue(context)) {
    throw new Error('useToast must be called inside an App which provides globalToastContextKey');
  }

  return context;
}
