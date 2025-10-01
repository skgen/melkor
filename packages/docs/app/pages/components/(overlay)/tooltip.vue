<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Tooltip
    </template>
    <AppStack col>
      <AppCard :style="{ padding: '80px 160px' }">
        <AppTooltip>
          <template #tooltip>
            Copy to clipboard<AppIcon icon="material-symbols:title" />
          </template>
          <AppButton variant="outline" icon>
            <AppIcon icon="material-symbols:copy-all" />
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
          </AppButton>
        </AppTooltip>
        <!-- <AppStack align="center">
          <AppButton variant="outline" @click="() => handleNotification()">
            Pop toasts
          </AppButton>
          <AppInputNumber v-bind="duration" />
        </AppStack> -->
      </AppCard>
      <!-- <AppCard>
        <AppStack gap="m" align="center">
          <AppButton
            v-for="position of positions"
            :key="position"
            variant="outline"
            @click="() => {
              melkorConfig.toast.position = position;
            }"
          >
            {{ position }}
          </AppButton>
        </AppStack>
      </AppCard> -->
    </appstack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputNumberProps } from '#melkor/features';

import type { ToastPosition } from '../../../../../melkor/lib/features/toast';

import AppButton from '#melkor/components/AppButton';
import AppIcon from '#melkor/components/AppIcon';

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
