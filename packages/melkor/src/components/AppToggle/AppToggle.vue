<template>
  <div
    v-theme="theme"
    class="mk-AppToggle"
    v-bind="bindInteractionStateProps(props)"
    :data-is-checked="props.checked || undefined"
  />
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';
import { bindInteractionStateProps, type CheckableProps } from '../../features';

export type Props = CheckableProps;

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppToggle {
  --mk-toggle-background-color: var(--mk-input-background-color);
  --mk-toggle-background-color-hover: transparent;
  --mk-toggle-border-color: var(--mk-input-border-color);
  --mk-toggle-border-color-hover: var(--mk-input-border-color-hover);
  --mk-toggle-border-color-active: var(--mk-input-border-color-active);
  --mk-toggle-border-size: var(--mk-input-border-size);
  --mk-toggle-border-size-hover: var(--mk-input-border-size-hover);
  --mk-toggle-border-size-active: var(--mk-input-border-size-active);
  --mk-toggle-padding-size: 2px;
  --mk-toggle-target-size: 16px;
  --mk-toggle-target-scale-hover: 90%;
  --mk-toggle-target-scale-active: 85%;
  --mk-toggle-target-color: var(--mk-border-color);
  --mk-toggle-target-color-active: var(--mk-on-primary);
  --mk-toggle-target-padding-size: calc(var(--mk-toggle-padding-size) / 2);
  --mk-toggle-transition-duration: var(--mk-transition-2-duration);

  $this: &;

  position: relative;
  display: block;
  width: calc(var(--mk-toggle-target-size) * 2 + var(--mk-toggle-padding-size) * 2 + var(--mk-toggle-border-size) * 2);
  padding: calc(var(--mk-toggle-padding-size) + var(--mk-toggle-border-size));
  background-color: var(--mk-toggle-background-color);
  border-radius: var(--mk-toggle-target-size);
  box-shadow: inset 0 0 0.01px var(--mk-toggle-border-size) var(--mk-toggle-border-color);
  transition:
    box-shadow var(--mk-toggle-transition-duration),
    background-color var(--mk-toggle-transition-duration);

  &::before {
    position: relative;
    display: block;
    width: var(--mk-toggle-target-size);
    height: var(--mk-toggle-target-size);
    content: '';
    user-select: none;
    background-color: var(--mk-toggle-target-color);
    border-radius: 50%;
    transition:
      background-color var(--mk-toggle-transition-duration),
      transform var(--mk-toggle-transition-duration);
  }

  &[data-is-checked='true'] {
    box-shadow: inset 0 0 0.01px var(--mk-toggle-border-size-active) var(--mk-toggle-border-color-active) !important;

    &::before {
      background-color: var(--mk-toggle-border-color-active) !important;
      transform: translate(100%, 0) scale(var(--mk-toggle-target-scale-active)) !important;
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      background-color: var(--mk-toggle-background-color-hover);
      box-shadow: inset 0 0 0.01px var(--mk-toggle-border-size-hover) var(--mk-toggle-border-color-hover);

      &::before {
        background-color: var(--mk-toggle-border-color-hover);
        transform: scale(var(--mk-toggle-target-scale-hover));
      }
    }
  }

  @include melkor.on-disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
