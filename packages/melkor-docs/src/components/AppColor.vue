<template>
  <div class="sk-AppColor" :style="{ backgroundColor: props.color }" :data-size="props.size">
    {{ props.color }}
  </div>
</template>

<script lang="ts" setup>
interface Props {
  color: string;
  size?: 'large' | 'medium' | 'tiny';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});
</script>

<style lang="scss">
.sk-AppColor {
  display: flex;
  align-items: center;
  justify-content: center;

  &[data-size='large'] {
    width: 140px;
    height: 140px;
  }

  &[data-size='medium'] {
    width: 100px;
    height: 100px;
  }

  &[data-size='tiny'] {
    width: 40px;
    height: 40px;
  }
}
</style>
