import type { InputModel, InputTextableEmits, InputTextableOptions, InputTextableProps } from '..';

export type InputNumberValue = number | null;

export type InputNumberProps = InputTextableProps<InputNumberValue> & InputNumberOptions;

export type InputNumberEmits = InputTextableEmits<InputNumberValue>;

export type InputNumberModel = InputModel<InputNumberValue>;

export type InputNumberOptions = InputTextableOptions<InputNumberValue> & {
};
