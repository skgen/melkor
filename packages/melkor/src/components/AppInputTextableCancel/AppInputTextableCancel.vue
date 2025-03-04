<template>
  <button
    v-theme="theme"
    class="mk-AppInputTextableCancel"
  >
    <slot>
      <AppIcon :icon="globalConfig.icons.AppInputTextableCancel.cancel" />
    </slot>
  </button>
</template>

<script lang="ts" setup>
import { useGlobalConfig, useTheme } from '../../composables';
import AppIcon from '../AppIcon/AppIcon.vue';

const theme = useTheme();
const globalConfig = useGlobalConfig();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppInputTextableCancel {
  --mk-input-textable-cancel-icon-color: var(--app-input-icon-color);
  --mk-input-textable-cancel-icon-size: var(--app-input-icon-size);

  padding: 0;

  &:not([disabled]) {
    cursor: pointer;

    @include melkor.expand-click-area;
  }

  .mk-AppIcon {
    --mk-icon-size: var(--mk-input-textable-cancel-icon-size);
    --mk-icon-color: var(--mk-input-textable-cancel-icon-color);

    display: block;
  }
}
</style>
