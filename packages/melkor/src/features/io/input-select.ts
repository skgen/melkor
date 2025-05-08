import type { Flatten } from '@skgn/kit';

import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputSelectProps<TValue> = InputProps<TValue> & {
  fill?: boolean;
  cancelable?: boolean;
  options: {
    value: TValue extends (infer V)[] ? V : TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectEmits<TValue> = InputEmits<TValue>;

export type InputSelectSlots<TValue> = InputSlots & {
  'option'?: (props: {
    index: number;
    option: Flatten<InputSelectProps<TValue>['options']>;
  }) => any;
  'empty-options'?: () => any;
  'value'?: (props: {
    value: TValue;
  }) => any;
};

export type InputSelectExpose = InputExpose;

export const inputSelectDefaultProps: InferDefaults<InputSelectProps<any>> = inputDefaultProps;
