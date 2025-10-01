<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Image
    </template>
    <div class="sk-ImageView">
      <AppStack col align="stretch">
        <div class="sk-ImageView-grid">
          <AppCard v-for="(cell, i) of cells" :key="i" class="sk-ImageView-grid-sample">
            <div class="sk-ImageView-grid-sample-specs">
              <strong v-if="cell.ratio">{{ `${cell.ratio[0]}:${cell.ratio[1]}` }}</strong>
              <template v-if="cell.fit">
                | {{ cell.fit }}
              </template>
            </div>
            <div>
              <AppImage :src="imageSource" :ratio="cell.ratio" :fit="cell.fit" />
            </div>
          </AppCard>
        </div>
      </AppStack>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { Props as ImageProps } from '#melkor/components/AppImage';

import AppImage from '#melkor/components/AppImage';

const imageSource = '/images/moria-baraddur.jpeg';

const defaultPropsOverride: ImageProps = {
  src: imageSource,
};

const cells: Pick<ImageProps, 'ratio' | 'fit'>[] = [
  {
    ratio: [1, 1],
  },
  {
    ratio: [1, 1],
    fit: 'cover',
  },
  {
    ratio: [1, 1],
    fit: 'contain',
  },
  {
    ratio: [4, 3],
  },
  {
    ratio: [4, 3],
    fit: 'cover',
  },
  {
    ratio: [4, 3],
    fit: 'contain',
  },
  {
    ratio: [16, 9],
  },
  {
    ratio: [16, 9],
    fit: 'cover',
  },
  {
    ratio: [16, 9],
    fit: 'contain',
  },
  {
    ratio: [2, 3],
  },
  {
    ratio: [2, 3],
    fit: 'cover',
  },
  {
    ratio: [2, 3],
    fit: 'contain',
  },
];
</script>

<style lang="scss">
.sk-ImageView {
  &-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--mk-size-2);
    width: 100%;

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
}
</style>
