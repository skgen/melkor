<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Button
    </template>
    <AppRow>
      <AppButton size="tight">
        Cancel <AppIcon icon="material-symbols:cancel" />
      </AppButton>
      <AppButton>Cancel <AppIcon icon="material-symbols:cancel" /></AppButton>
      <AppButton size="wide">
        Cancel <AppIcon icon="material-symbols:cancel" />
      </AppButton>
      <AppButton is-disabled>
        Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
      </AppButton>
      <AppButton is-active>
        Cancel <AppIcon icon="material-symbols:check-circle" />
      </AppButton>
    </AppRow>
    <AppRow>
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
    </AppRow>
  </NuxtLayout>
</template>
