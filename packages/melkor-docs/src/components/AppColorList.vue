<template>
  <div
    v-theme="theme"
    class="mk-AppColorList"
  >
    <AppColor v-for="color of props.colors" :key="color" :color="color" :size="props.size" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  colors: string[];
  size?: 'large' | 'medium' | 'tiny';
}

const props = defineProps<Props>();
const theme = useTheme();
</script>

<style lang="scss">
.mk-AppColorList {
  display: flex;
}
</style>
