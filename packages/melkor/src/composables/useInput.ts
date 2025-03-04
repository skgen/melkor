import type { InputModel, InputProps, ValidateInputValue } from '../types';
import { isEqual } from 'lodash-es';
import {
  computed,
  type ComputedRef,
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

type PartialInputModel<T> = Partial<InputModel<T>> & { value: InputModel<T>['value'] };

export function createInputModel<T>(params: PartialInputModel<T>): InputModel<T> {
  return {
    value: params.value,
    valid: params.valid ?? true,
    touched: params.touched ?? false,
    error: params.error ?? null,
  };
}

interface UseInputOptions<TValue, TEmits> {
  props: ComputedRef<InputProps<TValue>>;
  emit: TEmits;
}

export function validateInputModel<TValue>(model: InputModel<TValue>, validate?: ValidateInputValue<TValue>): InputModel<TValue> {
  const newModel = { ...model };

  if (isValue(validate)) {
    newModel.error = validate(newModel.value);
    newModel.valid = !newModel.error;
  }
  return newModel;
}

interface InputEmits<Value> {
  (event: 'update:model-value', value: InputModel<Value>): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
}

export function useInput<TValue>(options: UseInputOptions<TValue, InputEmits<TValue>>): {
  onChange: (newValue: TValue) => void;
  onFocus: () => void;
  onBlur: () => void;
  model: ComputedRef<InputModel<TValue>>;
  focused: Ref<boolean>;
} {
  const { emit, props } = options;

  const model = computed(() => props.value.modelValue);
  const validate = computed(() => props.value.validate);

  const focused = ref(false);

  function onFocus(): void {
    focused.value = true;
    emit('focus');
  }

  function onBlur(): void {
    focused.value = false;
    emit('blur');
  }

  function onChange(newValue: TValue): void {
    const partialModel: Pick<InputModel<TValue>, 'touched' | 'error' | 'valid'> = {
      touched: true,
      error: null,
      valid: true,
    };
    const newModel: InputModel<TValue> = validateInputModel({
      value: newValue,
      ...partialModel,
    }, validate.value);

    if (!isEqual(model, newModel)) {
      emit('update:model-value', newModel);
    }
  }

  return {
    onChange,
    onFocus,
    onBlur,
    model,
    focused,
  };
}
