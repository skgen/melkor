<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Text
    </template>
    <AppCard>
      <AppInputText
        v-model="inputTextModel"
        cancelable
        placeholder="hello@world.com"
        hint="Type your username"
        label="Username"
        :validate="handleValidate"
      >
        <template #leading-icon>
          <AppIcon icon="heroicons:user-circle-16-solid" />
        </template>
        <template #trailing-icon>
          <AppIcon icon="heroicons:user-circle-16-solid" />
        </template>
      </AppInputText>
    </AppCard>
    <AppCard>
      <AppInputText
        v-model="inputPasswordModel"
        cancelable
        encrypted
        placeholder="Password"
        hint="Type your password"
        label="Password"
      >
        <template #leading-icon>
          <AppIcon icon="heroicons:lock-closed-20-solid" />
        </template>
      </AppInputText>
    </AppCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextModel, InputTextValue } from '@skgn/melkor/features';

const inputTextModel = ref<InputTextModel>(createInputModel({
  value: 'Hello World',
  valid: false,
}));

function handleValidate(value: InputTextValue) {
  if (!value) {
    return 'required';
  }
  if (value.length < 5) {
    return [
      'value must be > 5',
      'dummy error',
    ];
  }
  return null;
}

const inputPasswordModel = ref<InputTextModel>(createInputModel({
  value: 'Azerty123',
  valid: false,
  error: 'Password invalid',
}));
</script>
