<template>
  <div
    v-theme="theme"
    class="mk-AppInputTextable"
    :data-is-focused="focused || undefined"
    :data-fill="props.fill || undefined"
    :data-is-disabled="props.disabled || undefined"
    :data-type="type"
  >
    <label>
      <AppInputLabel v-if="props.label">
        {{ props.label }}
      </AppInputLabel>
      <div class="mk-AppInputTextable-input">
        <span v-if="$slots['leading-icon']" class="mk-AppInputTextable-icon">
          <slot name="leading-icon" />
        </span>

        <slot
          input-ref="inputRef"
          :validate="props.validate"
          :input-name="props.name"
          :hint="props.hint"
          :label="props.label"
          :disabled="props.disabled"
          :fill="props.fill"
          :placeholder="props.placeholder"
          :cancelable="props.cancelable"
          :encrypted="props.encrypted"
          :focused="focused"
          :model="model"
          :type="type"
          :on-change="handleChange"
          :on-focus="onFocus"
          :on-blur="onBlur"
        />

        <AppInputTextableCancel
          v-if="isCancelable"
          :disabled="props.disabled"
          @click="handleCancel"
        >
          <slot name="cancel" />
        </AppInputTextableCancel>
        <button
          v-if="props.encrypted"
          class="mk-AppInputTextable-toggleVisibility"
          @click="handleToggleVisibility"
        >
          <AppIcon :icon="toggleVisibilityIcon" />
        </button>
        <span v-if="$slots['trailing-icon']" class="mk-AppInputTextable-icon">
          <slot name="trailing-icon" />
        </span>
      </div>
    </label>
    <AppInputHint v-if="props.hint">
      {{ props.hint }}
    </AppInputHint>
    <AppInputError v-if="model.error">
      {{ formatError(model.error) }}
    </AppInputError>
  </div>
</template>

<script lang="ts" setup generic="TValue">
import type { InputTextableEmits, InputTextableProps } from '../../features';
import { computed, ref } from 'vue';
import { useGlobalConfig, useInput, useTheme } from '../../composables';
import { formatError, isValue } from '../../features';
import AppIcon from '../AppIcon/AppIcon.vue';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';
import AppInputTextableCancel from '../AppInputTextableCancel/AppInputTextableCancel.vue';

export type Props<TValue> = InputTextableProps<TValue>;

const props = defineProps<Props<TValue>>();
const emit = defineEmits<InputTextableEmits<TValue>>();

const inputRef = ref<HTMLInputElement | null>(null);

const theme = useTheme();
const globalConfig = useGlobalConfig();

const {
  onChange,
  onFocus,
  onBlur,
  model,
  focused,
} = useInput<TValue>({
  props: computed(() => props),
  emit,
});

function handleChange(evt: Event, newValue: TValue) {
  onChange(newValue);
}

const isCancelable = computed(() => props.cancelable && isValue(model.value.value) && !props.disabled);
const isEncrypted = ref(true);

const type = computed(() => {
  if (props.encrypted && isEncrypted.value) {
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
  isEncrypted.value = !isEncrypted.value;
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

defineExpose({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputTextable {
  --mk-input-textable-background-color: var(--mk-input-background-color);
  --mk-input-textable-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-textable-border-color: var(--mk-input-border-color);
  --mk-input-textable-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-textable-border-color-active: var(--mk-input-border-color-active);
  --mk-input-textable-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-textable-border-size: var(--mk-input-border-size);
  --mk-input-textable-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-textable-border-size-active: var(--mk-input-border-size-active);
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

  display: inline-block;

  input {
    width: 100%;
    padding: var(--mk-input-textable-padding-y-size) 0;
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
          box-shadow: inset 0 0 0.01px var(--mk-input-textable-border-size-active)
            var(--mk-input-textable-border-color-active);
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
    --mk-input-textable-cancel-icon-color: var(--mk-input-textable-icon-color);
    --mk-input-textable-cancel-icon-size: var(--mk-input-textable-icon-size);
  }
}
</style>
