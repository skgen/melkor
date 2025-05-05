import type { InputCheckableEmits, InputCheckableSlots, InputProps } from '..';

export type InputRadioProps<TValue = boolean> = InputProps<TValue> & {
  direction?: 'horizontal' | 'vertical';
  options: {
    disabled?: boolean;
    value: TValue;
  }[];
  nullable?: boolean;
};

export type InputRadioEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputRadioSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'>;
