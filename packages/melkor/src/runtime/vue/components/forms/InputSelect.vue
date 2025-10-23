<template>
  <div
    v-theme="theme"
    class="mk-InputSelect"
    :data-fill="props.fill || undefined"
    v-bind="bindInteractionStateProps({
      ...props,
      focused: focused || open,
    })"
  >
    <FieldLabel v-if="$slots.label">
      <slot name="label" />
    </FieldLabel>

    <PopoverRoot v-model:open="open">
      <PopoverTrigger as-child>
        <div
          class="mk-InputSelect-input"
          role="button"
          tabindex="0"
          @keydown="handleKeyDown"
          @focus="onFocus"
          @blur="onBlur"
        >
          <input
            type="hidden"
            :disabled="props.disabled"
            :value="JSON.stringify(props.value)"
            :name="props.name"
          >
          <span class="mk-InputSelect-select">
            <span class="mk-InputSelect-select-value">
              <slot name="value" v-bind="{ value: props.value }">
                {{ renderedValue }}
              </slot>
            </span>
          </span>
          <Icon :icon="globalConfig.icons.InputSelect.arrow" />
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :side-offset="4" side="bottom" align="end" :style="{ zIndex: 'var(--mk-floating-layer-z-index)' }">
          <div v-theme="theme" data-root="mk-InputSelect" class="mk-InputSelect-menu">
            <template v-if="props.options.length">
              <button
                v-for="(option, index) of props.options"
                :key="index"
                class="mk-InputSelect-option"
                :disabled="option.disabled"
                :data-is-active="isSelectedOption(option.value as TValue)"
                @click="() => handleChange(option.value as TValue)"
              >
                <slot name="option" v-bind="{ option, index }">
                  {{ option.value }}
                </slot>
              </button>
            </template>
            <template v-else>
              <slot name="empty-options">
                No option available
              </slot>
            </template>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <FieldHint v-if="$slots.hint">
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

import type { InferDefaults, InputEmits, InputExpose, InputProps, InputSlots } from '#melkor/features';

import { inputDefaultProps } from '#melkor/features';

export type InputSelectProps<TValue> = InputProps<TValue> & {
  fill?: boolean;
  cancelable?: boolean;
  options: {
    value: TValue extends (infer V)[] ? V : TValue;
    disabled?: boolean;
  }[];
};

export type InputSelectEmits<TValue> = InputEmits<TValue>;

export type InputSelectSlots<TValue> = InputSlots & {
  'option'?: Slot<{
    index: number;
    option: Flatten<InputSelectProps<TValue>['options']>;
  }>;
  'empty-options'?: Slot;
  'value'?: Slot<{
    value: TValue;
  }>;
};

export type InputSelectExpose = InputExpose;

export const inputSelectDefaultProps = { ...inputDefaultProps } satisfies InferDefaults<InputSelectProps<any>>;
</script>

<script lang="ts" setup generic="TValue">
import { isArray, isEqual } from 'lodash-es';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';
import { computed, nextTick, ref, watch } from 'vue';

import FieldLabel from '#melkor/components/forms/FieldLabel.vue';
import FieldError from '#melkor/components/forms/FieldLabel.vue';
import FieldHint from '#melkor/components/forms/FieldLabel.vue';
import Icon from '#melkor/components/Icon.vue';
import { useGlobalConfig, useInput, useInputErrors, useTheme } from '#melkor/composables';
import { bindInteractionStateProps } from '#melkor/features';

const props = withDefaults(
  defineProps<InputSelectProps<TValue>>(),
  inputSelectDefaultProps,
);

const emit = defineEmits<InputSelectEmits<TValue>>();

defineSlots<InputSelectSlots<TValue>>();

const theme = useTheme();

const globalConfig = useGlobalConfig();

const errors = useInputErrors(props.errors);

const open = ref(false);

const {
  onChange,
  onFocus,
  onBlur,
  focused,
} = useInput<TValue>({
  props,
  emit,
});

function isSelectedOption(value: TValue) {
  if (isArray(props.value)) {
    return !!props.value.find(v => isEqual(value, v));
  }
  return isEqual(value, props.value);
}

function handleChange(newValue: TValue) {
  if (isArray(props.value)) {
    const found = props.value.find(v => isEqual(newValue, v));
    if (found) {
      const filtered = props.value.filter(v => !isEqual(newValue, v));
      onChange(filtered as TValue);
    }
    else {
      onChange([...props.value, newValue] as TValue);
    }
  }
  else {
    if (props.cancelable && isEqual(props.value, newValue)) {
      onChange(null as TValue);
    }
    else {
      onChange(newValue as TValue);
    }
  }
}

const renderedValue = computed(() => {
  if (isArray(props.value)) {
    return props.value.join(',');
  }
  return props.value;
});

function handleKeyDown(event: KeyboardEvent) {
  if (event.code === 'Enter' || event.code === 'Space') {
    const target = event.currentTarget as HTMLElement | null;
    event.preventDefault();
    target?.click();
  }
}

