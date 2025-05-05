import type { EmitsToProps, Ref, ShortEmitsToObject } from 'vue';

import type { DisabledProps, HoveredProps } from '..';

import { ref } from 'vue';

export type InputProps<TValue> = {
  value: TValue;
  valid?: boolean;
  touched?: boolean;
  error?: string | string[] | null;
  validate?: ValidateInputValue<TValue>;
  name?: string;
} &
DisabledProps &
HoveredProps;

// function add(a: number, b: number) {
//   return a + b;
// }

export type InputEmits<TValue> = {
  'update:value': [value: InputProps<TValue>['value']];
  'update:valid': [valid: InputProps<TValue>['valid']];
  'update:touched': [touched: InputProps<TValue>['touched']];
  'update:error': [error: InputProps<TValue>['error']];
  'focus': [];
  'blur': [];
};

export type InputSlots = {
  label: () => any;
  hint: () => any;
};

// export type InputEmits<TValue> = {
//   (event: 'update:value', value: InputProps<TValue>['value']): void;
//   (event: 'update:valid', valid: InputProps<TValue>['valid']): void;
//   (event: 'update:touched', touched: InputProps<TValue>['touched']): void;
//   (event: 'update:error', error: InputProps<TValue>['error']): void;
//   (event: 'focus'): void;
//   (event: 'blur'): void;
// };

// type ShortEmits<T extends Record<string, any>> = UnionToIntersection<RecordToUnion<{
//   [K in keyof T]: (evt: K, ...args: T[K]) => void;
// }>>;

// Input
// Only add properties that change only when value change
// export interface InputModel<T> {
//   value: T;
//   valid: boolean;
//   touched: boolean;
//   error: string | string[] | null;
// }

export type ValidateInputValue<TValue> = (value: TValue) => InputProps<TValue>['error'];

export function inputModel<T>(model: Partial<Omit<InputProps<T>, 'value'>> & Pick<InputProps<T>, 'value'>): {
  value: Ref<InputProps<T>['value']>;
  valid: Ref<InputProps<T>['valid']>;
  touched: Ref<InputProps<T>['touched']>;
  error: Ref<InputProps<T>['error']>;
} & Required<Pick<
  EmitsToProps<ShortEmitsToObject<InputEmits<T>>>,
  'onUpdate:value' |
  'onUpdate:valid' |
  'onUpdate:touched' |
  'onUpdate:error'
>> {
  const value = ref(model.value) as Ref<T>;
  const valid: Ref<InputProps<T>['valid']> = ref(model.valid ?? true);
  const touched: Ref<InputProps<T>['touched']> = ref(model.touched ?? false);
  const error: Ref<InputProps<T>['error']> = ref(model.error ?? null);

  return {
    value,
    valid,
    touched,
    error,
    'onUpdate:value': v => value.value = v,
    'onUpdate:valid': v => valid.value = v,
    'onUpdate:touched': v => touched.value = v,
    'onUpdate:error': v => error.value = v,
  };
}

// type A = ;

// const a: A = {
//   ''
// }

// export function bindInputEmits<TValue>(emit: EmitFn<InputNewEmits<TValue>>): ShortEmitsToObject<InputNewEmits<TValue>> {
//   return {
//     'update:value': value => emit('update:value', value),
//     'update:valid': valid => emit('update:valid', valid),
//     'update:touched': touched => emit('update:touched', touched),
//     'update:error': error => emit('update:error', error),
//     'focus': () => emit('focus'),
//     'blur': () => emit('blur'),
//   };
// }
