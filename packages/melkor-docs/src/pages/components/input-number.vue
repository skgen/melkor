<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Number
    </template>
    <AppStack col>
      <AppCard>
        <AppInputNumber
          v-model="inputNumberModel"
          cancelable
          placeholder="0123456789"
          hint="Type your number"
          label="Number"
          :validate="handleValidate"
          encrypted
        >
          <template #leading-icon>
            <AppIcon icon="heroicons:credit-card-20-solid" />
          </template>
        </AppInputNumber>
      </AppCard>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputNumberModel, InputNumberValue } from '@skgn/melkor/features';

const inputNumberModel = ref<InputNumberModel>(createInputModel({
  value: null,
  valid: false,
}));

function handleValidate(value: InputNumberValue) {
  if (value === null) {
    return 'required';
  }
  if (value < 5) {
    return 'value must be > 5';
  }
  if (value > 10) {
    return 'value must be < 10';
  }
  return null;
}
</script>
