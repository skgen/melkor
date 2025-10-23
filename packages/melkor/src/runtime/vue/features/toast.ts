import type { InjectionKey } from 'vue';

import type { ToastProps, ToastSlots } from '#melkor/components/Toast.vue';
import type { KeysAs, MaybeSlot } from '#melkor/features';

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
