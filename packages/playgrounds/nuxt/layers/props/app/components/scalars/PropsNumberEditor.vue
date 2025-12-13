<template>
  <MkInputNumber :value="props.value" @update:value="onChange" @keydown="preventEmptyInput" />
</template>

<script lang="ts" setup>
import { isNil } from 'lodash-es';

type Props = {
  value: number;
};

type Emits = {
  'update:value': [newValue: number];
};

const props = withDefaults(
  defineProps<Props>(),
  {
    value: 0,
  },
);
const emits = defineEmits<Emits>();

function onChange(newValue: number | null) {
  if (!isNil(newValue)) {
    emits('update:value', newValue);
  }
}
</script>
