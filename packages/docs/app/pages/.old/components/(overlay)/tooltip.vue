<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Tooltip
    </template>
    <AppStack col>
      <MkCard :style="{ padding: '80px 160px' }">
        <AppTooltip>
          <template #tooltip>
            Copy to clipboard<MkIcon icon="material-symbols:title" />
          </template>
          <MkButton variant="outline" icon>
            <MkIcon icon="material-symbols:copy-all" />
            <!-- Call to action
            Call to action
            <br>
            Call to action
            Call to action
            <br>
            Call to action
            Call to action
            <br>
            Call to action
            Call to action -->
          </MkButton>
        </AppTooltip>
        <!-- <AppStack align="center">
          <MkButton variant="outline" @click="() => handleNotification()">
            Pop toasts
          </MkButton>
          <AppInputNumber v-bind="duration" />
        </AppStack> -->
      </MkCard>
      <!-- <MkCard>
        <AppStack gap="m" align="center">
          <MkButton
            v-for="position of positions"
            :key="position"
            variant="outline"
            @click="() => {
              melkorConfig.toast.position = position;
            }"
          >
            {{ position }}
          </MkButton>
        </AppStack>
      </MkCard> -->
    </appstack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useSeoMeta(({
  title: 'Melkor - Tooltip',
}));
</script>

<style lang="scss">
// .animate {
//   // animation: animate 2000ms infinite;
//   animation: circle 2000ms infinite linear;
// }

@keyframes animate {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(200px, 200px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes circle {
  0% {
    transform: rotate(0deg) translate(-50px) rotate(0deg);
  }

  100% {
    transform: rotate(360deg) translate(-50px) rotate(-360deg);
  }
}
</style>
