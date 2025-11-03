<template>
  <TooltipRoot v-slot="{ open }" v-bind="rekaRootProps" :disabled="disabled">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPortal :to="`#${floatingLayerId}`">
      <transition name="mk-fade">
        <TooltipContent
          v-if="open"
          v-bind="rekaContentProps"
        >
          <div
            v-theme="theme"
            class="mk-Tooltip"
            v-bind="$attrs"
          >
            <slot name="tooltip" />
          </div>
        </TooltipContent>
      </transition>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script lang="ts">
import type { TooltipContentProps, TooltipRootEmits, TooltipRootProps } from 'reka-ui';
import type { Ref, Slot } from 'vue';

export type TooltipProps = Pick<TooltipRootProps, 'open' | 'delayDuration' | 'disableClosingTrigger' | 'disabled' | 'disableHoverableContent' | 'ignoreNonKeyboardFocus'>
  & Pick<TooltipContentProps, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'ariaLabel' | 'avoidCollisions' | 'collisionPadding' | 'hideWhenDetached' | 'positionStrategy' | 'sticky' | 'updatePositionStrategy'>;

export type TooltipEmits = TooltipRootEmits;

export type TooltipSlots = {
  default?: Slot;
  tooltip?: Slot;
};
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core';
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui';
import { computed } from 'vue';

import { useGlobalConfig, useTheme } from '../composables';
import { floatingLayerId } from '../features';

const props = defineProps<TooltipProps>();

const emits = defineEmits<TooltipEmits>();

const slots = defineSlots<TooltipSlots>();

const theme = useTheme();

const config = useGlobalConfig();

const rekaRootProps: Ref<TooltipRootProps> = useForwardPropsEmits(
  reactivePick(props, 'open', 'delayDuration', 'disableClosingTrigger', 'disableHoverableContent', 'ignoreNonKeyboardFocus'),
  emits,
);

const rekaContentProps: Ref<TooltipContentProps> = computed(() => ({
  align: props.align ?? config.tooltip.align,
  alignOffset: props.alignOffset ?? config.tooltip.alignOffset,
  side: props.side ?? config.tooltip.side,
  sideOffset: props.sideOffset ?? config.tooltip.sideOffset,
  avoidCollisions: props.avoidCollisions ?? config.tooltip.avoidCollisions,
  collisionPadding: props.collisionPadding ?? config.tooltip.collisionPadding,
  hideWhenDetached: props.hideWhenDetached ?? config.tooltip.hideWhenDetached,
  positionStrategy: props.positionStrategy ?? config.tooltip.positionStrategy,
  sticky: props.sticky ?? config.tooltip.sticky,
  updatePositionStrategy: props.updatePositionStrategy ?? config.tooltip.updatePositionStrategy,
}));

const disabled = computed(() => props.disabled || !slots.default);
</script>

<style lang="scss">
.mk-Tooltip {
  --mk-tooltip-background-color: var(--mk-core-background-color);
  --mk-tooltip-border-color: var(--mk-border-color);
  --mk-tooltip-border-size: var(--mk-border-size);
  --mk-tooltip-border-radius-size: var(--mk-border-radius-size);
  --mk-tooltip-padding-size: var(--mk-size-1) var(--mk-size-2);

  z-index: var(--mk-floating-layer-z-index);
  display: flex;
  gap: var(--mk-size-1);
  align-items: center;
  padding: var(--mk-tooltip-padding-size);
  font-size: 0.8rem;
  background-color: var(--mk-tooltip-background-color);
  border: var(--mk-tooltip-border-size) solid var(--mk-tooltip-border-color);
  border-radius: var(--mk-tooltip-border-radius-size);
}
</style>
