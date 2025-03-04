<template>
  <div class="sk-AppColorGenerator">
    <AppColor v-for="(color, i) of colorScheme" :key="i" :color="color.hex()" />
  </div>
</template>

<script lang="ts" setup>
import { hsl } from 'chroma-js';

interface Props {
  hue: string;
}

const props = defineProps<Props>();

const colorScheme = computed(() => ([
  hsl(Number.parseInt(props.hue), 0.33, 0.04),
  hsl(Number.parseInt(props.hue), 0.2, 0.07),
  hsl(Number.parseInt(props.hue), 0.19, 0.09),
  hsl(Number.parseInt(props.hue), 0.14, 0.11),
  hsl(Number.parseInt(props.hue), 0.10, 0.17),
]));


// --mk-shade: 220;
//   --mk-shade-0: var(--mk-shade) 33% 4%;
//   --mk-shade-1: var(--mk-shade) 20% 7%;
//   --mk-shade-2: var(--mk-shade) 19% 9%;
//   --mk-shade-3: var(--mk-shade) 14% 11%;

// const chroma = computed(() => hex(props.color));

// const lightness = computed(() => chroma.value.hsl()[2]);

// const textColor = computed(() => lightness.value >= 0.5 ? '#000000' : '#ffffff');

// const rgb = computed(() => chroma.value.rgba());
// const hsl = computed(() => chroma.value.hsl());
</script>

<style lang="scss">
.sk-AppColorGenerator {
  display: flex;
}
</style>
