import type { InferDefaults } from '../utils';

import { inputTextableDefaultProps, type InputTextableEmits, type InputTextableExpose, type InputTextableProps, type InputTextableSlots } from './input-textable';

export type InputNumberValue = number | null;

export type InputNumberProps = InputTextableProps<InputNumberValue>;

export type InputNumberEmits = InputTextableEmits<InputNumberValue>;

export type InputNumberSlots = Omit<InputTextableSlots<InputNumberValue>, 'default'>;

export type InputNumberExpose = InputTextableExpose;

export const inputNumberDefaultProps = inputTextableDefaultProps satisfies InferDefaults<InputNumberProps>;
