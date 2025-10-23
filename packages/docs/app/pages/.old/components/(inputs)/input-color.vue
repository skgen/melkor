<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Input Color
    </template>
    <MkCard>
      <AppStack col>
        <AppStack>
          <MkButton variant="outline" @click="() => color?.focus()">
            Focus
          </MkButton>
          <MkButton variant="outline" @click="() => color?.blur()">
            Blur
          </MkButton>
        </AppStack>
        <AppInputColor
          ref="color"
          v-bind="inputBinding"
          cancelable
          placeholder="#ffff00"
          :validate="handleValidate"
        >
          <template #label>
            <MkIcon icon="heroicons:paint-brush-20-solid" /> Color
          </template>
          <template #hint>
            Type your prefered color
          </template>
        </AppInputColor>
      </AppStack>
    </MkCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputColorExpose, InputColorProps, InputColorValue } from '#melkor/features';

const inputBinding = reactive(useInputBinding<InputColorProps>({
  value: '#f0565b',
  valid: false,
}));

const color = ref<InputColorExpose | null>(null);

function handleValidate(value: InputColorValue) {
  if (!value) {
    return 'required';
  }
}
</script>
