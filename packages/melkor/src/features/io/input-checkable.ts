import type { Slot } from 'vue';

import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputCheckableProps<TValue = boolean> = InputProps<TValue> & {
  checked?: TValue;
  unchecked?: TValue;
  direction?: 'horizontal' | 'vertical';
};

export type InputCheckableEmits<TValue = boolean> = InputEmits<TValue>;

// export "type" breaks dts generation, export interface prevents issue
// @todo investigate further
export interface InputCheckableSlots<TValue = boolean> extends InputSlots {
  'default'?: Slot<{
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
  }>;
  'checked-label'?: Slot;
  'unchecked-label'?: Slot;
};

export type InputCheckableExpose = InputExpose;

export const inputCheckableDefaultProps = {
  ...inputDefaultProps,
  direction: 'vertical',
} satisfies InferDefaults<InputCheckableProps<any>>;
