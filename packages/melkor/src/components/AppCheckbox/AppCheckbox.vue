<template>
  <div
    v-theme="theme"
    class="mk-AppCheckbox"
    :data-is-checked="props.checked || undefined"
    :data-is-disabled="props.disabled || undefined"
  >
    <span class="mk-AppCheckbox-icon">
      <slot>
        <AppIcon :icon="globalConfig.icons.AppCheckbox.checked" />
      </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalConfig, useTheme } from '../../composables';
import AppIcon from '../AppIcon/AppIcon.vue';

interface Props {
  checked?: boolean;
  disabled?: boolean;
}

const props = defineProps<Props>();

const theme = useTheme();
const globalConfig = useGlobalConfig();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppCheckbox {
  --mk-checkbox-background-color: var(--mk-input-background-color);
  --mk-checkbox-background-color-hover: var(--mk-input-background-color-hover);
  --mk-checkbox-border-color: var(--mk-input-border-color);
  --mk-checkbox-border-color-hover: var(--mk-input-border-color-hover);
  --mk-checkbox-border-color-active: var(--mk-primary);
  --mk-checkbox-border-radius-size: var(--mk-input-border-radius-size);
  --mk-checkbox-border-size: var(--mk-input-border-size);
  --mk-checkbox-border-size-hover: var(--mk-input-border-size-hover);
  --mk-checkbox-border-size-active: calc(var(--mk-checkbox-size) / 2);
  --mk-checkbox-icon-color: var(--mk-on-primary);
  --mk-checkbox-icon-size: 14px;
  --mk-checkbox-size: 16px;

  $this: &;

  position: relative;
  display: block;
  width: var(--mk-checkbox-size);
  height: var(--mk-checkbox-size);
  overflow: hidden;
  user-select: none;
  background-color: var(--mk-checkbox-background-color);
  border-radius: var(--mk-checkbox-border-radius-size);
  box-shadow: inset 0 0 0.01px var(--mk-checkbox-border-size) var(--mk-checkbox-border-color);
  transition:
    background-color var(--mk-transition-color-duration),
    box-shadow var(--mk-transition-color-duration),
    opacity var(--mk-transition-opacity-duration);
  transition-delay: calc(var(--mk-transition-opacity-duration) / 2);

  &::before {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--mk-checkbox-border-color);
    border-radius: var(--mk-checkbox-border-radius-size);
    opacity: 0;
    transition:
      opacity var(--mk-transition-opacity-duration),
      transform var(--mk-transition-transform-duration),
      background-color var(--mk-transition-color-duration);
    transition-delay: calc(var(--mk-transition-opacity-duration) / 2);
    transform: scale(0);
  }

  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--mk-checkbox-size);
    height: var(--mk-checkbox-size);
    opacity: 0;
    transition:
      opacity var(--mk-transition-opacity-duration),
      transform var(--mk-transition-transform-duration);
    transform: translate(-50%, -50%) scale(0.8);
  }

  .mk-AppIcon {
    position: relative;

    --mk-icon-size: var(--mk-checkbox-icon-size);
    --mk-icon-color: var(--mk-checkbox-icon-color);
  }

  &[data-is-checked='true'] {
    box-shadow: inset 0 0 0.01px var(--mk-checkbox-border-size-active) var(--mk-checkbox-border-color-active) !important;
    transition-delay: 0ms;

    &::before {
      background-color: var(--mk-checkbox-border-color-active);
      opacity: 1;
      transition-delay: 0ms;
      transform: scale(1);
    }

    #{$this} {
      &-icon {
        opacity: 1;
        transition-delay: calc(var(--mk-transition-opacity-duration) / 2);
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  @include melkor.not-disabled {
    &:hover {
      background-color: var(--mk-checkbox-background-color-hover);
      box-shadow: inset 0 0 0.01px var(--mk-checkbox-border-size-hover) var(--mk-checkbox-border-color-hover);
    }
  }

  @include melkor.disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
