<template>
  <div
    v-theme="theme"
    class="mk-Progress"
    :data-direction="props.direction"
  >
    <div
      v-if="label || $slots.label"
      class="mk-Progress-label"
      :style="labelStyle"
    >
      <slot
        name="label"
        :value="props.modelValue"
        :clamped-value="clampedValue"
        :normalized-value="normalizedValue"
      >
        {{ label }}
      </slot>
    </div>
    <ProgressRoot
      :model-value="clampedValue"
      class="mk-Progress-root"
      :max="max ?? undefined"
    >
      <ProgressIndicator
        class="mk-Progress-indicator"
        :style="indicatorStyle"
      />
    </ProgressRoot>

    <div v-if="steps" class="mk-Progress-steps">
      <transition-group name="mk-fade">
        <template
          v-for="(step, index) of props.max"
          :key="index"
        >
          <div
            v-if="index === clampedValue"
            class="mk-Progress-step"
          >
            <slot :name="`step-${index}`" :step="step">
              {{ step }}
            </slot>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import type { ProgressRootEmits } from 'reka-ui';
import type { Slot } from 'vue';

export type ProgressProps = {
  modelValue: number | null;
  max?: number | any[];
  label?: 'value' | 'percentage';
  direction?: 'horizontal' | 'vertical';
};

export type ProgressEmits = ProgressRootEmits & {

};

export type ProgressSlots = {
  label?: Slot<{
    value: number | null;
    clampedValue: number | null;
    normalizedValue: number | null;
  }>;
  [key: `step-${string}`]: Slot<{
    step: number;
  }>;
};
</script>

<script lang="ts" setup>
import { clamp, isValue, map } from '@skgn/kit';
import { isArray, round } from 'lodash-es';
import { ProgressIndicator, ProgressRoot } from 'reka-ui';
import { computed } from 'vue';

import { useTheme } from '#melkor/composables';

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  direction: 'horizontal',
});

defineSlots<ProgressSlots>();

const theme = useTheme();

const isIndeterminate = computed(() => props.modelValue === null);

const steps = computed(() => isArray(props.max) ? props.max : null);

const max = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return null;
  }

  if (isArray(props.max)) {
    return props.max.length - 1;
  }

  return props.max;
});

const clampedValue = computed(() => {
  if (isIndeterminate.value || !isValue(max.value) || !isValue(props.modelValue)) {
    return null;
  }

  return round(clamp(props.modelValue, 0, max.value), 2);
});

const normalizedValue = computed(() => {
  if (!isValue(clampedValue.value) || !isValue(max.value)) {
    return null;
  }
  return round(map(clampedValue.value, 0, max.value, 0, 100), 2);
});

const indicatorStyle = computed(() => {
  if (!isValue(normalizedValue.value)) {
    return {};
  }
  if (props.direction === 'horizontal') {
    return ({
      transform: `translateX(${-(100 - normalizedValue.value)}%)`,
    });
  }
  else {
    return ({
      transform: `translateY(${100 - normalizedValue.value}%)`,
    });
  }
});

const labelStyle = computed(() => {
  if (!isValue(normalizedValue.value)) {
    return {};
  }
  if (props.direction === 'horizontal') {
    return ({
      width: `${normalizedValue.value}%`,
    });
  }
  else {
    return ({
      'min-height': `${normalizedValue.value}%`,
    });
  }
});

const label = computed(() => {
  if (!props.label) {
    return null;
  }
  if (props.label === 'percentage') {
    return isValue(normalizedValue.value) ? `${normalizedValue.value}%` : null;
  }
  return clampedValue.value?.toString() ?? '';
});
</script>

<style lang="scss">
.mk-Progress {
  --mk-progress-border-radius-size: var(--mk-border-radius-size);
  --mk-progress-transition-duration: var(--mk-transition-transform-duration);
  --mk-progress-size: var(--mk-size-2);

  $this: &;

  position: relative;
  display: flex;
  gap: var(--mk-size-1);

  &-label {
    display: flex;
    justify-content: flex-end;
    color: var(--mk-text-soft-color);
  }

  &-root {
    overflow: hidden;
    background-color: var(--mk-input-border-color);
    border-radius: var(--mk-progress-border-radius-size);
    transform: translateZ(0);
  }

  &-indicator {
    background-color: var(--mk-primary);
    transition: transform var(--mk-progress-transition-duration);
    will-change: transform;
  }

  &-steps {
    display: grid;
  }

  &-step {
    grid-row-start: 1;
    grid-column-start: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &[data-direction='horizontal'] {
    flex-direction: column;

    #{$this} {
      &-label {
        min-width: fit-content;
        transition: width var(--mk-progress-transition-duration);
        will-change: width;
      }

      &-root {
        width: 100%;
      }

      &-indicator {
        width: 100%;
        height: var(--mk-progress-size);
      }

      &-steps {
        justify-content: flex-end;
      }
    }
  }

  &[data-direction='vertical'] {
    flex-direction: row;
    align-items: flex-end;

    #{$this} {
      &-label {
        // Height & min-height are swapped because of a weird behavior with min-height: fit-content
        // See : https://stackoverflow.com/questions/65336892/min-height-min-content-not-work-in-chrome-and-firefox#answer-65337442
        height: fit-content;
        transition: min-height var(--mk-progress-transition-duration);
        will-change: min-height;
      }

      &-root {
        height: 100%;
      }

      &-indicator {
        width: var(--mk-progress-size);
        height: 100%;
      }

      &-steps {
        height: 100%;
      }
    }
  }
}
</style>
