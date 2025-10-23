<template>
  <button
    v-theme="theme"
    class="mk-ThemeToggle"
    v-bind="$attrs"
    @click="() => next()"
  >
    <span class="mk-ThemeToggle-label">
      <span v-if="!props.compact" class="mk-ThemeToggle-stateLabel">
        {{ currentTheme }}
      </span>
      <span class="mk-ThemeToggle-input">
        <span class="mk-ThemeToggle-target">
          <transition-group name="mk-fade">
            <template v-for="localTheme of globalConfig.themes" :key="localTheme">
              <AppIcon
                v-if="localTheme === globalTheme.preference && globalConfig.icons.ThemeToggle[localTheme]"
                :icon="globalConfig.icons.ThemeToggle[localTheme]"
              />
            </template>
          </transition-group>
        </span>
      </span>
    </span>
  </button>
</template>

<script lang="ts">
export type ThemeToggleProps = {
  compact?: boolean;
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';

import AppIcon from '#melkor/components/Icon.vue';
import { useGlobalConfig, useGlobalTheme, useNextTheme, useTheme } from '#melkor/composables';

const props = defineProps<ThemeToggleProps>();

const { next, theme: currentTheme, index } = useNextTheme();

const globalTheme = useGlobalTheme();
const theme = useTheme();
const globalConfig = useGlobalConfig();

const size = computed(() => (2 + globalConfig.themes.length - 1) / 2);
const translateX = computed(() => `${index.value * 50}%`);
</script>

<style lang="scss">
@use '../styles/mixins' as melkor;

.mk-ThemeToggle {
  --mk-theme-toggle-background-color: var(--mk-shade-3);
  --mk-theme-toggle-target-background-color: var(--mk-primary);
  --mk-theme-toggle-target-icon-color: var(--mk-on-primary);
  --mk-theme-toggle-spacing-size: var(--mk-size-2);
  --mk-theme-toggle-size: 16px;
  --mk-theme-toggle-padding-size: 2px;
  --mk-theme-toggle-icon-size: 12px;

  $this: &;

  display: inline-block;

  &-label {
    display: flex;
    gap: var(--mk-theme-toggle-spacing-size);
    align-items: center;
  }

  &-stateLabel,
  &-input {
    cursor: pointer;
  }

  &-input {
    position: relative;
    display: block;
    width: calc(var(--mk-theme-toggle-size) * v-bind(size) + var(--mk-theme-toggle-padding-size) * 2);
    padding: var(--mk-theme-toggle-padding-size);
    background-color: var(--mk-theme-toggle-background-color);
    border-radius: var(--mk-theme-toggle-size);
  }

  &-target {
    position: relative;
    display: block;
    width: var(--mk-theme-toggle-size);
    height: var(--mk-theme-toggle-size);
    user-select: none;
    background-color: var(--mk-theme-toggle-target-background-color);
    border-radius: 50%;
    transition: transform var(--mk-transition-transform-duration);
    transform: translateX(v-bind(translateX));

    .mk-Icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      --mk-icon-color: var(--mk-theme-toggle-target-icon-color);
    }
  }

  .mk-Icon {
    --mk-icon-size: var(--mk-theme-toggle-icon-size);
  }
}
</style>
