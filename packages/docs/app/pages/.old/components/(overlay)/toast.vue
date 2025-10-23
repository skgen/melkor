<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Toast
    </template>
    <AppStack col>
      <MkCard>
        <AppStack align="center">
          <MkButton variant="outline" @click="() => handleNotification()">
            Pop toasts
          </MkButton>
          <AppInputNumber v-bind="duration" />
        </AppStack>
      </MkCard>
      <MkCard>
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
      </MkCard>
      <MkCard>
        <AppComponentProps name="AppToast" />
      </MkCard>
    </appstack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputNumberProps, ToastPosition } from '#melkor/features';

import MkButton from '#melkor/components/MkButton';
import MkIcon from '#melkor/components/MkIcon';

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
      leading: h(MkIcon, {
        icon: 'material-symbols:airplane-ticket',
      }),
      title: h('strong', `Flight has been added to the trip !`),
      description: `Trip now contains ${count} flights.`,
      actions: [
        h(
          MkButton,
          {
            variant: 'outline',
            size: 'tight',
          },
          {
            default: () => [
              h(
                MkIcon,
                {
                  icon: 'material-symbols:delete',
                },
              ),
              'Revert',
            ],
          },
        ),
        h(
          MkButton,
          {
            variant: 'outline',
            size: 'tight',
          },
          {
            default: () => [
              'Got it !',
              h(
                MkIcon,
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
