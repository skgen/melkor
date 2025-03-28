<template>
  <AppInputTextable
    class="mk-AppInputText"
    v-bind="props"
    @update:model-value="(model: InputTextModel) => emit('update:model-value', model)"
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
    <template #default="{ placeholder, disabled, onChange, model, type, onFocus, onBlur, inputRef, inputName, fill }">
      <input
        :ref="inputRef"
        :name="inputName"
        :fill="fill"
        :type="type ?? 'text'"
        :value="model.value"
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
import type { InputTextEmits, InputTextModel, InputTextProps } from '../../features';
import AppInputTextable from '../AppInputTextable/AppInputTextable.vue';

export type Props = InputTextProps;

const props = defineProps<Props>();
const emit = defineEmits<InputTextEmits>();
</script>
