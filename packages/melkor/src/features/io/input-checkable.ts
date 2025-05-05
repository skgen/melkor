import type { InputEmits, InputProps, InputSlots } from '..';

export type InputCheckableProps<TValue = boolean> = InputProps<TValue> & {
  checked?: TValue;
  unchecked?: TValue;
  direction?: 'horizontal' | 'vertical';
};

export type InputCheckableEmits<TValue = boolean> = InputEmits<TValue>;

export type InputCheckableSlots<TValue = boolean> = InputSlots & {
  'default': (props: {
    inputRef: string;
    hovered: boolean;
    validate: InputCheckableProps<TValue>['validate'];
    inputName: InputCheckableProps<TValue>['name'];
    disabled: InputCheckableProps<TValue>['disabled'];
    value: InputCheckableProps<TValue>['value'];
    checked: boolean;
    onChange: (event: Event) => void;
    onFocus: () => void;
    onBlur: () => void;
  }) => any;
  'checked-label': () => any;
  'unchecked-label': () => any;
};
