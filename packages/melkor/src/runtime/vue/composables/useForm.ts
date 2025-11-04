import type { UnwrapNestedRefs } from 'vue';

import type { InputProps } from '../features';
import type { InputBinding } from './useInputBinding';

import { computed, readonly } from 'vue';

export type UseFormOptions<TFields extends FormFields> = {
  fields: TFields;
};

type ExtractValues<F> = {
  [K in keyof F]: F[K] extends InputProps<infer U> ? U : never;
};

type FormFields = {
  [key: string]: InputProps<any> | UnwrapNestedRefs<InputBinding<any>>;
};

export function useForm<TFields extends FormFields>(options: UseFormOptions<TFields>) {
  const valid = computed(() => Object.entries(options.fields).reduce((acc, [_, v]) => !v.valid ? acc + 1 : acc, 0) === 0);

  const data = computed(() => {
    return Object.entries(options.fields).reduce((acc, [key, entry]) => {
      acc[key as keyof TFields] = entry.value;
      return acc;
    }, {} as ExtractValues<TFields>);
  });

  return {
    fields: options.fields,
    valid: readonly(valid),
    data: readonly(data),
  };
}
