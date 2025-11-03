import type { Slot, VNode } from 'vue';

import { isArray, isBoolean, isFunction, isNumber, isString } from 'lodash-es';
import { createTextVNode } from 'vue';

export type MaybeSlot = Slot | VNode | VNode[] | string | number | boolean | null | undefined;

export type UnwrapSlots<T> = {
  [K in keyof T]: NonNullable<T[K]> extends () => infer R ? R | undefined : T[K];
};

export function normalizeSlot(s?: MaybeSlot): Slot | undefined {
  if (!s) {
    return undefined;
  }
  if (isFunction(s)) {
    return s;
  }
  if (isString(s) || isBoolean(s) || isNumber(s)) {
    return () => [createTextVNode(s.toString())];
  }
  if (isArray(s)) {
    return () => s;
  }
  return () => [s];
}
