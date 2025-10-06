<template>
  <ToastRoot
    v-slot="{ remaining, duration }"
    v-bind="rekaProps"
    as-child
  >
    <li
      ref="rootRef"
      v-theme="theme"
      class="mk-Toast"
      :data-direction="props.direction"
      :data-position="config.toast.position"
    >
      <div class="mk-Toast-wrapper">
        <div v-if="slots.leading" class="mk-Toast-leading">
          <slot name="leading" />
        </div>

        <div class="mk-Toast-content">
          <ToastTitle v-if="slots.title" class="mk-Toast-content-title">
            <slot name="title" />
          </ToastTitle>
          <ToastDescription v-if="slots.description" class="mk-Toast-content-description">
            <slot name="description" />
          </ToastDescription>
          <div v-if="actions" class="mk-Toast-content-actions">
            <template v-for="(node, i) in actions" :key="i">
              <ToastAction alt-text="action" as-child @click.stop>
                <component :is="node" />
              </ToastAction>
            </template>
          </div>
          <slot />
        </div>

        <ToastClose class="mk-Toast-close" as-child @click.stop>
          <AppButton icon size="compact" variant="outline">
            <AppIcon :icon="globalConfig.icons.Toast.close" />
          </AppButton>
        </ToastClose>
      </div>
      <AppProgress
        :model-value="remaining"
        :max="duration"
        :direction="props.direction"
      />
    </li>
  </ToastRoot>
</template>

<script lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'reka-ui';
import type { Ref, Slot } from 'vue';

import type { InferDefaults } from '../features/utils';

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

export const toastDefaultProps = {
  duration: 3000,
  direction: 'horizontal',
  open: true,
} satisfies InferDefaults<ToastProps>;
</script>

<script lang="ts" setup>
import { reactivePick, useElementSize } from '@vueuse/core';
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui';
import { computed, ref } from 'vue';

import { useGlobalConfig, useTheme } from '../composables';
import AppButton from './Button.vue';
import AppIcon from './Icon.vue';
import AppProgress from './Progress.vue';

const props = withDefaults(
  defineProps<ToastProps>(),
  toastDefaultProps,
);

const emits = defineEmits<ToastEmits>();

const slots = defineSlots<ToastSlots>();

const config = useGlobalConfig();

const rekaProps = useForwardPropsEmits(reactivePick(props, 'duration', 'type', 'open'), emits);

const theme = useTheme();
const globalConfig = useGlobalConfig();

const actions = computed(() => {
  if (!slots.actions) {
    return null;
  }
  return slots.actions().map((node) => {
    if (node.type.toString() === 'Symbol(v-fgt)') {
      return node.children;
    }
    return node;
  }).flat();
});

const rootRef = ref<HTMLLIElement | null>(null);
const size = useElementSize(rootRef, { height: 0, width: 0 }, {
  box: 'border-box',
});

defineExpose<ToastExpose>({
  height: size.height,
});
</script>

<style lang="scss">
@use '../styles/mixins' as melkor;

.mk-Toast {
  --mk-toast-background-color: var(--mk-core-background-color);
  --mk-toast-border-color: var(--mk-border-color);
  --mk-toast-border-size: var(--mk-border-size);
  --mk-toast-border-radius-size: var(--mk-border-radius-size);
  --mk-toast-padding-size: var(--mk-size-4);
  --mk-toast-leading-icon-size: 20px;
  --mk-toast-close-icon-size: 20px;

  $this: &;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  list-style: none;
  background-color: var(--mk-toast-background-color);
  border: var(--mk-toast-border-size) solid var(--mk-toast-border-color);
  border-radius: var(--mk-toast-border-radius-size);

  &-wrapper {
    display: flex;
    gap: var(--mk-size-4);
    align-items: flex-start;
    padding: var(--mk-toast-padding-size);
  }

  &-content {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    gap: var(--mk-size-2);

    &-description {
      color: var(--mk-text-soft-color);
    }

    &-actions {
      display: flex;
      gap: var(--mk-size-2);
      align-items: center;
    }
  }

  &-leading {
    .mk-Icon {
      --mk-icon-size: var(--mk-toast-leading-icon-size);
      --mk-icon-color: var(--mk-primary);
    }
  }

  &-close {
    .mk-Icon {
      --mk-icon-size: var(--mk-toast-close-icon-size);
    }
  }

  .mk-Progress {
    --mk-progress-border-radius-size: 0;
    --mk-progress-transition-duration: 0;
    --mk-progress-size: var(--mk-size-1);
  }

  &[data-direction='vertical'] {
    flex-direction: row-reverse;

    #{$this} {
      &-wrapper {
        flex: 1 1 100%;
      }
    }
  }
}
</style>
