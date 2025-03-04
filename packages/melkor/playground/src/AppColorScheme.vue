<template>
  <TheApp>
    <div class="sk-AppColorScheme">
      <div class="sk-AppColorScheme-header">
        <input v-model="base" type="text">
        <div class="sk-AppColorScheme-header-type">
          <button type="button" @click="() => paletteType = 'primary'">
            primary
          </button>
          <button type="button" @click="() => paletteType = 'grey'">
            grey
          </button>
        </div>
        <pre class="sk-AppColorScheme-data" @click="handleCopy">{{ paletteAsCSS }}</pre>
        <div class="sk-AppColorScheme-references">
          <AppColorBlock v-for="reference of references" :key="reference" :color="reference" @click="() => handleClick(reference)" />
        </div>
      </div>
      <div class="sk-AppColorScheme-content">
        <div class="sk-AppColorScheme-shades">
          <div v-for="shade of Object.keys(palette)" :key="shade" class="sk-AppColorScheme-shade">
            {{ shade }}
          </div>
        </div>
        <AppColorPalette :palettes="palettes" :base="base" @click="(color: string) => handleClick(color)" />
      </div>
    </div>
  </TheApp>
</template>

<script lang="ts" setup>
import AppColorBlock from '@/AppColorBlock.vue';
import AppColorPalette from '@/AppColorPalette.vue';
import { closestShade, dynamicColorScheme, generate, paletteToCSS, percentageColorScheme, shades, tailwind } from '@/colors';
import { shadesOf } from '@/tailwind-shades';
import AppButton from '@skgn/melkor/components/AppButton';
import AppCard from '@skgn/melkor/components/AppCard';
import AppIcon from '@skgn/melkor/components/AppIcon';
import AppThemeSelector from '@skgn/melkor/components/AppThemeSelector';
import TheApp from '@skgn/melkor/components/TheApp';
import { useGlobalConfig } from '@skgn/melkor/composables';
import { hex } from 'chroma-js';
import { computed, ref, watch } from 'vue';

const references = ['#ff3d00', '#47ba87', '#5600e8', '#03dac6', '#ffeb3b', '#06b6d4'];
const base = ref(references[0]);

const percColorScheme = computed(() => percentageColorScheme(base.value, [0, 1000], [100, 200, 300, 400, 500, 600, 700, 800, 900]));
const dynColorScheme = computed(() => dynamicColorScheme(base.value, [0, 1000], [100, 200, 300, 400, 500, 600, 700, 800, 900]));

function colorSchemeToColorPalette(colorScheme: Record<number, string>): string[] {
  return Object.keys(colorScheme).map(k => colorScheme[Number.parseInt(k)]);
}

const palette = computed(() => shadesOf(base.value, [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  950,
]));

const paletteType = ref<'primary' | 'grey'>('primary');
const paletteAsCSS = computed(() => paletteToCSS(palette.value, paletteType.value));

const palettes = computed(() => [
  {
    name: 'palette',
    colors: colorSchemeToColorPalette(palette.value),
  },
  // ...generate(base.value),
  // {
  //   name: 'MK percentage',
  //   colors: colorSchemeToColorPalette(percColorScheme.value),
  // },
  // {
  //   name: 'MK Dynamic',
  //   colors: colorSchemeToColorPalette(dynColorScheme.value),
  // },
]);

function handleClick(color: string) {
  base.value = color;
}

function handleCopy() {
  navigator.clipboard.writeText(paletteAsCSS.value);
}
</script>

<style lang="scss" scoped>
.sk-AppColorScheme {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 32px;

  &-data {
    display: block;
    border: 1px solid white;
    padding: 16px;
    cursor: pointer;
  }

  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-type {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      padding: 4px 8px;
      border: 1px solid white;
      cursor: pointer;
    }
  }

  &-references {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  &-shades {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &-shade {
    width: 80px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
