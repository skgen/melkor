import type { Flatten } from '@skgn/kit';
import type { Slot } from 'vue';

import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputRadioProps<TValue = boolean> = InputProps<TValue> & {
  direction?: 'horizontal' | 'vertical';
  options: {
    disabled?: boolean;
    value: TValue;
  }[];
  nullable?: boolean;
};

export type InputRadioEmits<TValue = boolean> = InputEmits<TValue>;

export type InputRadioSlots<TValue = boolean> = InputSlots & {
  option?: Slot<{
    index: number;
    option: Flatten<InputRadioProps<TValue>['options']>;
  }>;
};

export type InputRadioExpose = InputExpose;

export const inputRadioDefaultProps = {
  ...inputDefaultProps,
  direction: 'vertical',
} satisfies InferDefaults<InputRadioProps<any>>;