watch(open, (newOpen) => {
  nextTick(() => {
    if (newOpen) {
      onFocus();
    }
    else {
      onBlur();
    }
  });
});

function focus() {
  open.value = true;
}

function blur() {
  open.value = false;
}

defineExpose<InputSelectExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputSelect,
[data-root='mk-InputSelect'] {
  --mk-input-select-background-color: var(--mk-input-background-color);
  --mk-input-select-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-select-border-color: var(--mk-input-border-color);
  --mk-input-select-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-select-border-color-focused: var(--mk-input-border-color-focused);
  --mk-input-select-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-select-border-size: var(--mk-input-border-size);
  --mk-input-select-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-select-border-size-focused: var(--mk-input-border-size-focused);
  --mk-input-select-text-color: var(--mk-input-text-color);
  --mk-input-select-text-size: var(--mk-input-text-size);
  --mk-input-select-line-height: var(--mk-input-line-height);
  --mk-input-select-icon-color: var(--mk-input-icon-color);
  --mk-input-select-icon-size: var(--mk-input-icon-size);
  --mk-input-select-padding-x-left-size: var(--mk-input-padding-x-size);
  --mk-input-select-padding-x-right-size: calc(var(--mk-input-padding-x-size) * 2 + var(--mk-input-select-icon-size));
  --mk-input-select-padding-y-size: var(--mk-input-padding-y-size);
  --mk-input-select-value-spacing-size: var(--mk-size-1);
  --mk-input-select-menu-background-color: var(--mk-shade-0);
  --mk-input-select-menu-spacing-size: var(--mk-size-1);
  --mk-input-select-menu-padding-x-size: var(--mk-size-1);
  --mk-input-select-menu-padding-y-size: var(--mk-size-1);
  --mk-input-select-option-background-color-hover: var(--mk-shade-2);
  --mk-input-select-option-background-color-active: var(--mk-shade-3);
  --mk-input-select-option-padding-x-size: var(--mk-size-3);
  --mk-input-select-option-padding-y-size: var(--mk-size-2);
}

.mk-InputSelect {
  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

  $this: &;

  &-input {
    position: relative;
    min-width: 180px;
    overflow: hidden;
    background-color: var(--mk-input-select-background-color);
    border-radius: var(--mk-input-select-border-radius-size);
    outline: none;
    box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size) var(--mk-input-select-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    > .mk-Icon {
      --mk-icon-color: var(--mk-input-select-icon-color);
      --mk-icon-size: var(--mk-input-select-icon-size);

      position: absolute;
      top: 50%;
      right: calc((var(--mk-input-select-padding-x-right-size) - var(--mk-icon-size)) / 2);
      pointer-events: none;
      transform: translate(0, -50%);
    }
  }

  &-select {
    display: block;
    width: 100%;
    padding: var(--mk-input-select-padding-y-size) var(--mk-input-select-padding-x-right-size)
      var(--mk-input-select-padding-y-size) var(--mk-input-select-padding-x-left-size);
    font-size: var(--mk-input-select-text-size);
    line-height: var(--mk-input-select-line-height);
    color: var(--mk-input-select-text-color);

    &-value {
      display: flex;
      gap: var(--mk-input-select-value-spacing-size);
      align-items: center;
      min-height: calc(var(--mk-input-select-text-size) * var(--mk-input-select-line-height));
      cursor: default;
    }
  }

  &-menu {
    display: flex;
    flex-direction: column;
    gap: var(--mk-input-select-menu-spacing-size);
    min-width: 180px;
    max-width: var(--reka-popover-trigger-width);
    max-height: var(--reka-popover-content-available-height);
    padding: var(--mk-input-select-menu-padding-y-size) var(--mk-input-select-menu-padding-x-size);
    overflow: auto;
    background-color: var(--mk-input-select-menu-background-color);
    border-radius: var(--mk-input-select-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size) var(--mk-input-select-border-color);
  }

  &-option {
    display: flex;
    gap: var(--mk-size-1);
    align-items: center;
    padding: var(--mk-input-select-option-padding-y-size) var(--mk-input-select-option-padding-x-size);
    cursor: default;
    border-radius: var(--mk-input-select-border-radius-size);
    transition: background-color var(--mk-transition-color-duration);

    @include melkor.on-not-disabled {
      @include melkor.on-hover {
        background-color: var(--mk-input-select-option-background-color-hover);
      }
    }

    @include melkor.on-active {
      background-color: var(--mk-input-select-option-background-color-active);
    }

    @include melkor.on-disabled {
      cursor: not-allowed;
      opacity: var(--mk-input-opacity-disabled);
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
          box-shadow: inset 0 0 0.01px var(--mk-input-select-border-size-focused)
            var(--mk-input-select-border-color-focused);
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
  }

  &[data-fill='true'] {
    @include melkor.mk-fill;
  }
}
</style>
