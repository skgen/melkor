<template>
  <AppInputCheckable
    ref="checkableRef"
    class="mk-AppInputCheckbox"
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
    <template v-if="$slots['checked-label']" #checked-label>
      <slot name="checked-label" />
    </template>
    <template v-if="$slots['unchecked-label']" #unchecked-label>
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
      <AppCheckbox
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
        :focused="focused"
      >
        <slot name="checked-icon" />
      </AppCheckbox>
    </template>
  </AppInputCheckable>
</template>

<script lang="ts" setup generic="TValue = boolean">
import type { InputCheckableExpose } from '../../features/io/input-checkable';

import { ref } from 'vue';

import { inputCheckboxDefaultProps, type InputCheckboxEmits, type InputCheckboxExpose, type InputCheckboxProps, type InputCheckboxSlots } from '../../features/io/input-checkbox';
import AppCheckbox from '../AppCheckbox/AppCheckbox.vue';
import AppInputCheckable from '../AppInputCheckable/AppInputCheckable.vue';

export type Props<TValue> = InputCheckboxProps<TValue>;
export type Emits<TValue> = InputCheckboxEmits<TValue>;
export type Slots<TValue> = InputCheckboxSlots<TValue>;
export type Expose = InputCheckboxExpose;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  inputCheckboxDefaultProps,
);

const emit = defineEmits<Emits<TValue>>();

defineSlots<Slots<TValue>>();

defineExpose<Expose>({
  focus,
  blur,
});

const checkableRef = ref<InputCheckableExpose | null>(null);
const syntheticFocus = ref(false);

function focus() {
  if (!checkableRef.value) {
    return;
  }

  syntheticFocus.value = true;
  checkableRef.value.focus();
}

function blur() {
  if (!checkableRef.value) {
    return;
  }
  syntheticFocus.value = false;
  checkableRef.value.blur();
}
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputCheckbox {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
