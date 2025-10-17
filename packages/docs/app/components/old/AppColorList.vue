<template>
  <div
    v-theme="theme"
    class="sk-AppColorList"
  >
    <AppColor v-for="color of props.colors" :key="color" :background="color" :size="props.size" />
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
.sk-AppColorList {
  display: flex;
}
</style>
