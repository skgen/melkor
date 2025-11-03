import type { InputProps } from '../features';

import { computed, reactive, readonly } from 'vue';

import { formatErrors, hasErrors } from '../features';

export function useInputErrors<T>(errors?: InputProps<T>['errors']) {
  const _hasErrors = computed(() => hasErrors(errors));
  const formattedErrors = computed(() => _hasErrors.value ? formatErrors(errors!) : null);

  return readonly(reactive({
    hasErrors: _hasErrors,
    formattedErrors,
  }) as {
    hasErrors: false;
    formattedErrors: null;
  } | {
    hasErrors: true;
    formattedErrors: string;
  });
}
