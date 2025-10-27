<template>
  <InputTextable
    ref="inputTextable"
    class="mk-InputNumber"
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
    <template #default="{ placeholder, disabled, onChange, value, type, onFocus, onBlur, ref: inputRef, inputName }">
      <input
        :ref="inputRef"
        :name="inputName"
        :type="type ?? 'number'"
        :value="type ? value?.toString() : value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="(event: Event) => {
          if (!event.target) {
            return;
          }
          const { value } = event.target as HTMLInputElement;

          const parsedValue = parseFloat(value.toString().replace(/\D/g, ''));

          if (value === '') {
            onChange(event, null);
          }
          else {
            onChange(event, isNaN(parsedValue) ? null : parsedValue);
          }
        }"
        @focus="onFocus"
        @blur="onBlur"
      >
    </template>
  </InputTextable>
</template>

<script lang="ts">
import type { InputTextableEmits, InputTextableExpose, InputTextableProps, InputTextableSlots } from '#melkor/components';

export type InputNumberValue = number | null;

export type InputNumberProps = InputTextableProps<InputNumberValue>;

export type InputNumberEmits = InputTextableEmits<InputNumberValue>;

export type InputNumberSlots = Omit<InputTextableSlots<InputNumberValue>, 'default'>;

export type InputNumberExpose = InputTextableExpose;
</script>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';

import { InputTextable } from '#melkor/components';

const props = withDefaults(
  defineProps<InputNumberProps>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
  },
);

const emit = defineEmits<InputNumberEmits>();

const slots = defineSlots<InputNumberSlots>();

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

defineExpose<InputNumberExpose>({
  focus,
  blur,
});
</script>
