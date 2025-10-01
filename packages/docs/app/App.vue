<template>
  <TheApp class="sk-TheApp">
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />
    <TheHeader />

    <div class="sk-TheApp-view">
      <NuxtLayout>
        <!-- <pre>{{ navigation }}</pre> -->
        <NuxtPage />
      </NuxtLayout>
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
    <NuxtRouteAnnouncer />
  </TheApp>
</template>

<script lang="ts" setup>
const navigation = await useNavigation(ref('docs'));
</script>

<style lang="scss">
@use '#melkor/styles/scss' as _;
@use '#melkor/styles/mixins' as melkor;

// @use '#melkor/styles/scss' as melkor with (
//   $mk-dark-primary: (
//     'light': 66%,
//     'chroma': 0.1882,
//     'hue': 22deg,
//   ),
//   $mk-light-primary: (
//     'light': 71%,
//     'chroma': 0.1284,
//     'hue': 161deg,
//   )
// );

:root {
  --app-container-width: calc(1400px + var(--mk-size-4) * 2);
  --app-container-padding-x: var(--mk-size-4);
  --app-header-height: 60px;

  @include melkor.dark {
    /* stylelint-disable-next-line selector-class-pattern */
    .shiki span {
      font-style: var(--shiki-dark-font-style) !important;
      font-weight: var(--shiki-dark-font-weight) !important;
      color: var(--shiki-dark) !important;
      text-decoration: var(--shiki-dark-text-decoration) !important;
      background-color: var(--shiki-dark-bg) !important;
    }
  }

  @include melkor.light {
    /* stylelint-disable-next-line selector-class-pattern */
    .shiki span {
      font-style: var(--shiki-light-font-style) !important;
      font-weight: var(--shiki-light-font-weight) !important;
      color: var(--shiki-light) !important;
      text-decoration: var(--shiki-light-text-decoration) !important;
      background-color: var(--shiki-light-bg) !important;
    }
  }
}

// * {
//   @include melkor.dark {
//     // @include melkor.generate-lch-color('primary', 66%, 0.1882, 22deg);
//   }
// }

// $mk-shade-hue: 268deg;
// $mk-shade-chroma: 0.025;

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
