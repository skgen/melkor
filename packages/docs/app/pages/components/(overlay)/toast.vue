<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Toast
    </template>
    <AppStack col>
      <AppCard>
        <AppStack align="center">
          <AppButton variant="outline" @click="() => handleNotification()">
            Pop toasts
          </AppButton>
          <AppInputNumber v-bind="duration" />
        </AppStack>
      </AppCard>
      <AppCard>
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
      </AppCard>
      <AppCard>
        <AppComponentProps name="AppToast" />
      </AppCard>
    </appstack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputNumberProps } from '#melkor/features';

import type { ToastPosition } from '../../../../../melkor/lib/features/toast';

import AppButton from '#melkor/components/AppButton';
import AppIcon from '#melkor/components/AppIcon';

useSeoMeta(({
  title: 'Melkor - Toast',
}));

const { create } = useToast();

const positions: ToastPosition[] = ['top-left', 'top-center', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];

const melkorConfig = useGlobalConfig();

const duration = reactive(
  useInputBinding<InputNumberProps>({
    value: 300000,
  }),
);

let count = 0;

function handleNotification() {
  count += 1;
  create({
    props: {
      duration: duration.value ?? 1000,
    },
    slots: {
      leading: h(AppIcon, {
        icon: 'material-symbols:airplane-ticket',
      }),
      title: h('strong', `Flight has been added to the trip !`),
      description: `Trip now contains ${count} flights.`,
      actions: [
        h(
          AppButton,
          {
            variant: 'outline',
            size: 'tight',
          },
          {
            default: () => [
              h(
                AppIcon,
                {
                  icon: 'material-symbols:delete',
                },
              ),
              'Revert',
            ],
          },
        ),
        h(
          AppButton,
          {
            variant: 'outline',
            size: 'tight',
          },
          {
            default: () => [
              'Got it !',
              h(
                AppIcon,
                {
                  icon: 'material-symbols:air',
                },
              ),
            ],
          },
        ),
      ],
    },
  });
}
</script>
