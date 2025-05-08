<template>
  <AppInputTextable
    ref="textableRef"
    class="mk-AppInputText"
    v-bind="props"
    @update:value="(value) => emit('update:value', value)"
    @update:valid="(valid) => emit('update:valid', valid)"
    @update:touched="(touched) => emit('update:touched', touched)"
    @update:error="(error) => emit('update:error', error)"
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
    <template #default="{ placeholder, disabled, onChange, value, type, onFocus, onBlur, ref: inputRef, inputName }">
      <input
        :ref="inputRef"
        :name="inputName"
        :fill="fill"
        :type="type ?? 'text'"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="(event: Event) => {
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
      >
    </template>
  </AppInputTextable>
</template>

<script lang="ts" setup>
import type { InputTextableExpose } from '../../features/io/input-textable';

import { ref } from 'vue';

import { inputTextDefaultProps, type InputTextEmits, type InputTextExpose, type InputTextProps, type InputTextSlots } from '../../features/io/input-text';
import AppInputTextable from '../AppInputTextable/AppInputTextable.vue';

export type Props = InputTextProps;
export type Emits = InputTextEmits;
export type Slots = InputTextSlots;
export type Expose = InputTextExpose;

const props = withDefaults(
  defineProps<Props>(),
  inputTextDefaultProps,
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
