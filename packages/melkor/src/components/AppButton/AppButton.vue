<template>
  <button
    v-theme="theme"
    class="mk-AppButton"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-intent="props.intent"
    :data-icon="props.icon || undefined"
    v-bind="bindInteractionStateProps(props)"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables/useTheme';
import { type ActiveProps, bindInteractionStateProps, type DisabledProps } from '../../features/interactions';

export type Props = {
  variant?: 'plain' | 'outline';
  size?: 'wide' | 'medium' | 'tight' | 'compact';
  icon?: boolean;
  type?: 'submit' | 'reset' | 'button';
  intent?: 'primary' | 'neutral' | 'success' | 'error' | 'danger' | 'info';
} & DisabledProps & ActiveProps;

const props = withDefaults(
  defineProps<Props>(),
  {
    variant: 'plain',
    size: 'medium',
    intent: 'primary',
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
  --mk-button-text-weight: 400;

  // Outline
  --mk-button-outline-border-size: var(--mk-input-border-size);
  --mk-button-outline-border-size-hover: var(--mk-input-border-size-hover);
  --mk-button-outline-border-size-focused: var(--mk-input-border-size-focused);
  --mk-button-outline-border-size-active: var(--mk-input-border-size-active);

  // Plain
  --mk-button-plain-border-size-focused: var(--mk-input-border-size-focused);

  // Compact
  --mk-button-compact-ratio: 0.25;
  --mk-button-compact-text-size: calc(var(--mk-button-text-size) * 0.75);
  --mk-button-compact-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-compact-ratio));
  --mk-button-compact-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-compact-ratio));
  --mk-button-compact-border-radius-size: calc(var(--mk-button-border-radius-size) * 0.75);

  // Tight
  --mk-button-tight-ratio: 0.75;
  --mk-button-tight-text-size: calc(var(--mk-button-text-size) * 0.875);
  --mk-button-tight-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-tight-ratio));
  --mk-button-tight-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-tight-ratio));
  --mk-button-tight-border-radius-size: calc(var(--mk-button-border-radius-size) * var(--mk-button-tight-ratio));

  // Medium
  --mk-button-medium-ratio: 1;
  --mk-button-medium-text-size: calc(var(--mk-button-text-size) * var(--mk-button-medium-ratio));
  --mk-button-medium-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-medium-ratio));
  --mk-button-medium-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-medium-ratio));
  --mk-button-medium-border-radius-size: calc(var(--mk-button-border-radius-size) * var(--mk-button-medium-ratio));

  // Wide
  --mk-button-wide-ratio: 1.5;
  --mk-button-wide-text-size: calc(var(--mk-button-text-size) * 1.125);
  --mk-button-wide-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-wide-ratio));
  --mk-button-wide-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-wide-ratio));
  --mk-button-wide-border-radius-size: calc(var(--mk-button-border-radius-size) * var(--mk-button-wide-ratio));

  position: relative;
  box-sizing: content-box;
  font-weight: var(--mk-button-text-weight);
  line-height: var(--mk-line-height);
  cursor: pointer;
  outline: none;
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

  &[data-variant='plain'] {
    color: var(--computed-text-color);
    background-color: var(--computed-background-color);

    @include melkor.on-not-disabled {
      @include melkor.on-hover {
        background-color: var(--computed-background-color-hover);
      }

      @include melkor.on-active {
        background-color: var(--computed-background-color-active) !important;
      }

      // @include melkor.on-not-active {
      @include melkor.on-focused-visible {
        outline: var(--mk-button-plain-border-size-focused) solid var(--computed-border-color-focused);
        outline-offset: 2px;
      }
    }

    --computed-background-color: var(--computed-intent-color);
    --computed-background-color-hover: oklch(from var(--computed-intent-color) calc(l + 0.05) c h);
    --computed-background-color-active: oklch(from var(--computed-intent-color) calc(l - 0.05) c h);
    --computed-background-color-focused: oklch(from var(--computed-intent-color) calc(l - 0.05) c h);
    --computed-border-color-focused: var(--computed-intent-color);

    &[data-intent='primary'] {
      --computed-intent-color: var(--mk-primary);
      --computed-text-color: var(--mk-on-primary);
    }

    &[data-intent='neutral'] {
      --computed-intent-color: var(--mk-neutral);
      --computed-text-color: var(--mk-on-neutral);
    }
  }

  &[data-variant='outline'] {
    color: var(--computed-text-color);
    background-color: var(--computed-background-color);
    box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size) var(--computed-border-color);

    @include melkor.on-not-disabled {
      @include melkor.on-hover {
        background-color: var(--computed-background-color-hover);
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-hover) var(--computed-border-color-hover);
      }

      @include melkor.on-active {
        background-color: var(--computed-background-color-active);
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-active) var(--computed-border-color-active) !important;
      }

      @include melkor.on-focused-visible {
        background-color: var(--computed-background-color-focused);
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-focused) var(--computed-border-color-focused);
      }
    }

    --computed-background-color: var(--mk-shade-4-15);
    --computed-border-color: var(--mk-shade-5);
    --computed-border-color-focused: var(--computed-intent-color);
    --computed-border-color-active: var(--computed-intent-color);

    &[data-intent='primary'] {
      --computed-intent-color: var(--mk-primary);
      --computed-border-color-hover: var(--mk-primary-50);
    }

    &[data-intent='neutral'] {
      --computed-intent-color: var(--mk-neutral);
      --computed-border-color-hover: var(--mk-neutral-50);
    }
  }

  &[data-size] {
    padding: var(--computed-padding-y-size) var(--computed-padding-x-size);
    font-size: var(--computed-text-size);
    border-radius: var(--computed-border-radius-size);

    &[data-icon='true'] {
      padding: var(--computed-padding-y-size);
    }

    &[data-size='compact'] {
      --computed-padding-x-size: var(--mk-button-compact-padding-x-size);
      --computed-padding-y-size: var(--mk-button-compact-padding-y-size);
      --computed-text-size: var(--mk-button-compact-text-size);
      --computed-border-radius-size: var(--mk-button-compact-border-radius-size);
    }

    &[data-size='tight'] {
      --computed-padding-x-size: var(--mk-button-tight-padding-x-size);
      --computed-padding-y-size: var(--mk-button-tight-padding-y-size);
      --computed-text-size: var(--mk-button-tight-text-size);
      --computed-border-radius-size: var(--mk-button-tight-border-radius-size);
    }

    &[data-size='medium'] {
      --computed-padding-x-size: var(--mk-button-medium-padding-x-size);
      --computed-padding-y-size: var(--mk-button-medium-padding-y-size);
      --computed-text-size: var(--mk-button-medium-text-size);
      --computed-border-radius-size: var(--mk-button-medium-border-radius-size);
    }

    &[data-size='wide'] {
      --computed-padding-x-size: var(--mk-button-wide-padding-x-size);
      --computed-padding-y-size: var(--mk-button-wide-padding-y-size);
      --computed-text-size: var(--mk-button-wide-text-size);
      --computed-border-radius-size: var(--mk-button-wide-border-radius-size);
    }
  }

  @include melkor.on-disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
