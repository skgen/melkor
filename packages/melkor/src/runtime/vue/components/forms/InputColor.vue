<template>
  <label
    v-theme="theme"
    class="mk-InputColor"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <FieldLabel v-if="slots.label">
      <slot name="label" />
    </FieldLabel>
    <div class="mk-InputColor-input">
      <div
        class="mk-InputColor-color"
        :style="`background-color: ${props.value};`"
      />
      <input
        ref="inputElement"
        :name="props.name"
        type="color"
        :value="props.value"
        :disabled="props.disabled"
        @input="handleChange"
        @focus="onFocus"
        @blur="onBlur"
      >
      <span class="mk-InputColor-value">
        <span
          class="mk-InputColor-hashtag"
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
      <FieldTextableCancel
        v-if="isCancelable"
        :disabled="props.disabled"
        @click.prevent="handleCancel"
      >
        <slot name="cancel-icon" />
      </FieldTextableCancel>

      <span v-if="slots['trailing-icon']" class="mk-InputColor-icon">
        <slot name="trailing-icon" />
      </span>
    </div>
    <FieldHint v-if="slots.hint">
      <slot name="hint" />
    </FieldHint>
    <FieldError v-if="errors.hasErrors">
      {{ errors.formattedErrors }}
    </FieldError>
  </label>
</template>

<script lang="ts">
import type { Slot } from 'vue';

import type { InputEmits, InputExpose, InputProps, InputSlots } from '../../features';

export type InputColorValue = string | null;

export type InputColorProps = InputProps<InputColorValue> & {
  placeholder?: string;
  cancelable?: boolean;
};

export type InputColorEmits = InputEmits<InputColorValue>;

export type InputColorSlots = InputSlots & {
  'trailing-icon'?: Slot;
  'cancel-icon'?: Slot;
};

export type InputColorExpose = InputExpose;
</script>

<script lang="ts" setup>
import { isValue } from '@skgn/kit';
import { computed, useTemplateRef } from 'vue';

import { FieldError, FieldHint, FieldLabel, FieldTextableCancel } from '../../components';
import { useInput, useInputErrors, useTheme } from '../../composables';
import { bindInteractionStateProps } from '../../features';

const props = withDefaults(
  defineProps<InputColorProps>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    validateOn: () => ['dirty'],
  },
);

const emit = defineEmits<InputColorEmits>();

const slots = defineSlots<InputColorSlots>();

const inputElement = useTemplateRef('inputElement');

const theme = useTheme();

const errors = useInputErrors(computed(() => props.errors));

const {
  onChange,
  onFocus,
  onBlur,
  focused,
} = useInput<InputColorValue>({
  props,
  emit,
});

const placeholder = computed(() => (props.placeholder ? props.placeholder.replace(/[^0-9a-f]+/gi, '') : null));
const absoluteValue = computed(() => (props.value ? props.value.replace('#', '') : null));

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

  const filteredValue = value.replace(/[^0-9a-f]+/gi, '').slice(0, 8);

  if (filteredValue === '') {
    onChange(null);
  }
  else {
    onChange(`#${filteredValue}`);
  }
}

const isCancelable = computed(() => props.cancelable && isValue(props.value));

function handleCancel() {
  onChange(null);
}

function focus() {
  if (!inputElement.value) {
    return;
  }
  inputElement.value.focus();
  inputElement.value.click();
}

function blur() {
  if (!inputElement.value) {
    return;
  }
  inputElement.value.blur();
}

defineExpose<InputColorExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputColor {
  --mk-input-color-background-color: var(--mk-input-background-color);
  --mk-input-color-border-color: var(--mk-input-border-color);
  --mk-input-color-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-color-border-color-focused: var(--mk-input-border-color-focused);
  --mk-input-color-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-color-border-size: var(--mk-input-border-size);
  --mk-input-color-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-color-border-size-focused: var(--mk-input-border-size-focused);
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

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

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

    .mk-Icon {
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
    .mk-Icon {
      display: block;
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-color-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-color-border-size-hover) var(--mk-input-color-border-color-hover);
        }
      }
    }

    @include melkor.on-focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-color-border-size-focused)
            var(--mk-input-color-border-color-focused);
        }
      }
    }
  }

  @include melkor.on-disabled {
    #{$this} {
      &-input {
        cursor: not-allowed;
        opacity: var(--mk-input-opacity-disabled);

        input {
          cursor: not-allowed;
        }
      }
    }
  }

  .mk-FieldTextableCancel {
    --mk-field-textable-cancel-icon-color: var(--mk-input-color-icon-color);
    --mk-field-textable-cancel-icon-size: var(--mk-input-color-icon-size);
  }
}
</style>
