import type { Flatten } from '@skgn/kit';
import type { Slot } from 'vue';

import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputSelectNativeProps<TValue> = InputProps<TValue> & {
  fill?: boolean;
  options: {
    value: TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectNativeEmits<TValue> = InputEmits<TValue>;

export type InputSelectNativeSlots<TValue> = InputSlots & {
  option?: Slot<{
    index: number;
    option: Flatten<InputSelectNativeProps<TValue>['options']>;
  }>;
};

export type InputSelectNativeExpose = InputExpose;

export const inputSelectNativeDefaultProps = inputDefaultProps satisfies InferDefaults<InputSelectNativeProps<any>>;
