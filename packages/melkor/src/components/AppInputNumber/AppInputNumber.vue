<template>
  <AppInputTextable
    class="mk-AppInputNumber"
    v-bind="props"
    @update:model-value="(model: InputNumberModel) => emit('update:model-value', model)"
  >
    <template v-if="$slots.cancel" #cancel>
      <slot name="cancel" />
    </template>
    <template v-if="$slots['leading-icon']" #leading-icon>
      <slot name="leading-icon" />
    </template>
    <template v-if="$slots['trailing-icon']" #trailing-icon>
      <slot name="trailing-icon" />
    </template>
    <template #default="{ placeholder, disabled, onChange, model, type, onFocus, onBlur, inputRef, inputName }">
      <input
        :ref="inputRef"
        :name="inputName"
        :type="type ?? 'number'"
        :value="type ? model.value?.toString() : model.value"
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
  </AppInputTextable>
</template>

<script lang="ts" setup>
import type { InputNumberEmits, InputNumberModel, InputNumberProps } from '../../features';
import AppInputTextable from '../AppInputTextable/AppInputTextable.vue';

const props = defineProps<InputNumberProps>();
const emit = defineEmits<InputNumberEmits>();
</script>
