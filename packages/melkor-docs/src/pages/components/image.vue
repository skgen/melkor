<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Image
    </template>
    <div class="grid grid-cols-3 gap-2">
      <AppCard v-for="(cell, i) of cells" :key="i" class="relative">
        <span class="absolute top-2 left-2 z-1 bg-shade_0:50 px-2 py-1 rounded-1.5 block">
          <strong>{{ `${cell.ratio[0]}:${cell.ratio[1]}` }}</strong>
          <template v-if="cell.contain || cell.cover"> | {{ cell.contain ? 'contain' : 'cover' }}</template>
        </span>
        <div>
          <AppImage :src="imageSource" :ratio="cell.ratio" :contain="cell.contain" :cover="cell.cover" />
        </div>
      </AppCard>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const imageSource = '/images/moria-baraddur.jpeg';

const cells: {
  ratio: [number, number];
  cover?: boolean;
  contain?: boolean;
}[] = [
  {
    ratio: [1, 1],
  },
  {
    ratio: [1, 1],
    cover: true,
  },
  {
    ratio: [1, 1],
    contain: true,
  },
  {
    ratio: [4, 3],
  },
  {
    ratio: [4, 3],
    cover: true,
  },
  {
    ratio: [4, 3],
    contain: true,
  },
  {
    ratio: [16, 9],
  },
  {
    ratio: [16, 9],
    cover: true,
  },
  {
    ratio: [16, 9],
    contain: true,
  },
  {
    ratio: [2, 3],
  },
  {
    ratio: [2, 3],
    cover: true,
  },
  {
    ratio: [2, 3],
    contain: true,
  },
];
</script>
