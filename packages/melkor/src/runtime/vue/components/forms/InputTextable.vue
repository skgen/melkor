<template>
  <label
    v-theme="theme"
    class="mk-InputTextable"
    :data-type="type"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <FieldLabel v-if="slots.label">
      <slot name="label" />
    </FieldLabel>
    <div class="mk-InputTextable-input">
      <span v-if="slots['leading-icon']" class="mk-InputTextable-icon">
        <slot name="leading-icon" />
      </span>

      <div class="mk-InputTextable-input-stub">
        <slot
          ref="input"
          :input-name="props.name"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :value="props.value"
          :type="type"
          :on-change="handleChange"
          :on-focus="onFocus"
          :on-blur="onBlur"
          :on-key-up="(event) => emit('keyup', event)"
          :on-key-down="(event) => emit('keydown', event)"
        />
      </div>

      <FieldTextableCancel
        v-if="isCancelable"
        :disabled="props.disabled"
        @click.prevent="handleCancel"
      >
        <slot name="cancel-icon" />
      </FieldTextableCancel>
      <button
        v-if="props.secure"
        class="mk-InputTextable-toggleVisibility"
        @click.prevent="handleToggleVisibility"
      >
        <Icon :icon="toggleVisibilityIcon" />
      </button>
      <span v-if="slots['trailing-icon']" class="mk-InputTextable-icon">
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
import type { Slot, VNodeRef } from 'vue';

import type { InputEmits, InputExpose, InputProps, InputSlots } from '../../features';

export type InputTextableProps<TValue> = InputProps<TValue> & {
  placeholder?: string;
  cancelable?: boolean;
  secure?: boolean;
};

export type InputTextableEmits<TValue> = InputEmits<TValue> & {
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
};

export type InputTextableSlots<TValue> = InputSlots & {
  'default'?: Slot<{
    ref: VNodeRef;
    inputName: InputTextableProps<TValue>['name'];
    disabled: InputTextableProps<TValue>['disabled'];
    placeholder: InputTextableProps<TValue>['placeholder'];
    value: InputTextableProps<TValue>['value'];
    type: 'password' | null;
    onChange: (event: Event, newValue: TValue) => void;
    onFocus: (event: FocusEvent) => void;
    onBlur: (event: FocusEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyUp: (event: KeyboardEvent) => void;
  }>;
  'leading-icon'?: Slot;
  'trailing-icon'?: Slot;
  'cancel-icon'?: Slot;
};

export type InputTextableExpose = InputExpose;
</script>

<script lang="ts" setup generic="TValue">
import { isValue } from '@skgn/kit';
import { computed, ref, useTemplateRef } from 'vue';

import { FieldError, FieldHint, FieldLabel, FieldTextableCancel, Icon } from '../../components';
import { useGlobalConfig, useInput, useInputErrors, useTheme } from '../../composables';
import { bindInteractionStateProps } from '../../features';

const props = withDefaults(
  defineProps<InputTextableProps<TValue>>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
  },
);

const emit = defineEmits<InputTextableEmits<TValue>>();

const slots = defineSlots<InputTextableSlots<TValue>>();

const input = useTemplateRef<InputExpose>('input');

const theme = useTheme();

const globalConfig = useGlobalConfig();

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

function handleChange(event: Event, newValue: TValue) {
  onChange(newValue);
}

const isCancelable = computed(() => props.cancelable && isValue(props.value) && !props.disabled);
const isSecure = ref(true);

const type = computed(() => {
  if (props.secure && isSecure.value) {
    return 'password' as const;
  }
  return null;
});

const toggleVisibilityIcon = computed(() =>
  (type.value === 'password'
    ? globalConfig.icons.InputTextable.passwordToggleVisibility.show
    : globalConfig.icons.InputTextable.passwordToggleVisibility.hide),
);

function handleToggleVisibility() {
  isSecure.value = !isSecure.value;
}

function handleCancel() {
  onChange(null as TValue);
  requestAnimationFrame(() => {
    if (!input.value) {
      return;
    }
    input.value.blur();
  });
}

function focus() {
  if (!input.value) {
    return;
  }
  input.value.focus();
}

function blur() {
  if (!input.value) {
    return;
  }
  input.value.blur();
}

defineExpose<InputTextableExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputTextable {
  --mk-input-textable-background-color: var(--mk-input-background-color);
  --mk-input-textable-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-textable-border-color: var(--mk-input-border-color);
  --mk-input-textable-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-textable-border-color-focused: var(--mk-input-border-color-focused);
  --mk-input-textable-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-textable-border-size: var(--mk-input-border-size);
  --mk-input-textable-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-textable-border-size-focused: var(--mk-input-border-size-focused);
  --mk-input-textable-text-color: var(--mk-input-text-color);
  --mk-input-textable-text-size: var(--mk-input-text-size);
  --mk-input-textable-line-height: var(--mk-input-line-height);
  --mk-input-textable-icon-color: var(--mk-input-icon-color);
  --mk-input-textable-icon-size: var(--mk-input-icon-size);
  --mk-input-textable-padding-x-size: var(--mk-input-padding-x-size);
  --mk-input-textable-padding-y-size: var(--mk-input-padding-y-size);
  --mk-input-textable-placeholder-text-color: var(--mk-input-placeholder-text-color);
  --mk-input-textable-spacing-size: var(--mk-input-spacing-size);

  $this: &;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

  input,
  textarea {
    width: 100%;
    padding: 0;
    font-size: var(--mk-input-textable-text-size);
    line-height: var(--mk-input-textable-line-height);
    color: var(--mk-input-textable-text-color);
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--mk-input-textable-placeholder-text-color);
    }
  }

  textarea {
    resize: none;
  }

  &-input {
    display: flex;
    gap: var(--mk-input-textable-spacing-size);
    align-items: center;
    width: 100%;
    padding: 0 var(--mk-input-textable-padding-x-size);
    background-color: var(--mk-input-textable-background-color);
    border-radius: var(--mk-input-textable-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-textable-border-size) var(--mk-input-textable-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    &-stub {
      display: flex;
      flex: 1 1 100%;
      padding: var(--mk-input-textable-padding-y-size) 0;
    }

    .mk-Icon {
      --mk-icon-size: var(--mk-input-textable-icon-size);
      --mk-icon-color: var(--mk-input-textable-icon-color);
    }
  }

  &-toggleVisibility {
    padding: 0;
    color: currentcolor;

    @include melkor.on-not-disabled {
      @include melkor.expand-click-area;
    }

    .mk-Icon {
      display: block;
    }
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
          background-color: var(--mk-input-textable-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-textable-border-size-hover)
            var(--mk-input-textable-border-color-hover);
        }
      }
    }

    @include melkor.on-focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-textable-border-size-focused)
            var(--mk-input-textable-border-color-focused);
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
    --mk-field-textable-cancel-icon-color: var(--mk-input-textable-icon-color);
    --mk-field-textable-cancel-icon-size: var(--mk-input-textable-icon-size);
  }
}
</style>
