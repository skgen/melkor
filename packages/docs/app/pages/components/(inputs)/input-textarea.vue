<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Textarea
    </template>

    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => textarea?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => textarea?.blur()">
            Blur
          </AppButton>
        </AppStack>
        <AppInputTextarea
          ref="textarea"
          v-bind="inputBinding"
          cancelable
          placeholder="Username"
          :validate="handleValidate"
          :rows="4"
        >
          <template #trailing-icon>
            <AppIcon icon="heroicons:user-circle-16-solid" />
          </template>
          <template #leading-icon>
            <AppIcon icon="heroicons:user-circle-16-solid" />
          </template>
          <template #label>
            <AppIcon icon="heroicons:user-circle-16-solid" /> Username
          </template>
          <template #hint>
            Type your username
          </template>
        </AppInputTextarea>
      </AppStack>
    </AppCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextareaExpose, InputTextareaProps, InputTextareaValue } from '#melkor/features';

const inputBinding = reactive(
  useInputBinding<InputTextareaProps>({
    value: 'Hello world',
  }),
);

const textarea = ref<InputTextareaExpose | null>(null);

function handleValidate(value: InputTextareaValue) {
  if (!value) {
    return 'required';
  }
  if (value.length < 5) {
    return [
      'value must be > 5',
      'dummy error',
    ];
  }
}
</script>
