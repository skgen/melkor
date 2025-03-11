<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Color
    </template>
    <AppCard>
      <AppInputColor
        v-model="inputColorModel"
        cancelable
        placeholder="#ffff00"
        hint="Type your prefered color"
        label="Color"
        :validate="handleValidate"
      />
    </AppCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputColorModel, InputColorValue } from '@skgn/melkor/features';

const inputColorModel = ref<InputColorModel>(createInputModel({
  value: '#ff0000',
  valid: false,
}));

function handleValidate(value: InputColorValue) {
  if (!value) {
    return 'required';
  }
  return null;
}
</script>
