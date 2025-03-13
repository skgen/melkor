<template>
  <div>
    <TheApp class="sk-TheApp">
      <TheHeader />
      <div class="sk-TheApp-view">
        <NuxtPage />
      </div>
      <TheFooter />
      <!-- <ClientOnly>
        <div class="sk-TheApp-grid">
          <AppFlickeringGrid
            :square-size="4"
            :grid-gap="8"
            color="#48ba87"
            :max-opacity="0.5"
            :flicker-chance="0.2"
          />
        </div>
      </ClientOnly> -->
    </TheApp>
    <NuxtRouteAnnouncer />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const opacity = computed(() => route.fullPath === '/' ? 1 : 0.2);
</script>

<style lang="scss">
.sk-TheApp {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &-view {
    display: flex;
    flex: 1;
    flex-direction: column;

    > * {
      flex: 1;
    }
  }

  // padding-top: 60px;

  // &-grid {
  //   position: fixed;
  //   top: 60px;
  //   left: 0;
  //   z-index: -1;
  //   width: 100%;
  //   height: calc(100vh - 60px);
  //   overflow: hidden;
  //   opacity: v-bind(opacity);
  //   transition: opacity var(--mk-transition-3-duration) ease-out;

  //   // relative size-[600px] w-full overflow-hidden rounded-lg border bg-background

  //   .sk-AppFlickeringGrid {
  //     position: relative;
  //     position: absolute;
  //     inset: 0;
  //     z-index: 0;
  //     mask-image: radial-gradient(calc(50vh) circle at center, #fff, transparent);

  //     // relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]
  //   }
  // }
}
</style>
