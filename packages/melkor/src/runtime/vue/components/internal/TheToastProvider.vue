<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="rekaProviderProps">
    <slot />
    <ToastPortal :to="`#${floatingLayerId}`">
      <ToastViewport
        as-child
      >
        <ol
          ref="rootRef"
          class="mk-TheToastProvider"
          :data-position="config.toast.position"
          :style="{
            '--virtual-height': height,
          }"
        >
          <Toast
            v-for="(toast, i) of collection"
            ref="collectionRefs"
            :key="toast.id"
            class="mk-TheToastProvider-toast"
            v-bind="toast.props"
            :style="{
              '--offset': getOffset(i),
              '--translate-direction': config.toast.position.includes('top') ? '1px' : '-1px',
              '--offset-y': 'calc(var(--offset) * var(--translate-direction))',
            }"
            @update:open="() => remove(toast.id)"
          >
            <template v-if="toast.slots.default" #default>
              <component :is="toast.slots.default" />
            </template>
            <template v-if="toast.slots.leading" #leading>
              <component :is="toast.slots.leading" />
            </template>
            <template v-if="toast.slots.title" #title>
              <component :is="toast.slots.title" />
            </template>
            <template v-if="toast.slots.description" #description>
              <component :is="toast.slots.description" />
            </template>
            <template v-if="toast.slots.actions" #actions>
              <component :is="node" v-for="(node, j) in toast.slots.actions()" :key="j" />
            </template>
          </Toast>
        </ol>
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>

<script lang="ts" setup>
import type { ToastContext, ToastSwipeDirection } from '../../features';
import type { ToastExpose, ToastProps, ToastSlots } from '../Toast.vue';

import { reactivePick, useCssVar } from '@vueuse/core';
import { ToastPortal, ToastProvider, ToastViewport, useForwardProps } from 'reka-ui';
import { computed, markRaw, provide, ref } from 'vue';

import { useGlobalConfig } from '../../composables';
import { durationToNumber, floatingLayerId, globalToastContextKey, normalizeSlot, remToPixels } from '../../features';
import Toast from '../Toast.vue';

const config = useGlobalConfig();

const rootRef = ref<HTMLOListElement | null>(null);
const collectionRefs = ref<ToastExpose[]>([]);

function idFactory() {
  let id = -1;
  return () => {
    id += 1;
    return id.toString();
  };
}

const getId = idFactory();

const collection = ref<{
  id: string;
  props: ToastProps;
  slots: ToastSlots;
}[]>([]);

const swipeDirection = computed<ToastSwipeDirection>(() => {
  switch (config.toast.position) {
    case 'top-center':
      return 'up';
    case 'bottom-center':
      return 'down';
    case 'top-left':
    case 'center-left':
    case 'bottom-left':
      return 'left';
    default:
      return 'right';
  }
});

const rekaProviderProps = useForwardProps(reactivePick(config.toast, 'duration', 'swipeThreshold'));

// Layout

const collectionGapSize = useCssVar('--mk-toast-provider-collection-gap-size', rootRef);
const toastAnimationDuration = useCssVar('--mk-toast-provider-toast-animation-duration', rootRef);

const layoutConfig = computed(() => ({
  collectionGapSize: collectionGapSize.value ? remToPixels(collectionGapSize.value) : 0,
  toastAnimationDuration: toastAnimationDuration.value ? durationToNumber(toastAnimationDuration.value) : 0,
}));

function getOffset(index: number) {
  const offset = collectionRefs.value
    .slice(index + 1)
    .reduce((acc, { height }) => acc + height + layoutConfig.value.collectionGapSize, 0);
  return offset;
}

const height = computed(() => collectionRefs.value.reduce((acc, { height }) => acc + height, 0) + layoutConfig.value.collectionGapSize * (collectionRefs.value.length - 1));

// In / Out

const create: ToastContext['create'] = async (toast) => {
  if (collection.value.length >= config.toast.limit) {
    const id = collection.value[0]?.id;
    if (id) {
      await remove(id);
    }
  }
  const slots = toast.slots
    ? Object.entries(toast.slots).reduce((acc, [key, v]) => {
        acc[key as keyof ToastSlots] = normalizeSlot(v);
        return acc;
      }, {} as ToastSlots)
    : {};

  const _toast = {
    id: getId(),
    props: toast.props ?? {},
    slots: markRaw(slots),
  };

  collection.value = [...collection.value, _toast];

  return _toast;
};

async function remove(id: string) {
  return new Promise<void>((resolve) => {
    const index = collection.value.findIndex(toast => toast.id === id);
    if (index !== -1 && collection.value[index]) {
      collection.value[index].props.open = false;
    }

    setTimeout(() => {
      collection.value = collection.value.filter(toast => toast.id !== id);
      resolve();
    }, layoutConfig.value.toastAnimationDuration);
  });
}

