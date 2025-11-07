<template>
  <InputTextable
    ref="inputTextable"
    class="mk-InputText"
    v-bind="props"
    @update:value="(value) => emit('update:value', value)"
    @update:valid="(valid) => emit('update:valid', valid)"
    @update:touched="(touched) => emit('update:touched', touched)"
    @update:errors="(errors) => emit('update:errors', errors)"
    @focus="(event) => emit('focus', event)"
    @blur="(event) => emit('blur', event)"
    @keydown="(event) => emit('keydown', event)"
    @keyup="(event) => emit('keyup', event)"
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
    <template #default="{ placeholder, disabled, value, type, ref: inputRef, inputName, onChange, onFocus, onBlur, onKeyDown, onKeyUp }">
      <input
        :ref="inputRef"
        :name="inputName"
        :type="type ?? 'text'"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="(event) => {
          if (!event.target) {
            return;
          }
          const { value } = event.target as HTMLInputElement;

          if (value === '') {
            onChange(event, null);
          }
          else {
            onChange(event, value);
          }
        }"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
      >
    </template>
  </InputTextable>
</template>

<script lang="ts">
import type { InputTextableEmits, InputTextableExpose, InputTextableProps, InputTextableSlots } from '../../components';

export type InputTextValue = string | null;

export type InputTextProps = InputTextableProps<InputTextValue>;

export type InputTextEmits = InputTextableEmits<InputTextValue>;

export type InputTextSlots = Omit<InputTextableSlots<InputTextValue>, 'default'>;

export type InputTextExpose = InputTextableExpose;
</script>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { InputTextable } from '../../components';

const props = withDefaults(
  defineProps<InputTextProps>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    validateOn: () => ['dirty'],
  },
);

const emit = defineEmits<InputTextEmits>();

const slots = defineSlots<InputTextSlots>();

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

defineExpose<InputTextExpose>({
  focus,
  blur,
});
</script>
