<template>
  <MkInputText :value="props.value" @update:value="onChange" @keydown="preventEmptyInput" />
</template>

<script lang="ts" setup>
import { isNil } from 'lodash-es';

type Props = {
  value: string;
};

type Emits = {
  'update:value': [newValue: string];
};

const props = withDefaults(
  defineProps<Props>(),
  {
    value: 'Default value',
  },
);
const emits = defineEmits<Emits>();

function onChange(newValue: string | null) {
  if (!isNil(newValue)) {
    emits('update:value', newValue);
  }
}
</script>
