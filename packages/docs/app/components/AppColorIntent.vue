<template>
  <div
    class="sk-AppColorIntent"
    :data-size="props.size"
  >
    <span class="sk-AppColorIntent-name">{{ props.intent }}</span>
    <div class="sk-AppColorIntent-list">
      <AppTooltip>
        <template #tooltip>
          <div>
            <strong>background:</strong> <code>{{ toCssVar(scheme.background.intent) }}</code>
            <br>
            <strong>foreground:</strong> <code>{{ toCssVar(scheme.foreground.intent) }}</code>
          </div>
        </template>
        <AppColor
          :background="toCssVar(scheme.background.intent)"
          :foreground="toCssVar(scheme.foreground.intent)"
          class="sk-AppColorIntent-intent"
        >
          Some <br> Text
        </AppColor>
      </AppTooltip>
      <AppTooltip>
        <template #tooltip>
          <strong>background:</strong> <code>{{ toCssVar(scheme.background[75]) }}</code>
        </template>
        <AppColor
          size="tiny"
          :background="toCssVar(scheme.background[75])"
        />
      </AppTooltip>
      <AppTooltip>
        <template #tooltip>
          <strong>background:</strong> <code>{{ toCssVar(scheme.background[50]) }}</code>
        </template>
        <AppColor
          size="tiny"
          :background="toCssVar(scheme.background[50])"
        />
      </AppTooltip>
      <AppTooltip>
        <template #tooltip>
          <strong>background:</strong> <code>{{ toCssVar(scheme.background[25]) }}</code>
        </template>
        <AppColor
          size="tiny"
          :background="toCssVar(scheme.background[25])"
        />
      </AppTooltip>
      <AppTooltip>
        <template #tooltip>
          <strong>background:</strong> <code>{{ toCssVar(scheme.background[15]) }}</code>
        </template>
        <AppColor
          size="tiny"
          :background="toCssVar(scheme.background[15])"
        />
      </AppTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  intent: 'primary' | 'neutral' | 'success' | 'error' | 'danger' | 'info';
  size?: 'large' | 'medium' | 'tiny';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const scheme = computed(() => ({
  background: {
    light: `--mk-${props.intent}-light`,
    chroma: `--mk-${props.intent}-chroma`,
    hue: `--mk-${props.intent}-hue`,
    lch: `--mk-${props.intent}-lch`,
    intent: `--mk-${props.intent}`,
    75: `--mk-${props.intent}-75`,
    50: `--mk-${props.intent}-50`,
    25: `--mk-${props.intent}-25`,
    15: `--mk-${props.intent}-15`,
  },
  foreground: {
    light: `--mk-on-${props.intent}-light`,
    chroma: `--mk-on-${props.intent}-chroma`,
    hue: `--mk-on-${props.intent}-hue`,
    lch: `--mk-on-${props.intent}-lch`,
    intent: `--mk-on-${props.intent}`,
    75: `--mk-on-${props.intent}-75`,
    50: `--mk-on-${props.intent}-50`,
    25: `--mk-on-${props.intent}-25`,
    15: `--mk-on-${props.intent}-15`,
  },
}));

function toCssVar(value: string) {
  return `var(${value})`;
}
</script>

<style lang="scss">
.sk-AppColorIntent {
  &-name {
    display: block;
    margin-bottom: var(--mk-size-4);
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  &-list {
    display: flex;
    align-items: center;
  }

  &-intent {
    border-radius: var(--mk-size-2);
  }

  // justify-content: center;
}
</style>
