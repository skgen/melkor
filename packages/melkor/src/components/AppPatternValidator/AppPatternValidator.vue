<template>
  <div
    v-theme="theme"
    class="mk-AppPatternValidator"
  >
    {{ props.label }}
  </div>
</template>

<script lang="ts" setup generic="TValue">
import { useTheme } from '../../composables';

// eslint-disable-next-line ts/consistent-type-definitions
type Props = {
  label: string;

  validator?: (value: TValue) => boolean | string;
};

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
// .mk-AppPatternValidator {
// }
</style>
