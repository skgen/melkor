<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Number
    </template>
    <AppStack col>
      <MkCard>
        <AppInputNumber
          v-bind="inputBinding"
          cancelable
          placeholder="0123456789"
          :validate="handleValidate"
          secure
        >
          <template #label>
            <MkIcon icon="heroicons:credit-card-20-solid" /> Number
          </template>
          <template #hint>
            Type your number
          </template>
          <template #leading-icon>
            <MkIcon icon="heroicons:credit-card-20-solid" />
          </template>
        </AppInputNumber>
      </MkCard>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputNumberProps, InputNumberValue } from '#melkor/features';

const inputBinding = reactive(
  useInputBinding<InputNumberProps>({
    value: null,
    valid: false,
  }),
);

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
}
</script>
