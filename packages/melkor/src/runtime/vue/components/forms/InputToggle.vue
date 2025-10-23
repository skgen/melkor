<template>
  <InputCheckable
    ref="inputCheckable"
    class="mk-InputToggle"
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
      <Toggle
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
        :focused="focused"
      />
    </template>
  </InputCheckable>
</template>

<script lang="ts">
import type { InputCheckableEmits, InputCheckableExpose, InputCheckableProps, InputCheckableSlots } from '#melkor/components/forms/InputCheckable.vue';
import type { InferDefaults } from '#melkor/features';

import { inputCheckableDefaultProps } from '#melkor/components/forms/InputCheckable.vue';

export type InputToggleProps<TValue = boolean> = InputCheckableProps<TValue>;

export type InputToggleEmits<TValue = boolean> = InputCheckableEmits<TValue>;

export type InputToggleSlots<TValue = boolean> = Omit<InputCheckableSlots<TValue>, 'default'>;

export type InputToggleExpose = InputCheckableExpose;

export const inputToggleDefaultProps = { ...inputCheckableDefaultProps } satisfies InferDefaults<InputToggleProps<any>>;
</script>

<script lang="ts" setup generic="TValue">
import { ref, useTemplateRef } from 'vue';

import InputCheckable from '#melkor/components/forms/InputCheckable.vue';
import Toggle from '#melkor/components/Toggle.vue';

const props = withDefaults(
  defineProps<InputToggleProps<TValue>>(),
  inputToggleDefaultProps,
);

const emit = defineEmits<InputToggleEmits<TValue>>();

const slots = defineSlots<InputToggleSlots>();

const inputCheckable = useTemplateRef('inputCheckable');
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

defineExpose<InputToggleExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputToggle {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
