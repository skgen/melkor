<template>
  <label
    v-theme="theme"
    class="mk-AppInputTextable"
    :data-fill="props.fill || undefined"
    :data-type="type"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <AppInputLabel v-if="$slots.label">
      <slot name="label" />
    </AppInputLabel>
    <div class="mk-AppInputTextable-input">
      <span v-if="$slots['leading-icon']" class="mk-AppInputTextable-icon">
        <slot name="leading-icon" />
      </span>

      <div class="mk-AppInputTextable-input-stub">
        <slot
          ref="inputRef"
          :validate="props.validate"
          :input-name="props.name"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :value="props.value"
          :type="type"
          :on-change="handleChange"
          :on-focus="onFocus"
          :on-blur="onBlur"
        />
      </div>

      <AppInputTextableCancel
        v-if="isCancelable"
        :disabled="props.disabled"
        @click.prevent="handleCancel"
      >
        <slot name="cancel-icon" />
      </AppInputTextableCancel>
      <button
        v-if="props.secure"
        class="mk-AppInputTextable-toggleVisibility"
        @click.prevent="handleToggleVisibility"
      >
        <AppIcon :icon="toggleVisibilityIcon" />
      </button>
      <span v-if="$slots['trailing-icon']" class="mk-AppInputTextable-icon">
        <slot name="trailing-icon" />
      </span>
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
import { isValue } from '@skgn/kit';
import { computed, ref } from 'vue';

import { useGlobalConfig } from '../../composables/useGlobalConfig';
import { useInput } from '../../composables/useInput';
import { useTheme } from '../../composables/useTheme';
import { bindInteractionStateProps } from '../../features/interactions';
import { inputTextableDefaultProps, type InputTextableEmits, type InputTextableExpose, type InputTextableProps, type InputTextableSlots } from '../../features/io/input-textable';
import { formatError } from '../../features/utils';
import AppIcon from '../AppIcon/AppIcon.vue';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppInputTextableCancel from '../AppInputTextableCancel/AppInputTextableCancel.vue';

export type Props<TValue> = InputTextableProps<TValue>;
export type Emits<TValue> = InputTextableEmits<TValue>;
export type Slots<TValue> = InputTextableSlots<TValue>;
export type Expose = InputTextableExpose;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  inputTextableDefaultProps,
);

const emit = defineEmits<InputTextableEmits<TValue>>();

defineSlots<Slots<TValue>>();

defineExpose<Expose>({
  focus,
  blur,
});

const inputRef = ref<HTMLInputElement | null>(null);

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
    ? globalConfig.icons.AppInputTextable.passwordToggleVisibility.show
    : globalConfig.icons.AppInputTextable.passwordToggleVisibility.hide),
);

function handleToggleVisibility() {
  isSecure.value = !isSecure.value;
}

function handleCancel() {
  onChange(null as TValue);
  requestAnimationFrame(() => {
    if (!inputRef.value) {
      return;
    }
    inputRef.value.blur();
  });
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

.mk-AppInputTextable {
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

    .mk-AppIcon {
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

    .mk-AppIcon {
      display: block;
    }
  }

  &-icon {
    .mk-AppIcon {
      display: block;
    }
  }

  &[data-fill='true'] {
    @include melkor.mk-fill;
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

  .mk-AppInputTextableCancel {
    --mk-input-textable-cancel-icon-color: var(--mk-input-textable-icon-color);
    --mk-input-textable-cancel-icon-size: var(--mk-input-textable-icon-size);
  }
}
</style>
