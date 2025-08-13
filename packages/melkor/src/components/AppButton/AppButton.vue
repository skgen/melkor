<template>
  <button
    v-theme="theme"
    class="mk-AppButton"
    :data-variant="props.variant"
    :data-size="props.size"
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
  size?: 'wide' | 'tight' | 'compact';
  icon?: boolean;
  type?: 'submit' | 'reset' | 'button';
} & DisabledProps & ActiveProps;

const props = withDefaults(
  defineProps<Props>(),
  {
    variant: 'plain',
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
  --mk-button-outline-background-color: var(--mk-input-background-color);
  --mk-button-outline-background-color-hover: var(--mk-input-background-color-hover);
  --mk-button-outline-border-color: var(--mk-input-border-color);
  --mk-button-outline-border-color-hover: var(--mk-input-border-color-hover);
  --mk-button-outline-border-color-focused: var(--mk-input-border-color-focused);
  --mk-button-outline-border-color-active: var(--mk-input-border-color-active);
  --mk-button-outline-border-size: var(--mk-input-border-size);
  --mk-button-outline-border-size-hover: var(--mk-input-border-size-hover);
  --mk-button-outline-border-size-focused: var(--mk-input-border-size-focused);
  --mk-button-outline-border-size-active: var(--mk-input-border-size-active);
  --mk-button-outline-text-color: var(--mk-text-color);

  // Plain
  --mk-button-plain-text-color: var(--mk-on-primary);
  --mk-button-plain-background-color: var(--mk-primary);
  --mk-button-plain-background-color-hover: oklch(from var(--mk-primary) calc(l + 0.05) c h);
  --mk-button-plain-background-color-focused: oklch(from var(--mk-primary) calc(l - 0.05) c h);
  --mk-button-plain-background-color-active: oklch(from var(--mk-primary) calc(l - 0.05) c h);
  --mk-button-plain-border-size-focused: var(--mk-input-border-size-focused);
  --mk-button-plain-border-color-focused: var(--mk-input-border-color-focused);

  // Compact
  --mk-button-compact-ratio: 0.25;
  --mk-button-compact-text-size: 0.75rem;
  --mk-button-compact-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-compact-ratio));
  --mk-button-compact-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-compact-ratio));
  --mk-button-compact-border-radius-size: calc(var(--mk-button-border-radius-size) * 0.75);

  // Tight
  --mk-button-tight-ratio: 0.75;
  --mk-button-tight-text-size: 0.875rem;
  --mk-button-tight-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-tight-ratio));
  --mk-button-tight-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-tight-ratio));
  --mk-button-tight-border-radius-size: calc(var(--mk-button-border-radius-size) * var(--mk-button-tight-ratio));

  // Wide
  --mk-button-wide-ratio: 1.5;
  --mk-button-wide-text-size: 1.125rem;
  --mk-button-wide-padding-x-size: calc(var(--mk-button-padding-x-size) * var(--mk-button-wide-ratio));
  --mk-button-wide-padding-y-size: calc(var(--mk-button-padding-y-size) * var(--mk-button-wide-ratio));
  --mk-button-wide-border-radius-size: calc(var(--mk-button-border-radius-size) * var(--mk-button-wide-ratio));

  position: relative;
  box-sizing: content-box;
  padding: var(--mk-button-padding-y-size) var(--mk-button-padding-x-size);
  font-size: var(--mk-button-text-size);
  font-weight: var(--mk-button-text-weight);
  line-height: var(--mk-line-height);
  cursor: pointer;
  border-radius: var(--mk-button-border-radius-size);
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

  &[data-icon='true'] {
    padding: calc(var(--mk-button-padding-y-size));
  }

  &[data-variant='plain'] {
    color: var(--mk-button-plain-text-color);
    background-color: var(--mk-button-plain-background-color);

    @include melkor.on-not-disabled {
      @include melkor.on-hover {
        background-color: var(--mk-button-plain-background-color-hover);
      }

      @include melkor.on-active {
        background-color: var(--mk-button-plain-background-color-active) !important;
      }

      // @include melkor.on-not-active {
      @include melkor.on-focused-visible {
        outline: var(--mk-button-plain-border-size-focused) solid var(--mk-button-plain-border-color-focused);
        outline-offset: 2px;
      }
    }
  }

  &[data-variant='outline'] {
    color: var(--mk-button-outline-text-color);
    background-color: var(--mk-button-outline-background-color);
    box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size) var(--mk-button-outline-border-color);

    @include melkor.on-not-disabled {
      @include melkor.on-hover {
        background-color: var(--mk-button-outline-background-color-hover);
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-hover)
          var(--mk-button-outline-border-color-hover);
      }

      @include melkor.on-active {
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-active)
          var(--mk-button-outline-border-color-active) !important;
      }

      @include melkor.on-focused-visible {
        box-shadow: inset 0 0 0.01px var(--mk-button-outline-border-size-focused)
          var(--mk-button-outline-border-color-focused);
      }
    }
  }

  &[data-size='compact'] {
    padding: var(--mk-button-compact-padding-y-size) var(--mk-button-compact-padding-x-size);
    font-size: var(--mk-button-compact-text-size);
    border-radius: var(--mk-button-compact-border-radius-size);

    &[data-icon='true'] {
      padding: var(--mk-button-compact-padding-y-size);
    }
  }

  &[data-size='tight'] {
    padding: var(--mk-button-tight-padding-y-size) var(--mk-button-tight-padding-x-size);
    font-size: var(--mk-button-tight-text-size);
    border-radius: var(--mk-button-tight-border-radius-size);

    &[data-icon='true'] {
      padding: var(--mk-button-tight-padding-y-size);
    }
  }

  &[data-size='wide'] {
    padding: var(--mk-button-wide-padding-y-size) var(--mk-button-wide-padding-x-size);
    font-size: var(--mk-button-wide-text-size);
    border-radius: var(--mk-button-wide-border-radius-size);

    &[data-icon='true'] {
      padding: var(--mk-button-wide-padding-y-size);
    }
  }

  @include melkor.on-disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }
}
</style>
