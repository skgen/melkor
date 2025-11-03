<template>
  <button
    v-theme="theme"
    class="mk-FieldTextableCancel"
  >
    <slot>
      <Icon :icon="globalConfig.icons.FieldTextableCancel.cancel" />
    </slot>
  </button>
</template>

<script lang="ts">
import type { Slot } from 'vue';

export type FieldTextableCancelSlots = {
  default?: Slot;
};
</script>

<script lang="ts" setup>
import { Icon } from '../../components';
import { useGlobalConfig, useTheme } from '../../composables';

defineSlots<FieldTextableCancelSlots>();

const theme = useTheme();

const globalConfig = useGlobalConfig();
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-FieldTextableCancel {
  --mk-field-textable-cancel-icon-color: var(--mk-input-icon-color);
  --mk-field-textable-cancel-icon-size: var(--mk-input-icon-size);

  padding: 0;

  @include melkor.on-not-disabled {
    cursor: pointer;

    @include melkor.expand-click-area;
  }

  @include melkor.on-disabled {
    cursor: not-allowed;
  }

  .mk-Icon {
    --mk-icon-size: var(--mk-field-textable-cancel-icon-size);
    --mk-icon-color: var(--mk-field-textable-cancel-icon-color);

    display: block;
  }
}
</style>
