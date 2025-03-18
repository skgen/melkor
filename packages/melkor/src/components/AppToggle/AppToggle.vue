<template>
  <div
    v-theme="theme"
    class="mk-AppToggle"
    :data-is-checked="props.checked || undefined"
    :data-is-disabled="props.disabled || undefined"
  >
    <div class="mk-AppToggle-target">
      <template v-if="!props.iconInBackground">
        <slot
          v-if="props.checked && $slots['checked-icon']"
          name="checked-icon"
        />
        <slot
          v-if="!props.checked && $slots['unchecked-icon']"
          name="unchecked-icon"
        />
      </template>
    </div>
    <template v-if="props.iconInBackground">
      <transition-group name="mk-fade">
        <div
          v-if="props.checked && $slots['checked-icon']"
          class="mk-AppToggle-icon"
          data-state="checked"
        >
          <slot name="checked-icon" />
        </div>
        <div
          v-if="!props.checked && $slots['unchecked-icon']"
          class="mk-AppToggle-icon"
          data-state="unchecked"
        >
          <slot name="unchecked-icon" />
        </div>
      </transition-group>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '../../composables';

interface Props {
  checked?: boolean;
  disabled?: boolean;
  iconInBackground?: boolean;
}

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppToggle {
  --mk-toggle-background-color: var(--mk-border-color);
  --mk-toggle-background-color-hover: var(--mk-border-color-hover);

  // --mk-toggle-background-color-active: var(--mk-success);
  // --mk-toggle-background-color-active: var(--mk-border-color-active);
  --mk-toggle-background-color-active: var(--mk-primary);

  // var(--mk-primary);

  // --mk-toggle-icon-size: calc(var(--mk-toggle-target-size) - calc(var(--mk-toggle-target-padding-size) * 2));
  // --mk-toggle-icon-color: white;

  // --mk-checkbox-icon-size: 14px;
  --mk-toggle-padding-size: 2px;
  --mk-toggle-target-size: 12px;
  --mk-toggle-target-color: var(--mk-shade-10);
  --mk-toggle-target-color-active: var(--mk-on-primary);
  --mk-toggle-target-padding-size: calc(var(--mk-toggle-padding-size) / 2);
  --mk-toggle-transition-duration: var(--mk-transition-2-duration);

  $this: &;

  position: relative;
  display: block;
  width: calc(var(--mk-toggle-target-size) * 2 + var(--mk-toggle-padding-size) * 2);
  padding: var(--mk-toggle-padding-size);
  background-color: var(--mk-toggle-background-color);
  border-radius: var(--mk-toggle-target-size);
  transition:
    background-color var(--mk-toggle-transition-duration),
    opacity var(--mk-toggle-transition-duration);

  &-target {
    position: relative;
    width: var(--mk-toggle-target-size);
    height: var(--mk-toggle-target-size);
    user-select: none;
    background-color: var(--mk-toggle-target-color);
    border-radius: 50%;
    transition:
      background-color var(--mk-toggle-transition-duration),
      transform var(--mk-toggle-transition-duration);

    .mk-AppIcon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      --mk-icon-size: var(--mk-checkbox-icon-size);
      --mk-icon-color: var(--mk-checkbox-icon-color);
    }
  }

  &-icon {
    position: absolute;
    top: 50%;

    .mk-AppIcon {
      display: block;

      // opacity: 0.6;

      --mk-icon-color: var(--mk-toggle-target-color);
    }

    &[data-state='checked'] {
      left: calc((var(--mk-toggle-padding-size) + var(--mk-toggle-target-size) / 2));
      transform: translate(-50%, -50%);
    }

    &[data-state='unchecked'] {
      right: calc((var(--mk-toggle-padding-size) + var(--mk-toggle-target-size) / 2));
      transform: translate(50%, -50%);
    }
  }

  &[data-is-checked='true'] {
    background-color: var(--mk-toggle-background-color-active) !important;

    #{$this} {
      &-target {
        background-color: var(--mk-toggle-target-color-active);
        transform: translate(100%, 0);

        .mk-AppIcon {
          --mk-icon-color: var(--mk-toggle-background-color-active);
        }
      }
    }
  }

  @include melkor.not-disabled {
    &:hover {
      background-color: var(--mk-toggle-background-color-hover);
    }
  }

  @include melkor.disabled {
    cursor: not-allowed;
    opacity: var(--mk-opacity-disabled);
  }

  // &[data-is-disabled='true'] {
  //   background-color: var(--app-input-color-disabled);
  //   opacity: var(--app-input-opacity-disabled);

  //   #{$this} {
  //     &-target {
  //       .mk-AppIcon {
  //         --mk-icon-color: var(--app-input-color-disabled);
  //       }
  //     }
  //   }
  // }
}
</style>
