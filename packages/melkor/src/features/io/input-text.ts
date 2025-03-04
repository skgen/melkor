import type { InputModel, InputOptions, InputProps } from '..';

export type InputTextValue = string | null;

export type InputTextProps = InputProps<InputTextValue> & InputTextOptions;

export interface InputTextEmits {
  (event: 'update:model-value', value: InputTextProps['modelValue']): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
};

export type InputTextModel = InputModel<InputTextValue>;

export type InputTextOptions = InputOptions<InputTextValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
  password?: boolean;
};
