import type { InferDefaults } from '../utils';

import { inputTextableDefaultProps, type InputTextableEmits, type InputTextableExpose, type InputTextableProps, type InputTextableSlots } from './input-textable';

export type InputTextValue = string | null;

export type InputTextProps = InputTextableProps<InputTextValue>;

export type InputTextEmits = InputTextableEmits<InputTextValue>;

export type InputTextSlots = Omit<InputTextableSlots<InputTextValue>, 'default'>;

export type InputTextExpose = InputTextableExpose;

export const inputTextDefaultProps: InferDefaults<InputTextProps> = inputTextableDefaultProps;
