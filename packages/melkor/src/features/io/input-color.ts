import type { InputModel, InputOptions, InputProps } from '..';

export type InputColorValue = string | null;

export type InputColorProps = InputProps<InputColorValue> & InputColorOptions;

export interface InputColorEmits {
  (event: 'update:model-value', value: InputColorProps['modelValue']): void;
  (event: 'focus'): void;
  (event: 'blur'): void;
};

export type InputColorModel = InputModel<InputColorValue>;

export type InputColorOptions = InputOptions<InputColorValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
};
