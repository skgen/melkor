import type { InferDefaults } from 'src/features/utils';

import { isArray, isFunction, isUndefined } from 'lodash-es';

import { inputNumberDefaultProps, inputRadioDefaultProps, inputSelectDefaultProps, inputSelectNativeDefaultProps, inputTextareaDefaultProps, inputTextDefaultProps, inputToggleDefaultProps } from '../../../src/features';

const inputs: Record<string, InferDefaults<unknown>> = {
  AppInputNumber: inputNumberDefaultProps,
  AppInputRadio: inputRadioDefaultProps,
  InputSelect: inputSelectDefaultProps,
  InputSelectNative: inputSelectNativeDefaultProps,
  AppInputText: inputTextDefaultProps,
  AppInputTextarea: inputTextareaDefaultProps,
  AppInputToggle: inputToggleDefaultProps,
};

export function resolveDefaultProp(componentName: string, propName: string) {
  const defaultProps = inputs[componentName] ?? null;
  if (!defaultProps) {
    return undefined;
  }

  // @ts-expect-error Dynamic default prop inference
  const defaultProp = defaultProps[propName];

  if (isUndefined(defaultProp)) {
    return undefined;
  }
  if (isFunction(defaultProp)) {
    const defaultValue = defaultProp();
    if (isArray(defaultValue)) {
      return `[${defaultValue.join(', ')}]`;
    }
    return defaultValue;
  }
  return `${defaultProp}`;
}
