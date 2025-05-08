import type { EmitsToProps, Ref, ShortEmitsToObject } from 'vue';

import type { DisabledProps, HoveredProps } from '../interactions';
import type { InferDefaults } from '../utils';

import { isValue } from '@skgn/kit';
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

export type InputEmits<TValue> = {
  'update:value': [value: InputProps<TValue>['value']];
  'update:valid': [valid: InputProps<TValue>['valid']];
  'update:touched': [touched: InputProps<TValue>['touched']];
  'update:error': [error: InputProps<TValue>['error']];
  'focus': [];
  'blur': [];
};

export type InputSlots = {
  label?: () => any;
  hint?: () => any;
};

export type InputExpose = {
  focus: () => void;
  blur: () => void;
};

export type InputModel<T> = Pick<InputProps<T>, 'value' | 'valid' | 'touched' | 'error'>;

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

export function validateInputModel<TValue>(newValue: TValue, validate?: ValidateInputValue<TValue>): InputModel<TValue> {
  const newModel: InputModel<TValue> = {
    value: newValue,
    touched: true,
    error: null,
    valid: true,
  };

  if (isValue(validate)) {
    newModel.error = validate(newModel.value);
    newModel.valid = !newModel.error;
  }
  return newModel;
}

export const inputDefaultProps: InferDefaults<InputProps<any>> = {
  valid: true,
  touched: false,
  error: null,
};
