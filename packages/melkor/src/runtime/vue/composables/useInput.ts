import type { EmitFn } from 'vue';

import type { InputEmits, InputProps } from '../features';

import { isEqual } from 'lodash-es';
import { computed, onMounted, ref, watch } from 'vue';

import { validateInputValue } from '../features';

export interface UseInputOptions<TValue> {
  props: InputProps<TValue>;
  emit: EmitFn<InputEmits<TValue>>;
}

export function useInput<TValue>(options: UseInputOptions<TValue>) {
  const focused = ref(false);
  const hasBlurred = ref(false);

  const validateOnDirty = computed(() => options.props.validateOn?.includes('dirty') ?? false);
  const validateOnChange = computed(() => options.props.validateOn?.includes('change') ?? false);
  const validateOnMounted = computed(() => options.props.validateOn?.includes('mounted') ?? false);

  function onFocus(event: FocusEvent): void {
    focused.value = true;
    options.emit('focus', event);
  }

  function onBlur(event: FocusEvent): void {
    focused.value = false;
    // Only triggers if first blur and value has changed before
    if (validateOnDirty.value && !hasBlurred.value && (options.props.touched ?? false)) {
      validate(options.props.value);
    }
    hasBlurred.value = true;
    options.emit('blur', event);
  }

  function onChange(newValue: TValue): void {
    if (!isEqual(options.props.value, newValue)) {
      if (!options.props.touched) {
        options.emit('update:touched', true);
      }

      options.emit('update:value', newValue);
    }
  }

  watch(() => options.props.value, (newValue) => {
    if (
      validateOnChange.value
      // Only triggers if has blurred and value has changed before
      || (validateOnDirty.value && (options.props.touched ?? false) && hasBlurred.value)
    ) {
      validate(newValue);
    }
  });

  onMounted(() => {
    if (validateOnMounted.value) {
      validate(options.props.value);
    }
  });

  function validate(value: TValue) {
    if (!options.props.validate) {
      return;
    }
    const { valid, errors } = validateInputValue(value, options.props.validate);

    if (options.props.valid !== valid) {
      options.emit('update:valid', valid);
    }

    if (!isEqual(options.props.errors, errors)) {
      options.emit('update:errors', errors);
    }
  }

  return {
    onChange,
    onFocus,
    onBlur,
    focused,
    validate,
  };
}
