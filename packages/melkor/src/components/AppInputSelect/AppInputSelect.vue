<template>
  <label
    v-theme="theme"
    class="mk-AppInputSelect"
    :data-theme="theme"
    :data-is-focused="focused || undefined"
    :data-fill="props.fill || undefined"
    v-bind="bindInteractionStateProps(props)"
  >
    <AppInputLabel v-if="$slots.label">
      <slot name="label" />
    </AppInputLabel>
    <div class="mk-AppInputSelect-input">
      <select
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
      <AppIcon :icon="globalConfig.icons.AppInputSelect.arrow" />
    </div>
    <AppInputHint v-if="$slots.hint">
      <slot name="hint" />
    </AppInputHint>
    <AppInputError v-if="props.error">
      {{ formatError(props.error) }}
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
import { useGlobalConfig, useInput, useTheme } from '../../composables';
import { bindInteractionStateProps, formatError, type InputSelectEmits, type InputSelectProps, type InputSelectSlots } from '../../features';

export type Props<TValue> = InputSelectProps<TValue>;

const props = defineProps<Props<TValue>>();
const emit = defineEmits<InputSelectEmits<TValue>>();

defineSlots<InputSelectSlots<TValue>>();

const selectInput = ref<HTMLSelectElement | null>(null);

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
  if (!selectInput.value) {
    return;
  }
  selectInput.value.focus();
}

function blur() {
  if (!selectInput.value) {
    return;
  }
  selectInput.value.blur();
}

defineExpose({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputSelect {
  --mk-input-select-background-color: var(--mk-input-background-color);
  --mk-input-select-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-select-border-color: var(--mk-input-border-color);
  --mk-input-select-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-select-border-color-active: var(--mk-input-border-color-active);
  --mk-input-select-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-select-border-size: var(--mk-input-border-size);
  --mk-input-select-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-select-border-size-active: var(--mk-input-border-size-active);
  --mk-input-select-text-color: var(--mk-input-text-color);
  --mk-input-select-text-size: var(--mk-input-text-size);
  --mk-input-select-line-height: var(--mk-input-line-height);
  --mk-input-select-icon-color: var(--mk-input-icon-color);
  --mk-input-select-icon-size: var(--mk-input-icon-size);
  --mk-input-select-padding-x-left-size: var(--mk-input-padding-x-size);
  --mk-input-select-padding-x-right-size: calc(var(--mk-input-padding-x-size) * 2 + var(--mk-input-select-icon-size));
  --mk-input-select-padding-y-size: var(--mk-input-padding-y-size);

  $this: &;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

  select {
    width: 100%;
    padding: var(--mk-input-select-padding-y-size) var(--mk-input-select-padding-x-right-size)
      var(--mk-input-select-padding-y-size) var(--mk-input-select-padding-x-left-size);
    font-size: var(--mk-input-select-text-size);
    line-height: var(--mk-input-select-line-height);
    color: var(--mk-input-select-text-color);
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
    background-color: var(--mk-input-select-background-color);
    border-radius: var(--mk-input-select-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size) var(--mk-input-select-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    .mk-AppIcon {
      --mk-icon-color: var(--mk-input-select-icon-color);
      --mk-icon-size: var(--mk-input-select-icon-size);

      position: absolute;
      top: 50%;
      right: calc((var(--mk-input-select-padding-x-right-size) - var(--mk-icon-size)) / 2);
      pointer-events: none;
      transform: translate(0, -50%);
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-select-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size-hover)
            var(--mk-input-select-border-color-hover);
        }
      }
    }

    @include melkor.on-focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size-active)
            var(--mk-input-select-border-color-active);
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
