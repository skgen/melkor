<template>
  <div
    ref="rootElement"
    v-theme="theme"
    class="mk-InputRadio"
    :data-direction="props.direction"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <div class="mk-InputRadio-wrapper">
      <FieldLabel v-if="slots.label">
        <slot name="label" />
      </FieldLabel>

      <div class="mk-InputRadio-input">
        <label
          v-for="(option, index) in props.options"
          :key="index"
          class="mk-InputRadio-input-option"
          :data-is-disabled="(option.disabled && !props.disabled) || undefined"
        >
          <input
            ref="inputElements"
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
                onFocus(event);
              }
            }"
            @blur="onBlur"
          >
          <Radio
            :checked="isActiveOption(option.value)"
            :disabled="option.disabled && !props.disabled"
            :hovered="(!option.disabled && !props.disabled) && (props.hovered || hovered)"
            :focused="focused && index === focusedIndex"
          />
          <span class="mk-InputRadio-input-option-label">
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

    <FieldHint v-if="slots.hint">
      <slot name="hint" />
    </FieldHint>
    <FieldError v-if="errors.hasErrors">
      {{ errors.formattedErrors }}
    </FieldError>
  </div>
</template>

<script lang="ts">
import type { Flatten } from '@skgn/kit';
import type { Slot } from 'vue';

import type { InputEmits, InputExpose, InputProps, InputSlots } from '../../features';

export type InputRadioProps<TValue = boolean> = InputProps<TValue> & {
  direction?: 'horizontal' | 'vertical';
  options: {
    disabled?: boolean;
    value: TValue;
  }[];
  nullable?: boolean;
};

export type InputRadioEmits<TValue = boolean> = InputEmits<TValue>;

export type InputRadioSlots<TValue = boolean> = InputSlots & {
  option?: Slot<{
    index: number;
    option: Flatten<InputRadioProps<TValue>['options']>;
  }>;
};

export type InputRadioExpose = InputExpose;
</script>

<script lang="ts" setup generic="TValue = boolean">
import { useElementHover } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { ref, useTemplateRef } from 'vue';

import { FieldError, FieldHint, FieldLabel, Radio } from '../../components';
import { useInput, useInputErrors, useTheme } from '../../composables';
import { bindInteractionStateProps } from '../../features';

const props = withDefaults(
  defineProps<InputRadioProps<TValue>>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    direction: 'vertical',
  },
);

const emit = defineEmits<InputRadioEmits<TValue>>();

const slots = defineSlots<InputRadioSlots<TValue>>();

const inputElements = useTemplateRef('inputElements');
const rootElement = useTemplateRef('rootElement');

const hovered = useElementHover(rootElement);

const theme = useTheme();

const errors = useInputErrors(props.errors);

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
  if (!newOption) {
    return;
  }
  const newValue = newOption.value;

  if (props.nullable && isActiveOption(newValue)) {
    onChange(null as TValue);
  }

  onChange(newValue);
}

const syntheticFocus = ref(false);

function focus() {
  const firstInputElement = inputElements.value?.at(0);

  if (!firstInputElement) {
    return;
  }
  syntheticFocus.value = true;
  firstInputElement.focus();
}

function blur() {
  if (!inputElements.value) {
    return;
  }
  syntheticFocus.value = false;
  for (const inputElement of inputElements.value) {
    inputElement.blur();
  }
}

defineExpose<InputRadioExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputRadio {
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
