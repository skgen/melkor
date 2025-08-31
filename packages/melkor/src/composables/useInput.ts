import { isEqual } from 'lodash-es';
import {
  type EmitFn,
  type Ref,
  ref,
} from 'vue';

import { type InputEmits, type InputProps, validateInputValue } from '../features/io/input';

export interface UseInputOptions<TValue> {
  props: InputProps<TValue>;
  emit: EmitFn<InputEmits<TValue>>;
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
    const newModel = validateInputValue(newValue, options.props.validate);

    if (!isEqual(options.props.value, newModel.value)) {
      options.emit('update:value', newModel.value);
    }

    if (options.props.valid !== newModel.valid) {
      options.emit('update:valid', newModel.valid);
    }

    if (options.props.touched !== newModel.touched) {
      options.emit('update:touched', newModel.touched);
    }

    if (!isEqual(options.props.errors, newModel.errors)) {
      options.emit('update:errors', newModel.errors);
    }
  }

  return {
    onChange,
    onFocus,
    onBlur,
    focused,
  };
}
