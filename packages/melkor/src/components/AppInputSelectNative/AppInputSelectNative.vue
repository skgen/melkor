<template>
  <label
    v-theme="theme"
    class="mk-AppInputSelectNative"
    :data-theme="theme"
    :data-fill="props.fill || undefined"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <AppInputLabel v-if="$slots.label">
      <slot name="label" />
    </AppInputLabel>
    <div class="mk-AppInputSelectNative-input">
      <select
        ref="inputRef"
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
      <AppIcon :icon="globalConfig.icons.AppInputSelectNative.arrow" />
    </div>
    <AppInputHint v-if="$slots.hint">
      <slot name="hint" />
    </AppInputHint>
    <AppInputError v-if="props.errors">
      {{ formatErrors(props.errors) }}
    </AppInputError>
  </label>
</template>

<script lang="ts" setup generic="TValue">
import { isEqual } from 'lodash-es';
import { ref } from 'vue';

import AppIcon from '../../components/AppIcon/AppIcon.vue';
import AppInputError from '../../components/AppInputError/AppInputError.vue';
import AppInputHint from '../../components/AppInputHint/AppInputHint.vue';
import AppInputLabel from '../../components/AppInputLabel/AppInputLabel.vue';
import { useGlobalConfig } from '../../composables/useGlobalConfig';
import { useInput } from '../../composables/useInput';
import { useTheme } from '../../composables/useTheme';
import { bindInteractionStateProps } from '../../features/interactions';
import { inputSelectNativeDefaultProps, type InputSelectNativeEmits, type InputSelectNativeExpose, type InputSelectNativeProps, type InputSelectNativeSlots } from '../../features/io/input-select.native';
import { formatErrors } from '../../features/utils';

export type Props<TValue> = InputSelectNativeProps<TValue>;
export type Emits<TValue> = InputSelectNativeEmits<TValue>;
export type Slots<TValue> = InputSelectNativeSlots<TValue>;
export type Expose = InputSelectNativeExpose;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  inputSelectNativeDefaultProps,
);

const emit = defineEmits<Emits<TValue>>();

defineSlots<Slots<TValue>>();

defineExpose<Expose>({
  focus,
  blur,
});

const inputRef = ref<HTMLSelectElement | null>(null);

const theme = useTheme();
const globalConfig = useGlobalConfig();

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

  onChange(newOption.value);
}

function focus() {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.focus();
}

function blur() {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.blur();
}
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputSelectNative {
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

    .mk-AppIcon {
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

  &[data-fill='true'] {
    @include melkor.mk-fill;
  }
}
</style>
