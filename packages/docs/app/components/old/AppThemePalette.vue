<template>
  <div
    ref="elementRef"
    v-theme="theme"
    class="sk-AppColorPalette"
  >
    <span class="sk-AppColorPalette-description">
      <slot name="description">
        {{ theme.value }}
      </slot>
    </span>
    <div class="sk-AppColorPalette-colors">
      <AppColorList :colors="shades" :size="props.size" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  size?: 'large' | 'medium' | 'tiny';
}

const props = defineProps<Props>();

const theme = useTheme();

const elementRef = ref<null | HTMLDivElement>(null);

const shades = ref<string[]>([]);

function getShades(element: HTMLElement) {
  const styles = getComputedStyle(element);
  const _colors = [];
  const shades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (const shade of shades) {
    _colors.push(styles.getPropertyValue(`--mk-shade-${shade}`));
  }
  return _colors;
}

watch(theme, () => {
  if (!elementRef.value) {
    return;
  }
  shades.value = getShades(elementRef.value);
});

onMounted(() => {
  if (!elementRef.value) {
    return;
  }
  shades.value = getShades(elementRef.value);
});
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
