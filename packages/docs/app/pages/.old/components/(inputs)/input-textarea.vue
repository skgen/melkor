<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Textarea
    </template>

    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => textarea?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => textarea?.blur()">
            Blur
          </MkButton>
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
            <MkIcon icon="heroicons:user-circle-16-solid" />
          </template>
          <template #leading-icon>
            <MkIcon icon="heroicons:user-circle-16-solid" />
          </template>
          <template #label>
            <MkIcon icon="heroicons:user-circle-16-solid" /> Username
          </template>
          <template #hint>
            Type your username
          </template>
        </AppInputTextarea>
      </AppStack>
    </MkCard>
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
