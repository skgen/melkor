import type { InputCheckableEmits, InputCheckableProps, InputCheckableSlots } from '..';

export type InputToggleProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputToggleEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputToggleSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'>;
