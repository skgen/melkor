import type { Flatten } from '@skgn/kit';

import type { InputEmits, InputProps, InputSlots } from '..';

export type InputSelectNativeProps<TValue> = InputProps<TValue> & {
  fill?: boolean;
  options: {
    value: TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectNativeEmits<TValue> = InputEmits<TValue>;

export type InputSelectNativeSlots<TValue> = InputSlots & {
  option: (props: {
    index: number;
    option: Flatten<InputSelectNativeProps<TValue>['options']>;
  }) => any;
};
