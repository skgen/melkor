<template>
  <div
    ref="title"
    class="sk-TheTitle"
  >
    <h1>
      <slot />
    </h1>
    <div class="sk-TheTitle-decoration" :data-is-expanded="expanded.decoration" />

    <div class="sk-TheTitle-sparkles" :data-is-expanded="expanded.sparkles">
      <AppSparkles
        background="transparent"
        :min-size="0.4"
        :max-size="1.4"
        :particle-density="600"
        class="size-full"
        :particle-color="particlesColor"
        :speed="speed"
      />
      <div class="sk-TheTitle-sparkles-background" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementHover } from '@vueuse/core';

const theme = useTheme();

const title = useTemplateRef<HTMLDivElement>('title');
// const isTitleHovered = useElementHover(title);

const particlesColor = computed(() => (theme.value.value === Theme.dark ? '#ffffff' : '#000000'));
// const speed = computed(() => isTitleHovered.value ? 2 : 0.5);
const speed = 1;

const expanded = ref({
  decoration: false,
  sparkles: false,
});

onMounted(() => {
  setTimeout(() => {
    expanded.value.decoration = true;
    setTimeout(() => {
      expanded.value.sparkles = true;
    }, 500);
  }, 1000);
});
</script>

<style lang="scss">
.sk-TheTitle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 640px;

  h1 {
    font-size: 6rem;
    font-weight: 700;
    text-align: center;
  }

  &-decoration {
    position: relative;
    width: 100%;
    height: 8px;
    margin-top: var(--mk-size-2);

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 70%;
      content: '';
      transition: transform 800ms ease-out;
      transform: translate(-50%, -50%) scaleX(0);
    }

    &::before {
      height: 100%;
      background-image: linear-gradient(to right, transparent, #ebecf0, transparent);
      filter: blur(4px);
    }

    &::after {
      height: 50%;
      background-image: linear-gradient(to right, transparent, #fff, transparent);
    }

    &[data-is-expanded='true'] {
      &::before,
      &::after {
        transform: translate(-50%, -50%) scaleX(1);
      }
    }
  }

  &-sparkles {
    position: relative;
    width: 100%;
    height: 160px;
    opacity: 0;
    transition: opacity 3000ms ease-out;

    &[data-is-expanded='true'] {
      opacity: 1;
    }

    &-background {
      position: absolute;
      inset: 0;
      background-color: var(--mk-shade-0);
      mask-image: radial-gradient(350px 200px at top, transparent 20%, white);
    }
  }
}
</style>
