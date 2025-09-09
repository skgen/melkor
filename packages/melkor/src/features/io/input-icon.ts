import type { Slot } from 'vue';

import type { IconCollectionName } from '../icons';
import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputIconValue = string | null;

export type InputIconProps = InputProps<InputIconValue> & {
  placeholder?: string;
  cancelable?: boolean;
  collection?: IconCollectionName;
  pageSize?: number;
  columnSize?: number;
};

export type InputIconEmits = InputEmits<InputIconValue>;

export type InputIconSlots = InputSlots & {
  placeholder?: Slot;
};

export type InputIconExpose = InputExpose;

export const inputIconDefaultProps: InferDefaults<InputIconProps> = {
  ...inputDefaultProps,
  collection: 'material-symbols',
  pageSize: 100,
  columnSize: 6,
};
