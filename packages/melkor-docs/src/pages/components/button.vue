<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Button
    </template>
    <AppStack col>
      <AppCard>
        <AppStack gap="m" align="center">
          <AppButton size="tight">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton>
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="wide">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton is-disabled>
            Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
          </AppButton>
          <AppButton is-active>
            Cancel <AppIcon icon="material-symbols:check-circle" />
          </AppButton>
        </AppStack>
      </AppCard>
      <AppCard>
        <AppStack gap="m" align="center">
          <AppButton size="tight" type="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton type="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton size="wide" type="outline">
            Cancel <AppIcon icon="material-symbols:cancel" />
          </AppButton>
          <AppButton type="outline" is-disabled>
            Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
          </AppButton>
          <AppButton type="outline" is-active>
            Cancel <AppIcon icon="material-symbols:check-circle" />
          </AppButton>
        </AppStack>
      </AppCard>
    </AppStack>
  </NuxtLayout>
</template>

<script lang="ts" setup>
useSeoMeta(({
  title: 'Melkor - Button',
}));
</script>
