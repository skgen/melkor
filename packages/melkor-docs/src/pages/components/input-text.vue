<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Text
    </template>
    <div class="sk-TheComponentInputTextView">
      <div class="sk-TheComponentInputTextView-content">
        <AppCard>
          <AppInputText
            v-model="inputTextModel"
            cancelable
            placeholder="hello@world.com"
            hint="Type your username"
            label="Username"
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
            password
            placeholder="Password"
            hint="Type your password"
            label="Password"
          >
            <template #leading-icon>
              <AppIcon icon="heroicons:lock-closed-20-solid" />
            </template>
          </AppInputText>
        </AppCard>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextModel } from '@skgn/melkor/types';

const inputTextModel = ref<InputTextModel>(createInputModel({
  value: 'Hello World',
  valid: false,
  error: 'Blabla',
}));

const inputPasswordModel = ref<InputTextModel>(createInputModel({
  value: 'Azerty123',
  valid: false,
  error: 'Password invalid',
}));
</script>

<style lang="scss">
.sk-TheComponentInputTextView {
  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
