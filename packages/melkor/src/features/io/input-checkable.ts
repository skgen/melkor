import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputCheckableProps<TValue = boolean> = InputProps<TValue> & {
  checked?: TValue;
  unchecked?: TValue;
  direction?: 'horizontal' | 'vertical';
};

export type InputCheckableEmits<TValue = boolean> = InputEmits<TValue>;

export type InputCheckableSlots<TValue = boolean> = InputSlots & {
  'default'?: (props: {
    ref: string;
    hovered: boolean;
    validate: InputCheckableProps<TValue>['validate'];
    inputName: InputCheckableProps<TValue>['name'];
    disabled: InputCheckableProps<TValue>['disabled'];
    value: InputCheckableProps<TValue>['value'];
    checked: boolean;
    focused: boolean;
    onChange: (event: Event) => void;
    onFocus: () => void;
    onBlur: () => void;
  }) => any;
  'checked-label'?: () => any;
  'unchecked-label'?: () => any;
};

export type InputCheckableExpose = InputExpose;

export const inputCheckableDefaultProps: InferDefaults<InputCheckableProps<any>> = {
  ...inputDefaultProps,
  direction: 'vertical',
};
