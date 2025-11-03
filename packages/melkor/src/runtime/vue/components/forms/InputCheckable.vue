<template>
  <label
    ref="rootElement"
    v-theme="theme"
    class="mk-InputCheckable"
    :data-direction="props.direction"
    v-bind="bindInteractionStateProps({
      ...props,
      focused,
    })"
  >
    <div class="mk-InputCheckable-wrapper">
      <FieldLabel v-if="slots.label">
        <slot name="label" />
      </FieldLabel>

      <div class="mk-InputCheckable-input">
        <slot
          ref="input"
          :hovered="props.hovered || hovered"
          :validate="props.validate"
          :input-name="props.name"
          :disabled="props.disabled"
          :value="props.value"
          :checked="renderChecked"
          :focused="focused"
          :on-change="handleChange"
          :on-focus="onFocus"
          :on-blur="onBlur"
        />
        <span
          v-if="slots['checked-label'] || slots['unchecked-label']"
          class="mk-InputCheckable-input-stateLabel"
        >
          <slot v-if="renderChecked" name="checked-label" />
          <slot v-else name="unchecked-label" />
        </span>
      </div>
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

export type InputCheckableProps<TValue = boolean> = InputProps<TValue> & {
  checked?: TValue;
  unchecked?: TValue;
  direction?: 'horizontal' | 'vertical';
};

export type InputCheckableEmits<TValue = boolean> = InputEmits<TValue>;

export type InputCheckableSlots<TValue = boolean> = InputSlots & {
  'default'?: Slot<{
    ref: VNodeRef;
    hovered: boolean;
    validate: InputCheckableProps<TValue>['validate'];
    inputName: InputCheckableProps<TValue>['name'];
    disabled: InputCheckableProps<TValue>['disabled'];
    value: InputCheckableProps<TValue>['value'];
    checked: boolean;
    focused: boolean;
    onChange: (event: Event) => void;
    onFocus: () => void;
    onBlur: () => void;
  }>;
  'checked-label'?: Slot;
  'unchecked-label'?: Slot;
};

export type InputCheckableExpose = InputExpose;
</script>

<script lang="ts" setup generic="TValue">
import { isDefined } from '@skgn/kit';
import { useElementHover } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { computed, useTemplateRef } from 'vue';

import { FieldError, FieldHint, FieldLabel } from '../../components';
import { useInput, useInputErrors, useTheme } from '../../composables';
import { bindInteractionStateProps } from '../../features';

const props = withDefaults(
  defineProps<InputCheckableProps<TValue>>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    direction: 'vertical',
  },
);

const emit = defineEmits<InputCheckableEmits<TValue>>();

const slots = defineSlots<InputCheckableSlots<TValue>>();

const input = useTemplateRef<InputExpose>('input');
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

defineExpose<InputCheckableExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputCheckable {
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
