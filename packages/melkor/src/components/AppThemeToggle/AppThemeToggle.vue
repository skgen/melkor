<template>
  <div
    v-theme="theme"
    class="mk-AppThemeToggle"
    v-bind="$attrs"
    @click="() => next()"
  >
    <div class="mk-AppThemeToggle-label">
      <span v-if="!props.compact" class="mk-AppThemeToggle-stateLabel">
        {{ currentTheme }}
      </span>
      <div class="mk-AppThemeToggle-input">
        <div class="mk-AppThemeToggle-target">
          <transition-group name="mk-fade">
            <template v-for="localTheme of globalConfig.themes" :key="localTheme">
              <AppIcon
                v-if="localTheme === globalTheme.preference"
                :icon="globalConfig.icons.AppThemeToggle[localTheme]"
              />
            </template>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useGlobalConfig, useGlobalTheme, useNextTheme, useTheme } from '../../composables';
import AppIcon from '../AppIcon/AppIcon.vue';

export interface Props {
  compact?: boolean;
}

const props = defineProps<Props>();

const { next, theme: currentTheme, index } = useNextTheme();

const globalTheme = useGlobalTheme();
const theme = useTheme();
const globalConfig = useGlobalConfig();

const size = computed(() => (2 + globalConfig.themes.length - 1) / 2);
const translateX = computed(() => `${index.value * 50}%`);
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppThemeToggle {
  --mk-theme-toggle-background-color: var(--mk-border-color);
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
    width: var(--mk-theme-toggle-size);
    height: var(--mk-theme-toggle-size);
    user-select: none;
    background-color: var(--mk-theme-toggle-target-background-color);
    border-radius: 50%;
    transition: transform var(--mk-transition-transform-duration);
    transform: translateX(v-bind(translateX));

    .mk-AppIcon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      --mk-icon-color: var(--mk-theme-toggle-target-icon-color);
    }
  }

  .mk-AppIcon {
    --mk-icon-size: var(--mk-theme-toggle-icon-size);
  }
}
</style>
