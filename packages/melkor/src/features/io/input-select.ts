import type { Flatten } from '../utils';
import type { InputEmits, InputProps, InputSlots } from './input';

export type InputSelectProps<TValue> = InputProps<TValue> & {
  fill?: boolean;
  options: {
    value: TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectEmits<TValue> = InputEmits<TValue>;

export type InputSelectSlots<TValue> = InputSlots & {
  option: (props: {
    index: number;
    option: Flatten<InputSelectProps<TValue>['options']>;
  }) => any;
};
