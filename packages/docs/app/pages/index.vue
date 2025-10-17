<template>
  <div class="sk-TheHomeView">
    <div class="sk-TheHomeView-title">
      <TheTitle>
        Melkor
      </TheTitle>
    </div>
  </div>
  <!-- <div class="w-[800px] h-[800px] outline-size-1 outline-solid outline-shade-10 relative">
      <pre>{{ {
        charging,
        chargingTime,
        dischargingTime,
        level,
      } }}</pre>
    </div> -->
  <!-- <div class="sk-TheHomePageView">
      <div>
        <AppSkeleton height="400px" />
      </div>
    </div> -->
</template>

<style lang="scss">
.sk-TheHomeView {
  display: flex;
  flex-direction: column;
  align-items: center;

  // gap: var(--mk-size-8);
  // justify-content: center;

  &-title {
    display: block;
    margin-top: var(--mk-size-20);
    font-size: 40px;
  }
}
</style>
