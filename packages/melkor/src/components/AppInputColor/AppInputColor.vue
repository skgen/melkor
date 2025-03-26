<template>
  <div
    v-theme="theme"
    class="mk-AppInputColor"
    :data-is-focused="focused || undefined"
    :data-fill="props.fill || undefined"
    :data-is-disabled="props.disabled || undefined"
  >
    <label>
      <AppInputLabel v-if="props.label">
        {{ props.label }}
      </AppInputLabel>
      <div class="mk-AppInputColor-input">
        <div
          class="mk-AppInputColor-color"
          :style="`background-color: ${model.value};`"
        />
        <input
          :name="props.name"
          type="color"
          :value="model.value"
          :disabled="props.disabled"
          @input="handleChange"
          @focus="onFocus"
          @blur="onBlur"
        >
        <span class="mk-AppInputColor-value">
          <span
            class="mk-AppInputColor-hashtag"
            :data-placeholder="!isValue(absoluteValue)"
          >#</span>
          <input
            type="text"
            :value="absoluteValue ?? undefined"
            :placeholder="placeholder ?? undefined"
            :disabled="props.disabled"
            @input="handleTextChange"
            @focus="onFocus"
            @blur="onBlur"
          >
        </span>
        <AppInputTextableCancel
          v-if="isCancelable"
          :disabled="props.disabled"
          @click="handleCancel"
        >
          <slot name="cancel" />
        </AppInputTextableCancel>

        <span v-if="$slots.icon" class="mk-AppInputColor-icon">
          <slot name="icon" />
        </span>
      </div>
    </label>
    <AppInputHint v-if="props.hint">
      {{ props.hint }}
    </AppInputHint>
    <AppInputError v-if="model.error">
      {{ formatError(model.error) }}
    </AppInputError>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useInput, useTheme } from '../../composables';
import { formatError, type InputColorEmits, type InputColorProps, type InputColorValue, isValue } from '../../features';
import AppIcon from '../AppIcon/AppIcon.vue';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppInputTextableCancel from '../AppInputTextableCancel/AppInputTextableCancel.vue';

export type Props = InputColorProps;

const props = defineProps<Props>();
const emit = defineEmits<InputColorEmits>();

const theme = useTheme();

const {
  onChange,
  onFocus,
  onBlur,
  model,
  focused,
} = useInput<InputColorValue>({
  props: computed(() => props),
  emit,
});

const placeholder = computed(() => (props.placeholder ? props.placeholder.replaceAll(/[^0-9a-f]+/gi, '') : null));
const absoluteValue = computed(() => (model.value.value ? model.value.value.replaceAll('#', '') : null));

function handleChange(evt: Event) {
  if (!evt.target) {
    return;
  }
  const { value } = evt.target as HTMLInputElement;

  onChange(value);
}

function handleTextChange(evt: Event) {
  if (!evt.target) {
    return;
  }
  const { value } = evt.target as HTMLInputElement;

  const filteredValue = value.replaceAll(/[^0-9a-f]+/gi, '').slice(0, 8);

  if (filteredValue === '') {
    onChange(null);
  }
  else {
    onChange(`#${filteredValue}`);
  }
}

const isCancelable = computed(() => props.cancelable && isValue(model.value.value));

function handleCancel() {
  onChange(null);
  onBlur();
}
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputColor {
  --mk-input-color-background-color: var(--mk-input-background-color);
  --mk-input-color-border-color: var(--mk-input-border-color);
  --mk-input-color-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-color-border-color-active: var(--mk-input-border-color-active);
  --mk-input-color-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-color-border-size: var(--mk-input-border-size);
  --mk-input-color-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-color-border-size-active: var(--mk-input-border-size-active);
  --mk-input-color-text-color: var(--mk-input-text-color);
  --mk-input-color-text-size: var(--mk-input-text-size);
  --mk-input-color-line-height: var(--mk-input-line-height);
  --mk-input-color-icon-color: var(--mk-input-icon-color);
  --mk-input-color-icon-size: var(--mk-input-icon-size);
  --mk-input-color-padding-x-size: var(--mk-input-padding-x-size);
  --mk-input-color-padding-y-size: var(--mk-input-padding-y-size);
  --mk-input-color-placeholder-text-color: var(--mk-input-placeholder-text-color);
  --mk-input-color-spacing-size: var(--mk-input-spacing-size);

  $this: &;

  display: inline-block;

  input[type='color'] {
    @include melkor.a11y-hidden;
  }

  &-hashtag {
    font-size: var(--mk-input-color-text-size);
    line-height: var(--mk-input-color-line-height);
    color: var(--mk-input-color-text-color);

    &[data-placeholder='true'] {
      color: var(--mk-input-color-placeholder-text-color);
    }
  }

  input[type='text'] {
    padding: 0;
    font-size: var(--mk-input-color-text-size);
    line-height: var(--mk-input-color-line-height);
    color: var(--mk-input-color-text-color);
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--mk-input-color-placeholder-text-color);
    }
  }

  &-input {
    display: flex;
    gap: var(--mk-input-color-spacing-size);
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--mk-input-color-padding-x-size);
    cursor: pointer;
    background-color: var(--mk-input-color-background-color);
    border-radius: var(--mk-input-color-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-color-border-size) var(--mk-input-color-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    .mk-AppIcon {
      --mk-icon-size: var(--mk-input-color-icon-size);
      --mk-icon-color: var(--mk-input-color-icon-color);
    }
  }

  &-color {
    width: 40px;
    height: 20px;
    border: var(--mk-border-size) solid var(--mk-input-color-border-color);
    border-radius: var(--mk-input-color-border-radius-size);
  }

  &-value {
    display: flex;
    flex: 1;
    padding: var(--mk-input-color-padding-y-size) 0;
  }

  &-icon {
    .mk-AppIcon {
      display: block;
    }
  }

  &[data-fill='true'] {
    @include melkor.mk-fill;
  }

  @include melkor.not-disabled {
    &:hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-color-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-color-border-size-hover) var(--mk-input-color-border-color-hover);
        }
      }
    }

    @include melkor.focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-color-border-size-active)
            var(--mk-input-color-border-color-active);
        }
      }
    }
  }

  @include melkor.disabled {
    #{$this} {
      &-input {
        opacity: var(--mk-input-opacity-disabled);
      }
    }
  }

  .mk-AppInputLabel {
    display: block;
    margin-bottom: var(--mk-size-2);
  }

  .mk-AppInputHint {
    display: block;
    margin-top: var(--mk-size-2);
  }

  .mk-AppInputError {
    display: block;
    margin-top: var(--mk-size-2);
  }

  .mk-AppInputTextableCancel {
    --mk-input-textable-cancel-icon-color: var(--mk-input-color-icon-color);
    --mk-input-textable-cancel-icon-size: var(--mk-input-color-icon-size);
  }
}
</style>
