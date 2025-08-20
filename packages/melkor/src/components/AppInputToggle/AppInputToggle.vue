<template>
  <AppInputCheckable
    ref="checkableRef"
    class="mk-AppInputToggle"
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
      <AppToggle
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
        :focused="focused"
      />
    </template>
  </AppInputCheckable>
</template>

<script lang="ts" setup generic="TValue">
import type { InputCheckableExpose } from '../../features/io/input-checkable';

import { ref } from 'vue';

import { inputToggleDefaultProps, type InputToggleEmits, type InputToggleExpose, type InputToggleProps, type InputToggleSlots } from '../../features/io/input-toggle';
import AppInputCheckable from '../AppInputCheckable/AppInputCheckable.vue';
import AppToggle from '../AppToggle/AppToggle.vue';

export type Props<TValue> = InputToggleProps<TValue>;
export type Emits<TValue> = InputToggleEmits<TValue>;
export type Slots<TValue> = InputToggleSlots<TValue>;
export type Expose = InputToggleExpose;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  inputToggleDefaultProps,
);
const emit = defineEmits<Emits<TValue>>();

defineSlots<InputToggleSlots>();

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

.mk-AppInputToggle {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
