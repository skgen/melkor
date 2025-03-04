<template>
  <div class="sk-AppColor" :style="{ backgroundColor: props.color, color: textColor }">
    rgb {{ rgb[0] }}, {{ rgb[1] }}, {{ rgb[2] }}
    <br>
    <br>
    hsl {{ hsl[0].toFixed(3) }}, {{ hsl[1].toFixed(3) }}, {{ hsl[2].toFixed(3) }}
  </div>
</template>

<script lang="ts" setup>
import { hex } from 'chroma-js';

interface Props {
  color: string;
}

const props = defineProps<Props>();

const chroma = computed(() => hex(props.color));

const lightness = computed(() => chroma.value.hsl()[2]);

const textColor = computed(() => lightness.value >= 0.5 ? '#000000' : '#ffffff');

const rgb = computed(() => chroma.value.rgba());
const hsl = computed(() => chroma.value.hsl());
</script>

<style lang="scss">
.sk-AppColor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
}
</style>
