<template>
  <div class="sk-AppColorPalette">
    <div v-for="(palette, i) of props.palettes" :key="i" class="sk-AppColorPalette-row">
      <div class="sk-AppColorPalette-name">
        {{ palette.name }}
      </div>
      <div class="sk-AppColorPalette-colors">
        <AppColorBlock v-for="(color, j) of palette.colors" :key="j" :color="color" :data-is-active="color.toLowerCase() === props.base.toLowerCase()" @click="() => emits('click', color)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppColorBlock from '@/AppColorBlock.vue';

export interface Emits {
  (event: 'click', color: string): void;
};

interface Props {
  base: string;
  palettes: {
    name: string;
    colors: string[];
  }[];
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<style lang="scss">
.sk-AppColorPalette {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &-name {
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translate(-100%, -50%);
    display: block;
    text-transform: uppercase;
  }

  &-colors {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &-row {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }
}
</style>
