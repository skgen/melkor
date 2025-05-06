<template>
  <label
    ref="rootRef"
    v-theme="theme"
    class="mk-AppInputCheckable"
    :data-is-focused="focused || undefined"
    :data-direction="props.direction"
    v-bind="bindInteractionStateProps(props)"
  >
    <div class="mk-AppInputCheckable-wrapper">
      <AppInputLabel v-if="$slots.label">
        <slot name="label" />
      </AppInputLabel>

      <div class="mk-AppInputCheckable-input">
        <slot
          input-ref="inputRef"
          :hovered="props.hovered || hovered"
          :validate="props.validate"
          :input-name="props.name"
          :disabled="props.disabled"
          :value="props.value"
          :checked="renderChecked"
          :on-change="handleChange"
          :on-focus="onFocus"
          :on-blur="onBlur"
        />
        <span
          v-if="$slots['checked-label'] || $slots['unchecked-label']"
          class="mk-AppInputCheckable-input-stateLabel"
        >
          <slot v-if="renderChecked" name="checked-label" />
          <slot v-else name="unchecked-label" />
        </span>
      </div>
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
import type { InputCheckableEmits, InputCheckableProps, InputCheckableSlots } from '../../features/io/input-checkable';

import { isDefined } from '@skgn/kit';
import { useElementHover } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { computed, ref } from 'vue';

import { useInput } from '../../composables/useInput';
import { useTheme } from '../../composables/useTheme';
import { bindInteractionStateProps } from '../../features/interactions';
import { formatError } from '../../features/utils';
import AppInputError from '../AppInputError/AppInputError.vue';
import AppInputHint from '../AppInputHint/AppInputHint.vue';
import AppInputLabel from '../AppInputLabel/AppInputLabel.vue';

export type Props<TValue = boolean> = InputCheckableProps<TValue>;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  {
    direction: 'vertical',
  },
);

const emit = defineEmits<InputCheckableEmits<TValue>>();

defineSlots<InputCheckableSlots<TValue>>();

const inputRef = ref<HTMLInputElement | null>(null);
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

const checked = computed(() => isDefined(props.checked) ? props.checked : true);
const unchecked = computed(() => isDefined(props.unchecked) ? props.unchecked : false);

const renderChecked = computed(() => isEqual(props.value, checked.value));

function handleChange(event: Event) {
  if (!event.target) {
    return;
  }

  if (renderChecked.value) {
    onChange(unchecked.value as TValue);
  }
  else {
    onChange(checked.value as TValue);
  }
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

.mk-AppInputCheckable {
  --mk-input-checkable-input-spacing-size: var(--mk-size-2);
  --mk-input-checkable-state-label-spacing-size: var(--mk-size-1);
  --mk-input-checkable-input-state-label-color: var(--mk-shade-9);

  $this: &;

  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  vertical-align: top;

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-2);
  }

  &-input {
    position: relative;
    display: flex;
    gap: var(--mk-input-checkable-input-spacing-size);
    align-items: center;

    &-stateLabel {
      display: inline-flex;
      gap: var(--mk-input-checkable-state-label-spacing-size);
      align-items: center;
      color: var(--mk-input-checkable-input-state-label-color);
    }
  }

  &[data-direction='horizontal'] {
    #{$this} {
      &-wrapper {
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
      }
    }
  }
}
</style>
