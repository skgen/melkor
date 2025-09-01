import type { ToastRootEmits, ToastRootProps } from 'reka-ui';
import type { InjectionKey, Ref, Slot } from 'vue';

import type { MaybeSlot } from './slots';
import type { InferDefaults, KeysAs } from './utils';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastSwipeDirection = 'up' | 'down' | 'left' | 'right';

export type ToastContext = {
  create: (toast: {
    props?: ToastProps;
    slots?: KeysAs<ToastSlots, MaybeSlot>;
  }) => Promise<{
    props: ToastProps;
    slots: ToastSlots;
  }>;
};

export const globalToastContextKey = Symbol('Inject key of global toast context') as InjectionKey<ToastContext>;

export type ToastProps = Pick<ToastRootProps, 'type' | 'duration' | 'open'> & {
  direction?: 'horizontal' | 'vertical';
};

export type ToastEmits = ToastRootEmits;

export type ToastSlots = {
  default?: Slot;
  leading?: Slot;
  title?: Slot;
  description?: Slot;
  actions?: Slot;
};

export type ToastExpose = {
  height: Ref<number>;
};

export const toastDefaultProps: InferDefaults<ToastProps> = {
  duration: 3000,
  direction: 'horizontal',
  open: true,
};
