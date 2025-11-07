import type { Slot } from 'vue';
import type { ZodError, ZodType } from 'zod';

import type { DisabledProps, HoveredProps } from '../features';

import { isValue } from '@skgn/kit';
import { isArray, isString } from 'lodash-es';

import { isZodError, isZodType } from '../features';

export type InputProps<TValue> = {
  value: TValue;
  valid?: boolean;
  /**
   * @description True if the value has changed at least once, reassigning same value doesn't trigger touched
   */
  touched?: boolean;
  name?: string;
  errors?: string[] | ZodError;
  validate?: ValidateInputValue<TValue>;
  /**
   * @description
   * - `change` = everytime value changes
   * - `dirty` = everytime value changes, if input is considered dirty (blured once + touched)
   * - `mounted` = once on mounted
   *
   * Setting `change` & `dirty` results in ignoring `dirty` as `change` is a superset of `dirty`
   */
  validateOn?: ('change' | 'dirty' | 'mounted')[];
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

export function validateInputValue<TValue>(newValue: TValue, validate: ValidateInputValue<TValue>) {
  let errors: InputProps<TValue>['errors'] = [];
  let valid: InputProps<TValue>['valid'] = true;

  if (isValue(validate)) {
    if (isZodType(validate)) {
      const result = validate.safeParse(newValue);
      errors = result.success ? [] : result.error;
      valid = result.success;
    }
    else {
      const _errors = validate(newValue) ?? [];
      if (isString(_errors)) {
        errors = [_errors];
      }
      valid = isArray(errors) && errors.length === 0;
    }
  }

  return {
    valid,
    errors,
  };
}

export function hasErrors<T>(maybeErrors: InputProps<T>['errors']) {
  return isZodError(maybeErrors) || !!maybeErrors?.length;
}
