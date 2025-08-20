<template>
  <AppInputTextable
    ref="textableRef"
    class="mk-AppInputTextarea"
    v-bind="props"
    @update:value="(value) => emit('update:value', value)"
    @update:valid="(valid) => emit('update:valid', valid)"
    @update:touched="(touched) => emit('update:touched', touched)"
    @update:errors="(errors) => emit('update:errors', errors)"
    @focus="() => emit('focus')"
    @blur="() => emit('blur')"
  >
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="$slots['cancel-icon']" #cancel-icon>
      <slot name="cancel-icon" />
    </template>
    <template v-if="$slots['leading-icon']" #leading-icon>
      <slot name="leading-icon" />
    </template>
    <template v-if="$slots['trailing-icon']" #trailing-icon>
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
  </AppInputTextable>
</template>

<script lang="ts" setup>
import type { InputTextableExpose } from '../../features/io/input-textable';

import { ref } from 'vue';

import { inputTextareaDefaultProps, type InputTextareaEmits, type InputTextareaExpose, type InputTextareaProps, type InputTextareaSlots } from '../../features/io/input-textarea';
import AppInputTextable from '../AppInputTextable/AppInputTextable.vue';

export type Props = InputTextareaProps;
export type Emits = InputTextareaEmits;
export type Slots = InputTextareaSlots;
export type Expose = InputTextareaExpose;

const props = withDefaults(
  defineProps<Props>(),
  inputTextareaDefaultProps,
);
const emit = defineEmits<Emits>();

defineSlots<Slots>();

defineExpose<Expose>({
  focus,
  blur,
});

const textableRef = ref<InputTextableExpose | null>(null);

function focus() {
  if (!textableRef.value) {
    return;
  }

  textableRef.value.focus();
}

function blur() {
  if (!textableRef.value) {
    return;
  }
  textableRef.value.blur();
}
</script>
