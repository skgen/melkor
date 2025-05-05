import type { InputTextableEmits, InputTextableProps, InputTextableSlots } from '..';

export type InputNumberValue = number | null;

export type InputNumberProps = InputTextableProps<InputNumberValue>;

export type InputNumberEmits = InputTextableEmits<InputNumberValue>;

export type InputNumberSlots = Omit<InputTextableSlots<InputNumberValue>, 'default'>;
