import type { Slot } from 'vue';

import type { InferDefaults } from '../utils';

import { inputDefaultProps, type InputEmits, type InputExpose, type InputProps, type InputSlots } from './input';

export type InputTextableProps<InputTextableValue> = InputProps<InputTextableValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
  secure?: boolean;
};

export type InputTextableEmits<InputTextableValue> = InputEmits<InputTextableValue>;

export type InputTextableSlots<InputTextableValue> = InputSlots & {
  'default'?: Slot<{
    ref: string;
    inputName: InputTextableProps<InputTextableValue>['name'];
    disabled: InputTextableProps<InputTextableValue>['disabled'];
    placeholder: InputTextableProps<InputTextableValue>['placeholder'];
    value: InputTextableProps<InputTextableValue>['value'];
    type: 'password' | null;
    onChange: (event: Event, newValue: InputTextableValue) => void;
    onFocus: () => void;
    onBlur: () => void;
  }>;
  'leading-icon'?: Slot;
  'trailing-icon'?: Slot;
  'cancel-icon'?: Slot;
};

export type InputTextableExpose = InputExpose;

export const inputTextableDefaultProps: InferDefaults<InputTextableProps<any>> = inputDefaultProps;
