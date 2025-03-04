import type { InputModel, InputOptions, InputProps } from './input';

export type InputSelectProps<TValue> = InputProps<TValue> & InputSelectOptions<TValue>;

export interface InputSelectEmits<TValue> {
  (event: 'update:model-value', value: InputSelectProps<TValue>['modelValue']): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
};

export type InputSelectModel<TValue> = InputModel<TValue>;

export interface InputSelectOption<TValue> {
  value: TValue;
  disabled?: boolean;
}

export type InputSelectOptions<TValue> = InputOptions<TValue> & {
  fill?: boolean;
  options: InputSelectOption<TValue>[];
};
