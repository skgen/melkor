import type { InputEmits, InputProps, InputSlots } from '..';

export type InputTextableProps<InputTextableValue> = InputProps<InputTextableValue> & {
  fill?: boolean;
  placeholder?: string;
  cancelable?: boolean;
  encrypted?: boolean;
};

export type InputTextableEmits<InputTextableValue> = InputEmits<InputTextableValue>;

export type InputTextableSlots<InputTextableValue> = InputSlots & {
  'default'?: (props: {
    inputRef: string;
    validate: InputTextableProps<InputTextableValue>['validate'];
    inputName: InputTextableProps<InputTextableValue>['name'];
    disabled: InputTextableProps<InputTextableValue>['disabled'];
    placeholder: InputTextableProps<InputTextableValue>['placeholder'];
    value: InputTextableProps<InputTextableValue>['value'];
    type: 'password' | null;
    onChange: (event: Event, newValue: InputTextableValue) => void;
    onFocus: () => void;
    onBlur: () => void;
  }) => any;
  'leading-icon'?: () => any;
  'trailing-icon'?: () => any;
  'cancel-icon'?: () => any;
};
