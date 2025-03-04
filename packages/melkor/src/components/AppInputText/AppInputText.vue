<template>
  <div
    v-theme="theme"
    class="mk-AppInputText"
    :data-is-focused="focused || undefined"
    :data-fill="props.fill || undefined"
    :data-is-disabled="props.disabled || undefined"
  >
    <label>
      <AppInputLabel v-if="props.label">
        {{ props.label }}
      </AppInputLabel>
      <div class="mk-AppInputText-input">
        <span v-if="$slots['leading-icon']" class="mk-AppInputText-icon">

          <slot name="leading-icon" />
        </span>
        <input
          ref="textInput"
          :name="props.name"
          :type="type"
          :value="model.value"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          @input="handleChange"
          @focus="onFocus"
          @blur="onBlur"
        >
        <AppInputTextableCancel
          v-if="isCancelable"
          :disabled="props.disabled"
          @click="handleCancel"
        >
          <slot name="cancel" />
        </AppInputTextableCancel>
        <button
          v-if="props.password"
          class="mk-AppInputText-toggleVisibility"
          :disabled="props.disabled"
          @click="handleToggleVisibility"
        >
          <AppIcon :icon="toggleVisibilityIcon" />
        </button>
        <span v-if="$slots['trailing-icon']" class="mk-AppInputText-icon">

          <slot name="trailing-icon" />
        </span>
      </div>
    </label>
    <AppInputHint v-if="props.hint">
      {{ props.hint }}
    </AppInputHint>
    <AppInputError v-if="model.error">
      {{ model.error }}
    </AppInputError>
  </div>
</template>

<script lang="ts" setup>
import type { InputTextEmits, InputTextProps, InputTextValue } from '../../types';
import { computed, ref } from 'vue';
import { useGlobalConfig, useInput, useTheme } from '../../composables';
import { isValue } from '../../features';
import AppIcon from '../AppIcon/AppIcon.vue';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppInputTextableCancel from '../AppInputTextableCancel/AppInputTextableCancel.vue';

const props = defineProps<InputTextProps>();
const emit = defineEmits<InputTextEmits>();

const textInput = ref<HTMLInputElement | null>(null);

const theme = useTheme();
const globalConfig = useGlobalConfig();

const {
  onChange,
  onFocus,
  onBlur,
  model,
  focused,
} = useInput<InputTextValue>({
  props: computed(() => props),
  emit,
});

function handleChange(evt: Event) {
  if (!evt.target) {
    return;
  }
  const { value } = evt.target as HTMLInputElement;

  if (value === '') {
    onChange(null);
  }
  else {
    onChange(value);
  }
}

const isCancelable = computed(() => props.cancelable && isValue(model.value.value));
const isEncrypted = ref(true);

const type = computed(() => {
  if (props.password && isEncrypted.value) {
    return 'password';
  }
  return 'text';
});

const toggleVisibilityIcon = computed(() =>
  (type.value === 'password'
    ? globalConfig.icons.AppInputText.passwordToggleVisibility.show
    : globalConfig.icons.AppInputText.passwordToggleVisibility.hide),
);

function handleToggleVisibility() {
  isEncrypted.value = !isEncrypted.value;
}

function handleCancel() {
  onChange(null);
  requestAnimationFrame(() => {
    if (!textInput.value) {
      return;
    }
    textInput.value.blur();
  });
}

function focus() {
  if (!textInput.value) {
    return;
  }
  textInput.value.focus();
}

function blur() {
  if (!textInput.value) {
    return;
  }
  textInput.value.blur();
}

defineExpose({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputText {
  --mk-input-text-background-color: var(--mk-input-background-color);
  --mk-input-text-border-color: var(--mk-input-border-color);
  --mk-input-text-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-text-border-color-active: var(--mk-input-border-color-active);
  --mk-input-text-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-text-border-size: var(--mk-input-border-size);
  --mk-input-text-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-text-border-size-active: var(--mk-input-border-size-active);
  --mk-input-text-text-color: var(--mk-input-text-color);
  --mk-input-text-text-size: var(--mk-input-text-size);
  --mk-input-text-line-height: var(--mk-input-line-height);
  --mk-input-text-icon-color: var(--mk-input-icon-color);
  --mk-input-text-icon-size: var(--mk-input-icon-size);
  --mk-input-text-padding-x-size: var(--mk-input-padding-x-size);
  --mk-input-text-padding-y-size: var(--mk-input-padding-y-size);
  --mk-input-text-placeholder-color: var(--mk-input-placeholder-color);
  --mk-input-text-spacing-size: var(--mk-input-spacing-size);

  $this: &;

  display: inline-block;

  input {
    width: 100%;
    padding: var(--mk-input-text-padding-y-size) 0;
    font-size: var(--mk-input-text-text-size);
    line-height: var(--mk-input-text-line-height);
    color: var(--mk-input-text-text-color);
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: var(--mk-input-text-placeholder-color);
    }
  }

  &-input {
    display: flex;
    gap: var(--mk-input-text-spacing-size);
    align-items: center;
    width: 100%;
    padding: 0 var(--mk-input-text-padding-x-size);
    background-color: var(--mk-input-text-background-color);
    border-radius: var(--mk-input-text-border-radius-size);
    box-shadow: inset 0 0 0.01px var(--mk-input-text-border-size) var(--mk-input-text-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    .mk-AppIcon {
      --mk-icon-size: var(--mk-input-text-icon-size);
      --mk-icon-color: var(--mk-input-text-icon-color);
    }
  }

  &-toggleVisibility {
    padding: 0;
    color: currentcolor;

    @include melkor.not-disabled {
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

  @include melkor.not-disabled {
    &:hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-text-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-text-border-size-hover) var(--mk-input-text-border-color-hover);
        }
      }
    }

    @include melkor.focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-text-border-size-active) var(--mk-input-text-border-color-active);
        }
      }
    }
  }

  @include melkor.disabled {
    #{$this} {
      &-input {
        opacity: var(--mk-input-opacity-disabled);
      }
    }
  }

  .mk-AppInputLabel {
    display: block;
    margin-bottom: var(--mk-size-2);
  }

  .mk-AppInputHint {
    display: block;
    margin-top: var(--mk-size-2);
  }

  .mk-AppInputError {
    display: block;
    margin-top: var(--mk-size-2);
  }

  .mk-AppInputTextableCancel {
    --mk-input-textable-cancel-icon-color: var(--mk-input-text-icon-color);
    --mk-input-textable-cancel-icon-size: var(--mk-input-text-icon-size);
  }
}
</style>
