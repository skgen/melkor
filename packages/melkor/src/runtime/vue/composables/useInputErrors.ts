import type { InputProps } from '../features';

import { computed, reactive, readonly, type Ref } from 'vue';

import { formatErrors, hasErrors } from '../features';

export function useInputErrors<TValue>(errors: Ref<InputProps<TValue>['errors']>) {
  const _hasErrors = computed(() => hasErrors(errors.value));
  const formattedErrors = computed(() => _hasErrors.value ? formatErrors(errors.value!) : null);

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
