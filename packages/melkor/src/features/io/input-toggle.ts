import type { InferDefaults } from '../utils';

import { inputCheckableDefaultProps, type InputCheckableEmits, type InputCheckableExpose, type InputCheckableProps, type InputCheckableSlots } from './input-checkable';

export type InputToggleProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputToggleEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputToggleSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'>;

export type InputToggleExpose = InputCheckableExpose;

export const inputToggleDefaultProps: InferDefaults<InputToggleProps<any>> = inputCheckableDefaultProps;
