<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Text
    </template>

    <AppCard>
      <AppStack col>
        <AppStack>
          <AppButton variant="outline" @click="() => text?.focus()">
            Focus
          </AppButton>
          <AppButton variant="outline" @click="() => text?.blur()">
            Blur
          </AppButton>
        </AppStack>
        <AppInputText
          ref="text"
          v-bind="inputTextBinding"
          cancelable
          placeholder="Username"
          :validate="handleValidate"
        >
          <template #label>
            <AppIcon icon="heroicons:user-circle-16-solid" /> Username
          </template>
          <template #hint>
            Type your username
          </template>
          <template #trailing-icon>
            <AppIcon icon="heroicons:user-circle-16-solid" />
          </template>
        </AppInputText>
      </AppStack>
    </AppCard>
    <AppCard>
      <AppInputText
        v-bind="inputPasswordBinding"
        cancelable
        secure
        placeholder="Password"
      >
        <template #label>
          <AppIcon icon="heroicons:lock-closed-20-solid" /> Password
        </template>
        <template #hint>
          Type your password
        </template>
        <template #leading-icon>
          <AppIcon icon="heroicons:lock-closed-20-solid" />
        </template>
      </AppInputText>
    </AppCard>
    <AppCard>
      <AppInputText
        v-bind="inputPasswordBinding"
        cancelable
        placeholder="disabled@disabled.com"
        disabled
        secure
      >
        <template #label>
          <AppIcon icon="heroicons:no-symbol-20-solid" /> Disabled
        </template>
        <template #hint>
          I'm disabled
        </template>
      </AppInputText>
    </AppCard>
    <AppCard>
      <AppComponentProps name="AppInputText" />
    </AppCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextExpose, InputTextProps, InputTextValue } from '#melkor/features';

const inputTextBinding = reactive(
  useInputBinding<InputTextProps>({
    value: 'Hello world',
  }),
);

const text = ref<InputTextExpose | null>(null);

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
}

const inputPasswordBinding = reactive(
  useInputBinding<InputTextProps>({
    value: 'Azerty123',
    valid: false,
    errors: ['Password invalid'],
  }),
);
</script>
