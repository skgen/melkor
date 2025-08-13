<template>
  <div class="sk-Home">
    <AppThemeSelectorCheap />

    <AppCard>
      <AppButton>
        Copy
        <AppIcon icon="heroicons:clipboard-document-check" />
      </AppButton>
      <AppButton variant="outline">
        Submit code
        <AppIcon icon="heroicons:command-line" />
      </AppButton>
      <AppButton type="plain">
        Next step
      </AppButton>
      <AppButton type="plain">
        <AppIcon icon="heroicons:camera" />
      </AppButton>
      <AppButton variant="outline" size="tight">
        <AppIcon icon="heroicons:camera" />
      </AppButton>
      <AppButton variant="outline" size="wide">
        <AppIcon icon="heroicons:camera" />
      </AppButton>
    </AppCard>

    <AppCard>
      <AppCard>
        <AppButton size="tight">
          Copy
          <AppIcon icon="heroicons:clipboard-document-check" />
        </AppButton>
        <AppButton variant="outline" size="wide">
          Submit code
          <AppIcon icon="heroicons:command-line" />
        </AppButton>
        <AppButton type="plain">
          Next step
        </AppButton>
        <AppButton type="plain">
          <AppIcon icon="heroicons:camera" />
        </AppButton>
        <AppButton variant="outline">
          <AppIcon icon="heroicons:camera" />
        </AppButton>
      </AppCard>
    </AppCard>

    <AppCard>
      <AppInputText
        v-model="inputTextModel"
        cancelable
        placeholder="Fill me"
        hint="Text me"
        label="Heyyyy"
        fill
      >
        <template #leading-icon>
          <AppIcon icon="heroicons:command-line" />
        </template>
        <template #trailing-icon>
          <AppIcon icon="heroicons:camera" />
        </template>
      </AppInputText>
    </AppCard>

    <!--
    <AppColorPalette />
    <AppColorPalette palette="grey" /> -->
  </div>
</template>

<script lang="ts" setup>
import type { InputTextModel } from '@skgn/melkor/features';

const inputTextModel = ref<InputTextModel>(createInputModel({
  value: 'Hello World',
  valid: false,
  error: 'Blabla',
}));
</script>

<style lang="scss">
.sk-Home {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-4);
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: var(--mk-size-4);
  white-space: pre;

  .mk-AppCard {
    display: flex;
    gap: var(--mk-size-4);
    align-items: center;
  }
}
</style>
