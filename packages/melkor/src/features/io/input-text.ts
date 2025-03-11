import type { InputModel, InputTextableEmits, InputTextableOptions, InputTextableProps } from '..';

export type InputTextValue = string | null;

export type InputTextProps = InputTextableProps<InputTextValue> & InputTextOptions;

export type InputTextEmits = InputTextableEmits<InputTextValue>;

export type InputTextModel = InputModel<InputTextValue>;

export type InputTextOptions = InputTextableOptions<InputTextValue> & {
};
