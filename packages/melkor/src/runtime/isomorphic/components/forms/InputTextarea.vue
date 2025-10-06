<template>
  <InputTextable
    ref="inputTextable"
    class="mk-InputTextarea"
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
    <template v-if="slots['cancel-icon']" #cancel-icon>
      <slot name="cancel-icon" />
    </template>
    <template v-if="slots['leading-icon']" #leading-icon>
      <slot name="leading-icon" />
    </template>
    <template v-if="slots['trailing-icon']" #trailing-icon>
      <slot name="trailing-icon" />
    </template>
    <template #default="{ placeholder, disabled, onChange, value, onFocus, onBlur, ref: inputRef, inputName }">
      <textarea
        :ref="inputRef"
        :name="inputName"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="props.rows"
        @input="(event: Event) => {
          if (!event.target) {
            return;
          }
          const { value } = event.target as HTMLTextAreaElement;

          if (value === '') {
            onChange(event, null);
          }
          else {
            onChange(event, value);
          }
        }"
        @focus="onFocus"
        @blur="onBlur"
      />
    </template>
  </InputTextable>
</template>

<script lang="ts">
import type { InferDefaults } from '../../features';
import type { InputTextableEmits, InputTextableExpose, InputTextableProps, InputTextableSlots } from './InputTextable.vue';

import { inputTextableDefaultProps } from './InputTextable.vue';

export type InputTextareaValue = string | null;

export type InputTextareaProps = Omit<InputTextableProps<InputTextareaValue>, 'secure'> & {
  rows?: number;
};

export type InputTextareaEmits = InputTextableEmits<InputTextareaValue>;

export type InputTextareaSlots = Omit<InputTextableSlots<InputTextareaValue>, 'default'>;

export type InputTextareaExpose = InputTextableExpose;

export const inputTextareaDefaultProps = {
  ...inputTextableDefaultProps,
  rows: 2,
} satisfies InferDefaults<InputTextareaProps>;
</script>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import InputTextable from './InputTextable.vue';

const props = withDefaults(
  defineProps<InputTextareaProps>(),
  inputTextareaDefaultProps,
);

const emit = defineEmits<InputTextareaEmits>();

const slots = defineSlots<InputTextareaSlots>();

const inputTextable = useTemplateRef('inputTextable');

function focus() {
  if (!inputTextable.value) {
    return;
  }

  inputTextable.value.focus();
}

function blur() {
  if (!inputTextable.value) {
    return;
  }
  inputTextable.value.blur();
}

defineExpose<InputTextareaExpose>({
  focus,
  blur,
});
</script>
