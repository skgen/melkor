<template>
  <div
    ref="rootRef"
    v-theme="theme"
    class="mk-AppInputRadio"
    :data-direction="props.direction"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
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
            @focus="(event) => {
              const target = event.target as HTMLInputElement | null;
              if (target?.matches(':focus-visible') || syntheticFocus) {
                focusedIndex = index;
                syntheticFocus = false;
                onFocus();
              }
            }"
            @blur="onBlur"
          >
          <AppRadio
            :checked="isActiveOption(option.value)"
            :disabled="option.disabled && !props.disabled"
            :hovered="(!option.disabled && !props.disabled) && (props.hovered || hovered)"
            :focused="focused && index === focusedIndex"
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
    <AppInputError v-if="hasErrors(props.errors)">
      >
      {{ formatErrors(props.errors) }}
    </AppInputError>
  </div>
</template>

<script lang="ts" setup generic="TValue = boolean">
import { useElementHover } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { ref } from 'vue';

import { useInput } from '../../composables/useInput';
import { useTheme } from '../../composables/useTheme';
import { bindInteractionStateProps } from '../../features/interactions';
import { hasErrors } from '../../features/io/input';
import { inputRadioDefaultProps, type InputRadioEmits, type InputRadioExpose, type InputRadioProps, type InputRadioSlots } from '../../features/io/input-radio';
import { formatErrors } from '../../features/utils';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppRadio from '../AppRadio/AppRadio.vue';

export type Props<TValue> = InputRadioProps<TValue>;
export type Emits<TValue> = InputRadioEmits<TValue>;
export type Slots<TValue> = InputRadioSlots<TValue>;
export type Expose = InputRadioExpose;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  inputRadioDefaultProps,
);

const emit = defineEmits<Emits<TValue>>();

defineSlots<Slots<TValue>>();

defineExpose<Expose>({
  focus,
  blur,
});

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

const focusedIndex = ref(0);

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

const syntheticFocus = ref(false);

function focus() {
  const firstInputRef = inputRefs.value?.find((v, i) => i === 0);

  if (!firstInputRef) {
    return;
  }
  syntheticFocus.value = true;
  firstInputRef.focus();
}

function blur() {
  if (!inputRefs.value) {
    return;
  }
  syntheticFocus.value = false;
  for (const inputRef of inputRefs.value) {
    inputRef.blur();
  }
}
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
