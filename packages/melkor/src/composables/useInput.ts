import type { InputEmits, InputProps, ValidateInputValue } from '../features';

import { isEqual } from 'lodash-es';
import {
  type EmitFn,
  type Ref,
  ref,
} from 'vue';

import { isValue } from '../features';

// cant use in defineProps because of compiler
// export type InputProps<TState extends InputState<any>> = {
//   modelValue: TState;
//   name?: string;
//   validate?: ValidateInput<TState>;
// };

// type PartialInputModel<T> = Partial<InputModel<T>> & { value: InputModel<T>['value'] };

export type InputModel<T> = Pick<InputProps<T>, 'value' | 'valid' | 'touched' | 'error'>;

export function createInputModel<TValue>(params: {
  value: TValue;
  valid?: boolean;
  touched?: boolean;
  error?: string | string[] | null;
}): InputModel<TValue> {
  return {
    value: params.value,
    valid: params.valid ?? true,
    touched: params.touched ?? false,
    error: params.error ?? null,
  };
}

interface UseInputOptions<TValue> {
  props: InputProps<TValue>;
  emit: EmitFn<InputEmits<TValue>>;
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

export function useInput<TValue>(options: UseInputOptions<TValue>): {
  onChange: (newValue: TValue) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: Ref<boolean>;
} {
  const focused = ref(false);

  function onFocus(): void {
    focused.value = true;
    options.emit('focus');
  }

  function onBlur(): void {
    focused.value = false;
    options.emit('blur');
  }

  function onChange(newValue: TValue): void {
    const newModel: InputModel<TValue> = validateInputModel(newValue, options.props.validate);

    if (!isEqual(options.props.value, newModel.value)) {
      options.emit('update:value', newModel.value);
    }

    if (options.props.valid !== newModel.valid) {
      options.emit('update:valid', newModel.valid);
    }

    if (options.props.touched !== newModel.touched) {
      options.emit('update:touched', newModel.touched);
    }

    if (!isEqual(options.props.error, newModel.error)) {
      options.emit('update:error', newModel.error);
    }
  }

  return {
    onChange,
    onFocus,
    onBlur,
    focused,
  };
}
