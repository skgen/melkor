<template>
  <div
    ref="elementRef"
    v-theme="theme"
    class="sk-AppColorPalette"
  >
    <span class="sk-AppColorPalette-description">
      <slot name="description">
        {{ props.palette }}
      </slot>
    </span>
    <div class="sk-AppColorPalette-colors">
      <AppColorList v-for="(list, index) of props.colors" :key="index" :colors="list" :size="props.size" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  palette?: string;
  colors?: string[][];
  size?: 'large' | 'medium' | 'tiny';
}

const props = withDefaults(
  defineProps<Props>(),
  {
    palette: 'primary',
  },
);

const theme = useTheme();

const elementRef = ref<null | HTMLDivElement>(null);

// watch([elementRef, () => props.palette], ([newElementRef, newPalette]) => {
//   if (!newElementRef) {
//     return;
//   }
//   const styles = getComputedStyle(newElementRef);
//   const _colors = [];
//   for (const intensity of intensities) {
//     _colors.push(styles.getPropertyValue(`--mk-${newPalette}-${intensity}`));
//   }
//   colors.value = _colors;
// }, {
//   immediate: true,
// });
</script>

<style lang="scss">
@use '#melkor/styles/mixins' as melkor;

.sk-AppColorPalette {
  @include melkor.dark {
    --mk-color-palette-background-color: black;
  }

  @include melkor.light {
    --mk-color-palette-background-color: white;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &-description {
    position: relative;
    padding: var(--mk-size-2) var(--mk-size-4) 0 var(--mk-size-4);
    text-transform: capitalize;
    background-color: var(--mk-color-palette-background-color);
    border-top-left-radius: var(--mk-border-radius-size);
    border-top-right-radius: var(--mk-border-radius-size);
  }

  &-colors {
    display: flex;
    flex-direction: column;
    padding: var(--mk-size-4);
    background-color: var(--mk-color-palette-background-color);
    border-top-right-radius: var(--mk-border-radius-size);
    border-bottom-right-radius: var(--mk-border-radius-size);
    border-bottom-left-radius: var(--mk-border-radius-size);
  }

  &-color {
    width: 80px;
    height: 80px;
  }
}
</style>
