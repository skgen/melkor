import type { Slot } from 'vue';
import type { ZodError, ZodType } from 'zod';

import type { DisabledProps, HoveredProps } from '../features';

import { isValue } from '@skgn/kit';
import { isArray, isString } from 'lodash-es';

import { isZodError, isZodType } from '../features';

export type InputProps<TValue> = {
  value: TValue;
  valid?: boolean;
  touched?: boolean;
  name?: string;
  errors?: string[] | ZodError;
  validate?: ValidateInputValue<TValue>;
}
& DisabledProps
& HoveredProps;

export type InputEmits<TValue> = {
  'update:value': [value: InputProps<TValue>['value']];
  'update:valid': [valid: InputProps<TValue>['valid']];
  'update:touched': [touched: InputProps<TValue>['touched']];
  'update:errors': [errors: InputProps<TValue>['errors']];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
};

export type InputSlots = {
  label?: Slot;
  hint?: Slot;
};

export type InputExpose = {
  focus: () => void;
  blur: () => void;
};

export type ValidateInputValue<TValue> = ((value: TValue) => string[] | string | void) | ZodType;

export type ValidateInputValueReturn<TValue> = Pick<InputProps<TValue>, 'value' | 'valid' | 'touched' | 'errors'>;

export function validateInputValue<TValue>(newValue: TValue, validate?: ValidateInputValue<TValue>): ValidateInputValueReturn<TValue> {
  const newModel: ValidateInputValueReturn<TValue> = {
    value: newValue,
    touched: true,
    errors: [],
    valid: true,
  };

  if (isValue(validate)) {
    if (isZodType(validate)) {
      const result = validate.safeParse(newValue);
      newModel.errors = result.success ? [] : result.error;
      newModel.valid = result.success;
    }
    else {
      const _errors = validate(newModel.value) ?? [];
      if (isString(_errors)) {
        newModel.errors = [_errors];
      }
      newModel.valid = isArray(newModel.errors) && newModel.errors.length === 0;
    }
  }
  return newModel;
}

export function hasErrors<T>(maybeErrors: InputProps<T>['errors']) {
  return isZodError(maybeErrors) || !!maybeErrors?.length;
}
