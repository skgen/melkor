import type { Slot } from 'vue';

import type { InferDefaults } from '../utils';

import { inputCheckableDefaultProps, type InputCheckableEmits, type InputCheckableExpose, type InputCheckableProps, type InputCheckableSlots } from './input-checkable';

export type InputCheckboxProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputCheckboxEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputCheckboxSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'> & {
  'checked-icon'?: Slot;
};

export type InputCheckboxExpose = InputCheckableExpose;

export const inputCheckboxDefaultProps = inputCheckableDefaultProps satisfies InferDefaults<InputCheckboxProps<any>>;
