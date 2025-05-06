<template>
  <AppInputCheckable
    class="mk-AppInputToggle"
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
        inputRef,
        inputName,
        hovered,
      }"
    >
      <input
        :ref="inputRef"
        :name="inputName"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
      <AppToggle
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
      />
    </template>
  </AppInputCheckable>
</template>

<script lang="ts" setup generic="TValue">
import type { InputToggleEmits, InputToggleProps, InputToggleSlots } from '../../features/io/input-toggle';

import AppInputCheckable from '../AppInputCheckable/AppInputCheckable.vue';
import AppToggle from '../AppToggle/AppToggle.vue';

export type Props<TValue = boolean> = InputToggleProps<TValue>;
type Emits<TValue> = InputToggleEmits<TValue>;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  {
    direction: 'vertical',
  },
);
const emit = defineEmits<Emits<TValue>>();

defineSlots<InputToggleSlots>();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputToggle {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
