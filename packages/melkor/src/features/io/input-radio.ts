import type { Flatten } from '@skgn/kit';

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
  option?: (props: {
    index: number;
    option: Flatten<InputRadioProps<TValue>['options']>;
  }) => any;
};

export type InputRadioExpose = InputExpose;

export const inputRadioDefaultProps: InferDefaults<InputRadioProps<any>> = {
  ...inputDefaultProps,
  direction: 'vertical',
};
