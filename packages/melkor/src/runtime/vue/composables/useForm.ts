import type { InputProps } from '#melkor/features';

import { computed, readonly, ref } from 'vue';

export type UseFormOptions<TFields extends Record<string, InputProps<any>>> = {
  fields: TFields;
};

type ExtractValues<F> = {
  [K in keyof F]: F[K] extends InputProps<infer U> ? U : never;
};

export function useForm<TFields extends Record<string, InputProps<any>>>(options: UseFormOptions<TFields>) {
  const valid = ref(true);

  const data = computed(() => {
    let newValid = true;
    const reflect = Object.entries(options.fields).reduce((acc, [key, entry]) => {
      newValid = newValid && (entry.valid ?? true);
      acc[key as keyof TFields] = entry.value;
      return acc;
    }, {} as ExtractValues<TFields>);
    valid.value = newValid;
    return reflect;
  });

  return {
    fields: options.fields,
    valid: readonly(valid),
    data: readonly(data),
  };
}
