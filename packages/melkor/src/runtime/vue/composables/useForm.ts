import type { DeepPartial } from '@skgn/kit';
import type { UnwrapNestedRefs } from 'vue';

import type { InputProps } from '../features';
import type { InputBinding } from './useInputBinding';

import defu from 'defu';
import { computed, reactive, readonly } from 'vue';

export type UseFormOptions<TFields extends FormFields> = {
  fields: TFields;
};

type ExtractValues<F> = {
  [K in keyof F]: F[K] extends { value: infer U } ? U : never;
};

type FormFields = {
  [key: string]: InputProps<any> | InputBinding<InputProps<any>>;
};

const defaultOptions: DeepPartial<UseFormOptions<any>> = {
};

export function useForm<TFields extends FormFields>(_options: UseFormOptions<TFields>) {
  const options = defu(_options, defaultOptions);

  const fields = reactive(options.fields);

  const valid = computed(() => Object.entries(fields).reduce((acc, [_, v]) => !v.valid ? acc + 1 : acc, 0) === 0);

  const data = computed(() => {
    return Object.entries(fields).reduce((acc, [key, input]) => {
      acc[key as keyof UnwrapNestedRefs<TFields>] = input.value;
      return acc;
    }, {} as ExtractValues<UnwrapNestedRefs<TFields>>);
  });

  return {
    fields,
    valid: readonly(valid),
    data: readonly(data),
  };
}
