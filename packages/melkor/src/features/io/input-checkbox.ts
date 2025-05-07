import type { InputCheckableEmits, InputCheckableProps, InputCheckableSlots } from '..';

export type InputCheckboxProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputCheckboxEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputCheckboxSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'> & {
  'checked-icon'?: () => any;
};
