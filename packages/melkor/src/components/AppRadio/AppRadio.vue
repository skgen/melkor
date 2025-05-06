<template>
  <div
    v-theme="theme"
    class="mk-AppRadio"
    v-bind="bindInteractionStateProps(props)"
    :data-is-checked="props.checked || undefined"
  />
</template>

<script lang="ts" setup>
import type { CheckableProps } from '../../features/checkable';

import { useTheme } from '../../composables/useTheme';
import { bindInteractionStateProps } from '../../features/interactions';

export type Props = CheckableProps;

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppRadio {
  --mk-radio-background-color: var(--mk-input-background-color);
  --mk-radio-background-color-hover: var(--mk-input-background-color-hover);
  --mk-radio-border-color: var(--mk-input-border-color);
  --mk-radio-border-color-hover: var(--mk-input-border-color-hover);
  --mk-radio-border-color-active: var(--mk-input-border-color-active);
  --mk-radio-border-size: var(--mk-input-border-size);
  --mk-radio-border-size-hover: var(--mk-input-border-size-hover);
  --mk-radio-border-size-active: var(--mk-input-border-size-active);
  --mk-radio-size: 16px;
  --mk-radio-transition-duration: var(--mk-transition-2-duration);

  position: relative;
  display: block;
  width: var(--mk-radio-size);
  height: var(--mk-radio-size);
  overflow: hidden;
  background-color: var(--mk-radio-background-color);
  border-radius: 50%;
  transition:
    background-color var(--mk-radio-transition-duration),
    box-shadow var(--mk-radio-transition-duration),
    opacity var(--mk-radio-transition-duration);
  transition-delay: 0ms;

  &::before {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: transparent;
    border-radius: 50%;
    box-shadow: inset 0 0 0.01px var(--mk-radio-border-size) var(--mk-radio-border-color);
    transition:
      background-color var(--mk-radio-transition-duration),
      transform var(--mk-radio-transition-duration),
      box-shadow var(--mk-radio-transition-duration);
    transition-delay: calc(var(--mk-radio-transition-duration) / 2);
  }

  &[data-is-checked='true'] {
    box-shadow: inset 0 0 0.01px var(--mk-radio-border-size-active) var(--mk-radio-border-color-active);
    transition-delay: calc(var(--mk-radio-transition-duration) / 2);

    &::before {
      background-color: var(--mk-radio-border-color-active);
      box-shadow: inset 0 0 0.01px 0 var(--mk-radio-border-color-active) !important;
      transition-delay: 0ms;
      transform: scale(0.5);
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      background-color: var(--mk-radio-background-color-hover);

      &::before {
        box-shadow: inset 0 0 0.01px var(--mk-radio-border-size-hover) var(--mk-radio-border-color-hover);
      }
    }
  }

  @include melkor.on-disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
