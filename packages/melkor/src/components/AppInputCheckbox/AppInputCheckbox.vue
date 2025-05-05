<template>
  <AppInputCheckable
    class="mk-AppInputCheckbox"
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
      <AppCheckbox
        :checked="checked"
        :disabled="disabled"
        :hovered="hovered"
      >
        <slot name="checked-icon" />
      </AppCheckbox>
    </template>
  </AppInputCheckable>
</template>

<script lang="ts" setup generic="TValue">
import type { InputCheckboxEmits, InputCheckboxProps, InputCheckboxSlots } from '../../features';

import AppCheckbox from '../AppCheckbox/AppCheckbox.vue';
import AppInputCheckable from '../AppInputCheckable/AppInputCheckable.vue';

export type Props<TValue = boolean> = InputCheckboxProps<TValue>;
type Emits<TValue> = InputCheckboxEmits<TValue>;

const props = withDefaults(
  defineProps<Props<TValue>>(),
  {
    direction: 'vertical',
  },
);
const emit = defineEmits<Emits<TValue>>();
defineSlots<InputCheckboxSlots>();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputCheckbox {
  input {
    @include melkor.a11y-hidden;
  }
}
</style>
