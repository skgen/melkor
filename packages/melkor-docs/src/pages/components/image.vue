<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Image
    </template>
    <div class="sk-ImageView">
      <AppCard v-for="(cell, i) of cells" :key="i" class="sk-ImageView-sample">
        <div class="sk-ImageView-sample-specs">
          <strong>{{ `${cell.ratio[0]}:${cell.ratio[1]}` }}</strong>
          <template v-if="cell.contain || cell.cover"> | {{ cell.contain ? 'contain' : 'cover' }}</template>
        </div>
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

<style lang="scss">
.sk-ImageView {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--mk-size-2);

  &-sample {
    position: relative;

    &-specs {
      position: absolute;
      top: var(--mk-size-2);
      left: var(--mk-size-2);
      z-index: 1;
      padding: var(--mk-size-2);
      background-color: var(--mk-shade-1);
      border-radius: var(--mk-border-radius-size);
    }
  }
}
</style>