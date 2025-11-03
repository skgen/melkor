import type { InjectionKey } from 'vue';

import type { ToastProps, ToastSlots } from '../components';
import type { KeysAs, MaybeSlot } from '../features';

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

export const globalToastContextKey = Symbol('melkor.global-toast-context') as InjectionKey<ToastContext>;
