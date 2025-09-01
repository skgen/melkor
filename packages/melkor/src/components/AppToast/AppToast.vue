<template>
  <ToastRoot
    v-slot="{ remaining, duration }"
    v-bind="rekaProps"
    as-child
  >
    <li
      ref="rootRef"
      v-theme="theme"
      class="mk-AppToast"
      :data-direction="props.direction"
      :data-position="config.toast.position"
    >
      <div class="mk-AppToast-wrapper">
        <div v-if="slots.leading" class="mk-AppToast-leading">
          <slot name="leading" />
        </div>

        <div class="mk-AppToast-content">
          <ToastTitle v-if="slots.title" class="mk-AppToast-content-title">
            <slot name="title" />
          </ToastTitle>
          <ToastDescription v-if="slots.description" class="mk-AppToast-content-description">
            <slot name="description" />
          </ToastDescription>
          <div v-if="actions" class="mk-AppToast-content-actions">
            <template v-for="(node, i) in actions" :key="i">
              <ToastAction alt-text="action" as-child @click.stop>
                <component :is="node" />
              </ToastAction>
            </template>
          </div>
          <slot />
        </div>

        <ToastClose class="mk-AppToast-close" as-child @click.stop>
          <AppButton icon size="compact" variant="outline">
            <AppIcon :icon="globalConfig.icons.AppToast.close" />
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

<script lang="ts" setup>
import { reactivePick, useElementSize } from '@vueuse/core';
import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, useForwardPropsEmits } from 'reka-ui';
import { computed, ref } from 'vue';

import { useGlobalConfig, useTheme } from '../../composables';
import { toastDefaultProps, type ToastEmits, type ToastExpose, type ToastProps, type ToastSlots } from '../../features/toast';
import AppButton from '../AppButton/AppButton.vue';
import AppIcon from '../AppIcon/AppIcon.vue';
import AppProgress from '../AppProgress/AppProgress.vue';

export type Props = ToastProps;
export type Emits = ToastEmits;
export type Slots = ToastSlots;
export type Expose = ToastExpose;

const props = withDefaults(defineProps<Props>(), toastDefaultProps);

const emits = defineEmits<Emits>();

const slots = defineSlots<Slots>();

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

defineExpose<Expose>({
  height: size.height,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppToast {
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
    .mk-AppIcon {
      --mk-icon-size: var(--mk-toast-leading-icon-size);
      --mk-icon-color: var(--mk-primary);
    }
  }

  &-close {
    .mk-AppIcon {
      --mk-icon-size: var(--mk-toast-close-icon-size);
    }
  }

  .mk-AppProgress {
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
