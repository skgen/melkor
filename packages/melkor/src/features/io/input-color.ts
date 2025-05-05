import type { InputEmits, InputProps, InputSlots } from '..';

export type InputColorValue = string | null;

export type InputColorProps = InputProps<InputColorValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
};

export type InputColorEmits = InputEmits<InputColorValue>;

export type InputColorSlots = InputSlots & {
  'trailing-icon': () => any;
  'cancel-icon': () => any;
};
