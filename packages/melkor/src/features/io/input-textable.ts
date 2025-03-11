import type { InputOptions, InputProps } from '..';

export type InputTextableProps<InputTextableValue> = InputProps<InputTextableValue> & InputTextableOptions<InputTextableValue>;

export interface InputTextableEmits<InputTextableValue> {
  (event: 'update:model-value', value: InputTextableProps<InputTextableValue>['modelValue']): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
};

export type InputTextableOptions<InputTextableValue> = InputOptions<InputTextableValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
  encrypted?: boolean;
};
