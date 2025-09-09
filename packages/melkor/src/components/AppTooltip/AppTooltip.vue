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
            class="mk-AppTooltip"
            v-bind="$attrs"
          >
            <slot name="tooltip" />
          </div>
        </TooltipContent>
      </transition>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script lang="ts" setup>
import type { TooltipContentProps, TooltipRootProps } from 'reka-ui';

import type { TooltipEmits, TooltipProps, TooltipSlots } from '../../features/tooltip';

import { reactivePick } from '@vueuse/core';
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useForwardPropsEmits } from 'reka-ui';
import { computed, type Ref } from 'vue';

import { useGlobalConfig, useTheme } from '../../composables';
import { floatingLayerId } from '../../features/layer';

export type Props = TooltipProps;
export type Emits = TooltipEmits;
export type Slots = TooltipSlots;

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const slots = defineSlots<Slots>();

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
.mk-AppTooltip {
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
