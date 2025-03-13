<template>
  <div
    ref="elementRef"
    v-theme="theme"
    class="mk-AppColorPalette"
  >
    <span class="mk-AppColorPalette-description">
      <slot name="description">
        {{ props.palette }}
      </slot>
    </span>
    <div class="mk-AppColorPalette-colors">
      <div v-for="color of props.colors ? props.colors : colors" :key="color" class="mk-AppColorPalette-color" :style="{ backgroundColor: props.colors ? color : `rgb(${color})` }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useTheme } from '../../composables';

interface Props {
  palette?: 'primary' | 'grey';
  colors?: string[];
}

const props = withDefaults(
  defineProps<Props>(),
  {
    palette: 'primary',
  },
);

const theme = useTheme();

const intensities = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const colors = ref<string[]>([]);

const elementRef = ref<null | HTMLDivElement>(null);

watch([elementRef, () => props.palette], ([newElementRef, newPalette]) => {
  if (!newElementRef) {
    return;
  }
  const styles = getComputedStyle(newElementRef);
  const _colors = [];
  for (const intensity of intensities) {
    _colors.push(styles.getPropertyValue(`--mk-${newPalette}-${intensity}`));
  }
  colors.value = _colors;
}, {
  immediate: true,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppColorPalette {
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
    align-items: center;
    justify-content: center;
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
