import type { InferDefaults } from '../utils';

import { inputTextableDefaultProps, type InputTextableEmits, type InputTextableExpose, type InputTextableProps, type InputTextableSlots } from './input-textable';

export type InputTextareaValue = string | null;

export type InputTextareaProps = Omit<InputTextableProps<InputTextareaValue>, 'secure'> & {
  rows?: number;
};

export type InputTextareaEmits = InputTextableEmits<InputTextareaValue>;

export type InputTextareaSlots = Omit<InputTextableSlots<InputTextareaValue>, 'default'>;

export type InputTextareaExpose = InputTextableExpose;

export const inputTextareaDefaultProps: InferDefaults<InputTextareaProps> = {
  ...inputTextableDefaultProps,
  rows: 2,
};
