import { type EmitsToProps, ref, type Ref, type ShortEmitsToObject } from 'vue';

import { inputDefaultProps, type InputEmits, type InputProps } from '#melkor/features';

export function useInputBinding<TProps extends InputProps<any>>(model: TProps): {
  value: Ref<TProps['value']>;
  valid: Ref<TProps['valid']>;
  touched: Ref<TProps['touched']>;
  errors: Ref<TProps['errors']>;
} & Omit<TProps, 'value' | 'valid' | 'touched' | 'errors'>
& Required<Pick<
  EmitsToProps<ShortEmitsToObject<InputEmits<TProps['value']>>>,
  'onUpdate:value' |
  'onUpdate:valid' |
  'onUpdate:touched' |
  'onUpdate:errors'
>> {
  const { value: _value, valid: _valid, touched: _touched, errors: _errors, ...otherProps } = model;
  const value = ref(_value) as Ref<TProps['value']>;
  const valid: Ref<TProps['valid']> = ref(_valid ?? inputDefaultProps.valid);
  const touched: Ref<TProps['touched']> = ref(_touched ?? inputDefaultProps.touched);
  const errors: Ref<TProps['errors']> = ref(_errors ?? inputDefaultProps.errors());

  return {
    ...otherProps,
    value,
    valid,
    touched,
    errors,
    'onUpdate:value': v => value.value = v,
    'onUpdate:valid': v => valid.value = v,
    'onUpdate:touched': v => touched.value = v,
    'onUpdate:errors': v => errors.value = v,
  };
}
