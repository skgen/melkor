<template>
  <div class="sk-ColorPaletteTest">
    <div class="sk-ColorPaletteTest-block">
      <div class="sk-ColorPaletteTest-block-header">
        <span>Color</span>
        <input v-model="colorTone" type="text">
        <button @click="colorMode = 'classic'">
          Classic
        </button>
        <button @click="colorMode = 'pure'">
          Pure
        </button>
      </div>
      <AppColorPalette v-for="(palette, i) of colorPalettes" :key="i" :colors="objToArray(palette.palette)" @click="() => handleCopy(palette.palette, 'primary')">
        <template #description>
          {{ palette.name }}
        </template>
      </AppColorPalette>
    </div>
    <div class="sk-ColorPaletteTest-block">
      <div class="sk-ColorPaletteTest-block-header">
        <span>Grey</span>
        <input v-model="greyTone" type="text">
      </div>

      <AppColorPalette v-for="(palette, i) of greyPalettes" :key="i" :colors="objToArray(palette.palette)" @click="() => handleCopy(palette.palette, 'grey')">
        <template #description>
          {{ palette.name }}
        </template>
      </AppColorPalette>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { extrem, linear, objToArray, paletteToCSS, sharded, toPureShade } from '@/lib/colors';

const colorTone = ref('#ff3d00');
const colorMode = ref<'classic' | 'pure'>('classic');
const colorToneMapped = computed(() => {
  if (colorMode.value === 'classic') {
    return colorTone.value;
  }
  return toPureShade(colorTone.value);
});

const greyTone = ref('#64748b');

const colorPalettes = computed(() => [
  linear(colorToneMapped.value),
  sharded(colorToneMapped.value),
  extrem(colorToneMapped.value),
]);

const greyPalettes = computed(() => [
  linear(greyTone.value),
  sharded(greyTone.value),
  extrem(greyTone.value),
]);

function handleCopy(palette: Record<number, string>, key: string) {
  navigator.clipboard.writeText(paletteToCSS(palette, key));
  // eslint-disable-next-line no-alert
  alert(`${key} palette copied to clipboard`);
}
</script>

<style lang="scss">
.sk-ColorPaletteTest {
  display: flex;
  gap: var(--mk-size-24);
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--mk-size-4);

  &-block {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-4);
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &-header {
      display: flex;
      gap: var(--mk-size-4);
      align-items: center;
    }
  }
}
</style>
