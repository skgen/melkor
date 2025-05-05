<template>
  <div
    ref="rootRef"
    v-theme="theme"
    class="mk-AppInputRadio"
    :data-is-focused="focused || undefined"
    :data-direction="props.direction"
    v-bind="bindInteractionStateProps(props)"
  >
    <div class="mk-AppInputRadio-wrapper">
      <AppInputLabel v-if="$slots.label">
        <slot name="label" />
      </AppInputLabel>

      <div class="mk-AppInputRadio-input">
        <label
          v-for="(option, index) in props.options"
          :key="index"
          class="mk-AppInputRadio-input-option"
          :data-is-disabled="(option.disabled && !props.disabled) || undefined"
        >
          <input
            ref="inputRefs"
            :name="props.name"
            type="radio"
            :value="index"
            :checked="isActiveOption(option.value)"
            :disabled="option.disabled || props.disabled"
            @click="handleChange"
            @focus="onFocus"
            @blur="onBlur"
          >
          <AppRadio
            :checked="isActiveOption(option.value)"
            :disabled="option.disabled && !props.disabled"
            :hovered="(!option.disabled && !props.disabled) && (props.hovered || hovered)"
          />
          <span class="mk-AppInputRadio-input-option-label">
            <slot
              name="option"
              v-bind="{ option, index }"
            >
              {{ option.value }}
            </slot>
          </span>
        </label>
      </div>
    </div>

    <AppInputHint v-if="$slots.hint">
      <slot name="hint" />
    </AppInputHint>
    <AppInputError v-if="props.error">
      {{ formatError(props.error) }}
    </AppInputError>
  </div>
</template>

<script lang="ts" setup generic="TValue">
import type { InputRadioEmits, InputRadioProps } from '../../features/io/input-radio';

import { useElementHover } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { ref } from 'vue';

import { useInput, useTheme } from '../../composables';
import { bindInteractionStateProps, formatError } from '../../features';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppRadio from '../AppRadio/AppRadio.vue';

export type Props<TValue = boolean> = InputRadioProps<TValue>;
type Emits<TValue> = InputRadioEmits<TValue>;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  {
    direction: 'vertical',
  },
);

const emit = defineEmits<Emits<TValue>>();

const inputRefs = ref<HTMLInputElement[] | null>(null);
const rootRef = ref<HTMLDivElement | null>(null);

const hovered = useElementHover(rootRef);

const theme = useTheme();

const {
  onChange,
  onFocus,
  onBlur,
  focused,
} = useInput<TValue>({
  props,
  emit,
});

function isActiveOption(option: TValue) {
  return isEqual(option, props.value);
}

function handleChange(event: Event) {
  if (!event.target) {
    return;
  }

  const { value: index } = event.target as HTMLInputElement;

  const newOption = props.options[Number.parseInt(index, 10)];
  const newValue = newOption.value;

  if (props.nullable && isActiveOption(newValue)) {
    onChange(null as TValue);
  }

  onChange(newValue);
}

function focus() {
  const firstInputRef = inputRefs.value?.find((v, i) => i === 0);
  if (!firstInputRef) {
    return;
  }
  firstInputRef.focus();
}

function blur() {
  if (!inputRefs.value) {
    return;
  }
  for (const inputRef of inputRefs.value) {
    inputRef.blur();
  }
}

defineExpose({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputRadio {
  --mk-input-radio-input-spacing-size: var(--mk-size-2);
  --mk-input-radio-input-state-label-color: var(--mk-shade-9);
  --mk-input-radio-option-spacing-size: var(--mk-size-1);

  $this: &;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-2);
  }

  &-input {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--mk-input-radio-input-spacing-size);

    input {
      @include melkor.a11y-hidden;
    }

    &-option {
      $option: &;

      display: flex;
      gap: var(--mk-input-radio-input-spacing-size);
      align-items: center;

      @include melkor.on-disabled {
        cursor: not-allowed;
        #{$option} {
          &-label {
            opacity: var(--mk-input-opacity-disabled);
          }
        }
      }

      &-label {
        display: flex;
        gap: var(--mk-input-radio-option-spacing-size);
        align-items: center;
        color: var(--mk-input-radio-input-state-label-color);
      }
    }
  }

  &[data-direction='horizontal'] {
    #{$this} {
      &-wrapper {
        flex-direction: row;
        align-items: center;
      }

      &-input {
        flex-direction: row;
        align-items: center;
      }
    }
  }

  @include melkor.on-disabled {
    #{$this} {
      &-input {
        cursor: not-allowed;
        opacity: var(--mk-input-opacity-disabled);

        &-option {
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
