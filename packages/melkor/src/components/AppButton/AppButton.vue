<template>
  <button
    v-theme="theme"
    class="mk-AppButton"
    :data-type="props.type"
    :data-size="props.size"
    :disabled="props.isDisabled || undefined"
    :data-is-active="props.isActive || undefined"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';

export interface Props {
  type?: 'plain' | 'outline' ;
  size?: 'wide' | 'tight';
  isDisabled?: boolean;
  isActive?: boolean;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    type: 'plain',
  },
);

const theme = useTheme();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppButton {
  --mk-button-padding-x-size: var(--mk-size-3);
  --mk-button-padding-y-size: var(--mk-size-2);
  --mk-button-spacing-size: var(--mk-size-2);
  --mk-button-border-radius-size: var(--mk-border-radius-size);
  --mk-button-text-size: 1rem;
  --mk-button-tight-text-size: 0.875rem;
  --mk-button-wide-text-size: 1.125rem;
  --mk-button-text-weight: 400;

  // Outline
  --mk-button-outline-background-color: var(--mk-input-background-color);
  --mk-button-outline-background-color-hover: var(--mk-input-background-color-hover);
  --mk-button-outline-border-color: var(--mk-input-border-color);
  --mk-button-outline-border-color-hover: var(--mk-input-border-color-hover);
  --mk-button-outline-border-color-active: var(--mk-input-border-color-active);
  --mk-button-outline-border-size: var(--mk-input-border-size);
  --mk-button-outline-border-size-hover: var(--mk-input-border-size-hover);
  --mk-button-outline-border-size-active: var(--mk-input-border-size-active);
  --mk-button-outline-text-color: var(--mk-text-color);
  --mk-button-plain-text-color: var(--mk-on-primary);
  --mk-button-plain-background-color: var(--mk-primary);
  --mk-button-plain-background-color-hover: oklch(from var(--mk-primary) calc(l + 0.05) c h);
  --mk-button-plain-background-color-active: oklch(from var(--mk-primary) calc(l - 0.05) c h);

  position: relative;
  box-sizing: content-box;
  padding: var(--mk-button-padding-y-size) var(--mk-button-padding-x-size);
  font-size: var(--mk-button-text-size);
  font-weight: var(--mk-button-text-weight);
  line-height: var(--mk-line-height);
  cursor: pointer;
  border-radius: var(--mk-button-border-radius-size);
  transition:
    background-color var(--mk-transition-color-duration),
    color var(--mk-transition-color-duration),
    box-shadow var(--mk-transition-color-duration),
    opacity var(--mk-transition-opacity-duration);

  .mk-AppIcon {
    --mk-icon-size: 1.25em;
  }

  > span {
    display: flex;
    gap: var(--mk-button-spacing-size);
    align-items: center;
    justify-content: center;
  }

  &[data-type='plain'] {
    color: var(--mk-button-plain-text-color);
    background-color: var(--mk-button-plain-background-color);

    @include melkor.not-disabled {
      &:hover {
        background-color: var(--mk-button-plain-background-color-hover);
      }

      @include melkor.active {
        background-color: var(--mk-button-plain-background-color-active);
      }
    }
  }

  &[data-type='outline'] {
    color: var(--mk-button-outline-text-color);
    background-color: var(--mk-button-outline-background-color);
    box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size) var(--mk-button-outline-border-color);

    @include melkor.not-disabled {
      &:hover {
        background-color: var(--mk-button-outline-background-color-hover);
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-hover)
          var(--mk-button-outline-border-color-hover);
      }

      @include melkor.active {
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-active)
          var(--mk-button-outline-border-color-active);
      }
    }
  }

  &[data-size='wide'] {
    padding: calc(var(--mk-button-padding-y-size) * 1.5) calc(var(--mk-button-padding-x-size) * 1.5);
    font-size: var(--mk-button-wide-text-size);
    border-radius: calc(var(--mk-button-border-radius-size) * 1.5);
  }

  &[data-size='tight'] {
    padding: calc(var(--mk-button-padding-y-size) * 0.75) calc(var(--mk-button-padding-x-size) * 0.75);
    font-size: var(--mk-button-tight-text-size);
    border-radius: calc(var(--mk-button-border-radius-size) * 0.75);
  }

  @include melkor.disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
