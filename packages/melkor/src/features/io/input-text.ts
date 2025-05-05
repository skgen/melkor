import type { InputTextableEmits, InputTextableProps, InputTextableSlots } from '..';

export type InputTextValue = string | null;

export type InputTextProps = InputTextableProps<InputTextValue>;

export type InputTextEmits = InputTextableEmits<InputTextValue>;

export type InputTextSlots = Omit<InputTextableSlots<InputTextValue>, 'default'>;