provide(globalToastContextKey, {
  create,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-TheToastProvider {
  --mk-toast-provider-width-size: calc(var(--mk-size-1) * 100);
  --mk-toast-provider-offset-x-size: var(--mk-size-2);
  --mk-toast-provider-offset-y-size: var(--mk-size-2);
  --mk-toast-provider-collection-gap-size: var(--mk-size-2);
  --mk-toast-provider-toast-animation-duration: var(--mk-transition-transform-duration);
  --mk-toast-provider-toast-animation-from-offset-size: 100%;
  --mk-toast-provider-toast-animation-to-offset-size: 100%;
  --mk-toast-provider-toast-animation-from-opacity: 0;
  --mk-toast-provider-toast-animation-to-opacity: 0;

  $this: &;

  position: fixed;
  z-index: var(--mk-floating-layer-z-index);
  width: var(--mk-toast-provider-width-size);
  max-width: calc(100% - var(--mk-toast-provider-offset-x-size) * 2);
  height: calc(var(--virtual-height) * 1px);
  padding: 0;
  margin: 0;
  transition: height var(--mk-toast-provider-toast-animation-duration);
  will-change: height;

  &[data-position^='top'] {
    top: var(--mk-toast-provider-offset-y-size);

    #{$this} {
      &-toast {
        top: 0;
      }
    }
  }

  &[data-position^='bottom'] {
    bottom: var(--mk-toast-provider-offset-y-size);

    #{$this} {
      &-toast {
        bottom: 0;
      }
    }
  }

  &[data-position^='center'] {
    top: 50%;
    transform: translateY(-50%);

    #{$this} {
      &-toast {
        bottom: 0;
      }
    }
  }

  &[data-position$='left'] {
    left: var(--mk-toast-provider-offset-x-size);
  }

  &[data-position$='center'] {
    left: 50%;
    transform: translateX(-50%);
  }

  &[data-position$='right'] {
    right: var(--mk-toast-provider-offset-x-size);
  }

  &-toast {
    position: absolute;
    width: 100%;
    transition: transform var(--mk-toast-provider-toast-animation-duration);
    transform: translate(var(--translate-x), var(--translate-y));

    --translate-x: 0;
    --translate-y: var(--offset-y);

    &[data-state='open'] {
      &[data-position^='top'] {
        animation: slide-from-up var(--mk-toast-provider-toast-animation-duration);
      }

      &[data-position^='bottom'],
      &[data-position^='center'] {
        animation: slide-from-down var(--mk-toast-provider-toast-animation-duration);
      }

      @keyframes slide-from-up {
        from {
          opacity: var(--mk-toast-provider-toast-animation-from-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--translate-y) - var(--mk-toast-provider-toast-animation-from-offset-size))
          );
        }

        to {
          opacity: 1;
          transform: translate(var(--translate-x), var(--translate-y));
        }
      }

      @keyframes slide-from-down {
        from {
          opacity: var(--mk-toast-provider-toast-animation-from-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--translate-y) + var(--mk-toast-provider-toast-animation-from-offset-size))
          );
        }

        to {
          opacity: 1;
          transform: translate(var(--translate-x), var(--translate-y));
        }
      }
    }

    &[data-state='closed'] {
      &[data-position^='top'] {
        animation: slide-to-up var(--mk-toast-provider-toast-animation-duration);
      }

      &[data-position^='bottom'],
      &[data-position^='center'] {
        animation: slide-to-down var(--mk-toast-provider-toast-animation-duration);
      }

      @keyframes slide-to-up {
        from {
          transform: translate(var(--translate-x), calc(var(--offset-y)));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--offset-y) - var(--mk-toast-provider-toast-animation-to-offset-size))
          );
        }
      }

      @keyframes slide-to-down {
        from {
          transform: translate(var(--translate-x), var(--offset-y));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--offset-y) + var(--mk-toast-provider-toast-animation-to-offset-size))
          );
        }
      }
    }

    &[data-swipe='move'] {
      transition: none;

      --translate-x: var(--reka-toast-swipe-move-x);
      --translate-y: calc(var(--offset-y) + var(--reka-toast-swipe-move-y));
    }

    &[data-swipe='end'] {
      &[data-swipe-direction='up'] {
        animation: swipe-to-up var(--mk-toast-provider-toast-animation-duration);
      }

      &[data-swipe-direction='right'] {
        animation: swipe-to-right var(--mk-toast-provider-toast-animation-duration);
      }

      &[data-swipe-direction='down'] {
        animation: swipe-to-down var(--mk-toast-provider-toast-animation-duration);
      }

      &[data-swipe-direction='left'] {
        animation: swipe-to-left var(--mk-toast-provider-toast-animation-duration);
      }

      @keyframes swipe-to-up {
        from {
          transform: translate(var(--translate-x), calc(var(--offset-y) + var(--reka-toast-swipe-end-y)));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--offset-y) - var(--mk-toast-provider-toast-animation-to-offset-size))
          );
        }
      }

      @keyframes swipe-to-right {
        from {
          transform: translate(var(--reka-toast-swipe-end-x), var(--translate-y));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(var(--mk-toast-provider-toast-animation-to-offset-size), var(--translate-y));
        }
      }

      @keyframes swipe-to-down {
        from {
          transform: translate(var(--translate-x), calc(var(--offset-y) + var(--reka-toast-swipe-end-y)));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(
            var(--translate-x),
            calc(var(--offset-y) + var(--mk-toast-provider-toast-animation-to-offset-size))
          );
        }
      }

      @keyframes swipe-to-left {
        from {
          transform: translate(var(--reka-toast-swipe-end-x), var(--translate-y));
        }

        to {
          opacity: var(--mk-toast-provider-toast-animation-to-opacity);
          transform: translate(calc(var(--mk-toast-provider-toast-animation-to-offset-size) * -1), var(--translate-y));
        }
      }
    }
  }
}
</style>
