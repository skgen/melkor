<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Convertor
    </template>
    <AppCard>
      <AppStack col>
        <AppStack align="center">
          <span>HSL</span>
          <AppInputText v-model="model" />
        </AppStack>
        <AppStack align="center">
          <span>OKLCH</span>
          <AppInputText v-model="toOklch" disabled />
        </AppStack>
        <AppColorPalette
          palette="Shades"
          :colors="[
            [
              `var(--mk-shade-0)`,
              `var(--mk-shade-1)`,
              `var(--mk-shade-2)`,
              `var(--mk-shade-3)`,
              `var(--mk-shade-4)`,
              `var(--mk-shade-5)`,
              `var(--mk-shade-6)`,
              `var(--mk-shade-7)`,
              `var(--mk-shade-8)`,
              `var(--mk-shade-9)`,
              `var(--mk-shade-10)`,
            ],
          ]"
        />
        <AppColorPalette
          palette="Others"
          size="large"
          :colors="[
            [
              `var(--mk-primary)`,
              `var(--mk-on-primary)`,
              `var(--mk-success)`,
              `var(--mk-error)`,
              `var(--mk-danger)`,
              `var(--mk-info)`,
            ],
          ]"
        />
      </AppStack>
    </AppCard>

    <!-- <div>

    </div> -->
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextModel, InputTextValue } from '@skgn/melkor/features';
import Color from 'colorjs.io';

const model = ref(createInputModel<InputTextValue>({
  value: '',
}));

const toOklch = ref(createInputModel<InputTextValue>({
  value: '',
}));

watch(model, (newModel) => {
  try {
    if (!newModel.value) {
      return;
    }
    let v = '';
    if (newModel.value.includes('hsl')) {
      v = newModel.value;
    }
    else {
      v = `hsl(${newModel.value})`;
    }
    const c = new Color(v).to('oklch');
    toOklch.value.value = c.toString();
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {

  }
});
</script>
