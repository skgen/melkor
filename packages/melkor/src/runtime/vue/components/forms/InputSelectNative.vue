<template>
  <label
    v-theme="theme"
    class="mk-InputSelectNative"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <FieldLabel v-if="slots.label">
      <slot name="label" />
    </FieldLabel>
    <div class="mk-InputSelectNative-input">
      <select
        ref="selectElement"
        :name="props.name"
        :disabled="props.disabled"
        @input="handleChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <option
          v-for="(option, index) in props.options"
          :key="index"
          :value="index"
          :disabled="option.disabled"
          :selected="isSelectedOption(option.value)"
        >
          <slot
            name="option"
            v-bind="{ option, index }"
          >
            {{ option.value }}
          </slot>
        </option>
      </select>
      <Icon :icon="globalConfig.icons.InputSelectNative.arrow" />
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
import type { Flatten } from '@skgn/kit';
import type { Slot } from 'vue';

import type { InputEmits, InputExpose, InputProps, InputSlots } from '../../features';

export type InputSelectNativeProps<TValue> = InputProps<TValue> & {
  options: {
    value: TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectNativeEmits<TValue> = InputEmits<TValue>;

export type InputSelectNativeSlots<TValue> = InputSlots & {
  option?: Slot<{
    index: number;
    option: Flatten<InputSelectNativeProps<TValue>['options']>;
  }>;
};

export type InputSelectNativeExpose = InputExpose;
</script>

<script lang="ts" setup generic="TValue">
import { isEqual } from 'lodash-es';
import { computed, useTemplateRef } from 'vue';

import { FieldError, FieldHint, FieldLabel, Icon } from '../../components';
import { useGlobalConfig, useInput, useInputErrors, useTheme } from '../../composables';
import { bindInteractionStateProps } from '../../features';

const props = withDefaults(
  defineProps<InputSelectNativeProps<TValue>>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    validateOn: () => ['dirty'],
  },
);

const emit = defineEmits<InputSelectNativeEmits<TValue>>();

const slots = defineSlots<InputSelectNativeSlots<TValue>>();

const selectElement = useTemplateRef('selectElement');

const theme = useTheme();

const globalConfig = useGlobalConfig();

const errors = useInputErrors(computed(() => props.errors));

const {
  onChange,
  onFocus,
  onBlur,
  focused,
} = useInput<TValue>({
  props,
  emit,
});

function isSelectedOption(option: TValue) {
  return isEqual(option, props.value);
}

function handleChange(evt: Event) {
  if (!evt.target) {
    return;
  }
  const { value: index } = evt.target as HTMLSelectElement;

  const newOption = props.options[Number.parseInt(index, 10)];

  if (!newOption) {
    return;
  }

  onChange(newOption.value);
}

function focus() {
  if (!selectElement.value) {
    return;
  }
  selectElement.value.focus();
}

function blur() {
  if (!selectElement.value) {
    return;
  }
  selectElement.value.blur();
}

defineExpose<InputSelectNativeExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputSelectNative {
  --mk-input-select-native-background-color: var(--mk-input-background-color);
  --mk-input-select-native-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-select-native-border-color: var(--mk-input-border-color);
  --mk-input-select-native-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-select-native-border-color-focused: var(--mk-input-border-color-focused);
  --mk-input-select-native-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-select-native-border-size: var(--mk-input-border-size);
  --mk-input-select-native-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-select-native-border-size-focused: var(--mk-input-border-size-focused);
  --mk-input-select-native-text-color: var(--mk-input-text-color);
  --mk-input-select-native-text-size: var(--mk-input-text-size);
  --mk-input-select-native-line-height: var(--mk-input-line-height);
  --mk-input-select-native-icon-color: var(--mk-input-icon-color);
  --mk-input-select-native-icon-size: var(--mk-input-icon-size);
  --mk-input-select-native-padding-x-left-size: var(--mk-input-padding-x-size);
  --mk-input-select-native-padding-x-right-size: calc(
    var(--mk-input-padding-x-size) * 2 + var(--mk-input-select-native-icon-size)
  );
  --mk-input-select-native-padding-y-size: var(--mk-input-padding-y-size);

  $this: &;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

  select {
    width: 100%;
    padding: var(--mk-input-select-native-padding-y-size) var(--mk-input-select-native-padding-x-right-size)
      var(--mk-input-select-native-padding-y-size) var(--mk-input-select-native-padding-x-left-size);
    font-size: var(--mk-input-select-native-text-size);
    line-height: var(--mk-input-select-native-line-height);
    color: var(--mk-input-select-native-text-color);
    appearance: none;
    background: transparent;
    border: none;
    outline: none;

    option {
      position: relative;
      background-color: var(--mk-surface-low-background-color);

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  &-input {
    position: relative;
    min-width: 180px;
    overflow: hidden;
    background-color: var(--mk-input-select-native-background-color);
    border-radius: var(--mk-input-select-native-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-select-native-border-size) var(--mk-input-select-native-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    .mk-Icon {
      --mk-icon-color: var(--mk-input-select-native-icon-color);
      --mk-icon-size: var(--mk-input-select-native-icon-size);

      position: absolute;
      top: 50%;
      right: calc((var(--mk-input-select-native-padding-x-right-size) - var(--mk-icon-size)) / 2);
      pointer-events: none;
      transform: translate(0, -50%);
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-select-native-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-select-native-border-size-hover)
            var(--mk-input-select-native-border-color-hover);
        }
      }
    }

    @include melkor.on-focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-select-native-border-size-focused)
            var(--mk-input-select-native-border-color-focused);
        }
      }
    }
  }

  @include melkor.on-disabled {
    #{$this} {
      &-input {
        opacity: var(--mk-input-opacity-disabled);
      }
    }

    select {
      &[disabled] {
        opacity: 1;
      }
    }
  }
}
</style>
