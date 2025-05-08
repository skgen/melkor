import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputColorValue = string | null;

export type InputColorProps = InputProps<InputColorValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
};

export type InputColorEmits = InputEmits<InputColorValue>;

export type InputColorSlots = InputSlots & {
  'trailing-icon'?: () => any;
  'cancel-icon'?: () => any;
};

export type InputColorExpose = InputExpose;

export const inputColorDefaultProps: InferDefaults<InputColorProps> = inputDefaultProps;
