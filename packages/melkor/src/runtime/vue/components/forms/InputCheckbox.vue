<template>
  <InputCheckable
    ref="inputCheckable"
    class="mk-InputCheckbox"
    v-bind="props"
    @update:value="(value) => emit('update:value', value)"
    @update:valid="(valid) => emit('update:valid', valid)"
    @update:touched="(touched) => emit('update:touched', touched)"
    @update:errors="(errors) => emit('update:errors', errors)"
    @focus="() => emit('focus')"
    @blur="() => emit('blur')"
  >
    <template v-if="slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="slots['checked-label']" #checked-label>
      <slot name="checked-label" />
    </template>
    <template v-if="slots['unchecked-label']" #unchecked-label>
      <slot name="unchecked-label" />
    </template>
    <template
      #default="{
        disabled,
        onChange,
        checked,
        onFocus,
        onBlur,
        ref: inputRef,
        inputName,
        hovered,
        focused,
      }"
    >
      <input
        :ref="inputRef"
        :name="inputName"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        @input="onChange"
        @focus="(event: Event) => {
          const target = event.target as HTMLInputElement | null;
          if (target?.matches(':focus-visible') || syntheticFocus) {
            syntheticFocus = false;
            onFocus();
          }
        }"
        @blur="onBlur"
      >
      <Checkbox
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
        :focused="focused"
      >
        <slot name="checked-icon" />
      </Checkbox>
    </template>
  </InputCheckable>
</template>

<script lang="ts">
import type { Slot } from 'vue';

import type { InferDefaults } from '../../features';
import type { InputCheckableEmits, InputCheckableExpose, InputCheckableProps, InputCheckableSlots } from './InputCheckable.vue';

import { inputCheckableDefaultProps } from './InputCheckable.vue';

export type InputCheckboxProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputCheckboxEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputCheckboxSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'> & {
  'checked-icon'?: Slot;
};

export type InputCheckboxExpose = InputCheckableExpose;

export const inputCheckboxDefaultProps = { ...inputCheckableDefaultProps } satisfies InferDefaults<InputCheckboxProps<any>>;
</script>

<script lang="ts" setup generic="TValue = boolean">
import { ref, useTemplateRef } from 'vue';

import Checkbox from '../Checkbox.vue';
import InputCheckable from './InputCheckable.vue';

const props = withDefaults(
  defineProps<InputCheckboxProps<TValue>>(),
  inputCheckboxDefaultProps,
);

const emit = defineEmits<InputCheckboxEmits<TValue>>();

const slots = defineSlots<InputCheckboxSlots<TValue>>();

defineExpose<InputCheckboxExpose>({
  focus,
  blur,
});

const inputCheckable = useTemplateRef<InputCheckableExpose>('inputCheckable');
const syntheticFocus = ref(false);

function focus() {
  if (!inputCheckable.value) {
    return;
  }

  syntheticFocus.value = true;
  inputCheckable.value.focus();
}

function blur() {
  if (!inputCheckable.value) {
    return;
  }
  syntheticFocus.value = false;
  inputCheckable.value.blur();
}
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputCheckbox {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
