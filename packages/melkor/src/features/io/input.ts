import type { ZodError, ZodType } from 'zod';

import type { DisabledProps, HoveredProps } from '../interactions';

import { isValue } from '@skgn/kit';
import { isArray, isString } from 'lodash-es';

import { type InferDefaults, isZodError, isZodType } from '../utils';

export type InputProps<TValue> = {
  value: TValue;
  valid?: boolean;
  touched?: boolean;
  name?: string;
  errors?: string[] | ZodError;
  validate?: ValidateInputValue<TValue> | ZodType;
} &
DisabledProps &
HoveredProps;

export type InputEmits<TValue> = {
  'update:value': [value: InputProps<TValue>['value']];
  'update:valid': [valid: InputProps<TValue>['valid']];
  'update:touched': [touched: InputProps<TValue>['touched']];
  'update:errors': [errors: InputProps<TValue>['errors']];
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

export type InputModel<T> = Pick<InputProps<T>, 'value' | 'valid' | 'touched' | 'errors'>;
export type InputModelRest<T> = Pick<InputProps<T>, 'value' | 'valid' | 'touched' | 'errors'>;

export type ValidateInputValue<TValue> = (value: TValue) => string[] | string | void;

export const inputDefaultProps = {
  valid: true,
  touched: false,
  errors: (): string[] => [],
} as const satisfies InferDefaults<InputProps<any>>;

export function validateInputModel<TValue>(newValue: TValue, validate?: ValidateInputValue<TValue> | ZodType): InputModel<TValue> {
  const newModel: InputModel<TValue> = {
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

export function hasErrors(maybeErrors: InputProps<any>['errors']) {
  return isZodError(maybeErrors) || !!maybeErrors?.length;
}
