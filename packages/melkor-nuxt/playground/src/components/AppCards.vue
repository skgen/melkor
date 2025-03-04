<template>
  <div class="sk-AppCards">
    <AppCard>
      <template #default="{ elevation, direction }">
        ({{ elevation }} / {{ direction }})
        <br>
        {{ lorem }}
        <br>
        <br>
        <AppCard elevation="surface-high">
          <template #default="{ elevation, direction }">
            CUSTOM ({{ elevation }} / {{ direction }})
            <br>
            {{ lorem }}
            <br>
            <br>
            <AppCard>
              {{ lorem }}
              <br>
              <br>
              <AppCard>
                {{ lorem }}
                <br>
                <br>
                <AppCard>
                  {{ lorem }}
                  <br>
                  <br>
                  <AppCard>
                    {{ lorem }}
                  </AppCard>
                </AppCard>
              </AppCard>
            </AppCard>
          </template>
        </AppCard>
      </template>
    </AppCard>
  </div>
</template>

<script lang="ts" setup>
const lorem = ref(
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
);
</script>

<style lang="scss">
.sk-AppCards {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-4);
  align-items: center;
  justify-content: center;
  padding: var(--mk-size-4);
  white-space: pre;
}
</style>
