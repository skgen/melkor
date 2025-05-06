import type { DirectiveBinding } from 'vue';

import { isString } from '@skgn/kit';

import { setElementTheme } from '../features/theme';

function directive(el: HTMLElement, binding: DirectiveBinding): void {
  const { value } = binding.value;

  if (isString(value)) {
    setElementTheme(el, value);
  }
  // else {
  //   const { value, hijack } = binding.value;
  //   setElementTheme(el, value, hijack);
  // }
}

export const vTheme = [
  'theme',
  {
    // beforeMount: directive,
    mounted: directive,
    updated: directive,
  },
] as const;
