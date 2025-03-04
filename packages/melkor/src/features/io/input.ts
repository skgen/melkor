// InputComponent

export type InputProps<TValue> = {
  modelValue: InputModel<TValue>;
} & InputOptions<TValue>;

// Input
// Only add properties that change only when value change
export interface InputModel<T> {
  value: T;
  valid: boolean;
  touched: boolean;
  error: string | string[] | null;
}

export interface InputOptions<TValue> {
  validate?: ValidateInputValue<TValue>;
  name?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export type ValidateInputValue<TValue> = (value: TValue) => InputModel<TValue>['error'];

// Based for future forms
// export interface InputModel<TValue, TOptions extends InputOptions<TValue> = InputOptions<TValue>> {
//   state: InputState<TValue>;
//   options?: TOptions;
// }
