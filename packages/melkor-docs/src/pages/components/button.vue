<template>
  <NuxtLayout name="base-layout">
    <template #title>
      Button
    </template>
    <div class="sk-TheComponentButtonView">
      <div class="sk-TheComponentButtonView-row">
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
      </div>
      <div class="sk-TheComponentButtonView-row">
        <AppButton size="tight" type="outline">
          Cancel <AppIcon icon="material-symbols:cancel" />
        </AppButton>
        <AppCard>
          <AppCard>
            <AppCard>
              <AppButton type="outline">
                Cancel <AppIcon icon="material-symbols:cancel" />
              </AppButton>
            </AppCard>
          </AppCard>
        </AppCard>
        <AppButton size="wide" type="outline">
          Cancel <AppIcon icon="material-symbols:cancel" />
        </AppButton>
        <AppButton type="outline" is-disabled>
          Cancel <AppIcon icon="material-symbols:do-not-disturb-on" />
        </AppButton>
        <AppButton type="outline" is-active>
          Cancel <AppIcon icon="material-symbols:check-circle" />
        </AppButton>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.sk-TheComponentButtonView {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-8);
  align-items: flex-start;

  &-row {
    display: flex;
    gap: var(--mk-size-4);
    align-items: center;
  }
}
</style>
