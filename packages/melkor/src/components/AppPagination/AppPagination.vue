<template>
  <div
    v-theme="theme"
    class="mk-AppPagination"
  >
    <button
      class="mk-AppPagination-slot mk-AppPagination-cta"
      :data-has-text="!!$slots['prev-text']"
      :disabled="!prevCta"
      @click="handlePrev"
    >
      <slot name="prev-icon">
        <AppIcon
          :icon="globalConfig.icons.AppPagination.prev"
        />
      </slot>
      <slot name="prev-text" />
    </button>
    <div class="mk-AppPagination-list">
      <button
        class="mk-AppPagination-slot mk-AppPagination-page"
        :data-is-active="page === firstPage || undefined"
        :disabled="page === firstPage || undefined"
        @click="() => handlePage(firstPage)"
      >
        {{ firstPage }}
      </button>
      <template
        v-for="(s, index) of slotsRange"
        :key="index"
      >
        <button
          v-if="isValue(s)"
          class="mk-AppPagination-slot mk-AppPagination-page"
          :data-is-active="s === page || undefined"
          :disabled="s === page || undefined"
          @click="() => handlePage(s)"
        >
          {{ s }}
        </button>
        <div
          v-else
          class="mk-AppPagination-slot mk-AppPagination-gap"
        >
          <AppIcon :icon="globalConfig.icons.AppPagination.gap" />
        </div>
      </template>
      <button
        class="mk-AppPagination-slot mk-AppPagination-page"
        :data-is-active="page === lastPage || undefined"
        :disabled="page === lastPage || undefined"
        @click="() => handlePage(lastPage)"
      >
        {{ lastPage }}
      </button>
    </div>
    <button
      class="mk-AppPagination-slot mk-AppPagination-cta"
      :data-has-text="!!$slots['next-text']"
      :disabled="!nextCta"
      @click="handleNext"
    >
      <slot name="next-text" />
      <slot name="next-icon">
        <AppIcon
          :icon="globalConfig.icons.AppPagination.next"
        />
      </slot>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useGlobalConfig, usePagination, useTheme } from '../../composables';
import { isValue } from '../../features';
import AppIcon from '../AppIcon/AppIcon.vue';

interface Props {
  modelValue: number;
  range: [number, number];
  gap?: number;
}

interface Emits {
  (event: 'update:model-value', page: number): void;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    gap: 1,
  },
);

const emit = defineEmits<Emits>();

const theme = useTheme();
const globalConfig = useGlobalConfig();

const {
  firstPage,
  lastPage,
  page,
  prevCta,
  slotsRange,
  nextCta,
} = usePagination(reactive({
  page: computed(() => props.modelValue),
  range: computed(() => props.range),
  gap: computed(() => props.gap),
}));

function handlePrev() {
  emit('update:model-value', page.value - 1);
}

function handleNext() {
  emit('update:model-value', page.value + 1);
}

function handlePage(pageNumber: number) {
  emit('update:model-value', pageNumber);
}
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-AppPagination {
  --mk-pagination-background-color: var(--mk-input-background-color);
  --mk-pagination-background-color-hover: var(--mk-input-background-color-hover);
  --mk-pagination-border-color: var(--mk-input-border-color);
  --mk-pagination-border-color-hover: var(--mk-input-border-color-active);
  --mk-pagination-border-color-active: var(--mk-input-border-color-active);
  --mk-pagination-border-radius-size: var(--mk-input-border-radius-size);
  --mk-pagination-border-size: var(--mk-input-border-size);
  --mk-pagination-border-size-active: var(--mk-input-border-size-hover);
  --mk-pagination-slot-size: var(--mk-size-9);
  --mk-pagination-transition-duration: var(--mk-transition-opacity-duration);

  display: flex;

  > :first-child {
    border-left: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);

    &,
    &::before {
      border-top-left-radius: var(--mk-pagination-border-radius-size);
      border-bottom-left-radius: var(--mk-pagination-border-radius-size);
    }
  }

  > :last-child {
    border-right: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);

    &,
    &::before {
      border-top-right-radius: var(--mk-pagination-border-radius-size);
      border-bottom-right-radius: var(--mk-pagination-border-radius-size);
    }
  }

  &-list {
    display: flex;
    border-right: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);

    > * {
      border-left: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);
    }
  }

  &-cta,
  &-page {
    cursor: pointer;
    background-color: var(--mk-pagination-background-color);
    transition: background-color var(--mk-pagination-transition-duration);

    &::before {
      @include melkor.pseudo;

      inset: -1px;
      z-index: 1;
      pointer-events: none;
      box-shadow: inset 0 0 0.01px var(--mk-pagination-border-size) var(--mk-pagination-border-color);
      opacity: 0;
      transition:
        opacity var(--mk-transition-opacity-duration),
        box-shadow var(--mk-transition-color-duration);
    }
  }

  &-cta {
    &[data-has-text='true'] {
      gap: 0 var(--mk-size-2);
      width: auto;
      padding: 0 var(--mk-size-2);
    }

    @include melkor.not-disabled {
      &:hover {
        background-color: var(--mk-pagination-background-color-hover);

        &::before {
          box-shadow: inset 0 0 0.01px var(--mk-pagination-border-size) var(--mk-pagination-border-color-hover);
          opacity: 1;
        }
      }
    }

    @include melkor.disabled {
      cursor: not-allowed;
      opacity: var(--mk-opacity-disabled);
    }
  }

  &-page {
    &::before {
      box-shadow: inset 0 0 0.01px var(--mk-pagination-border-size) var(--mk-pagination-border-color);
    }

    &:hover {
      background-color: var(--mk-pagination-background-color-hover);

      &::before {
        box-shadow: inset 0 0 0.01px var(--mk-pagination-border-size) var(--mk-pagination-border-color-hover);
        opacity: 1;
      }
    }

    @include melkor.active {
      background-color: var(--mk-pagination-background-color);

      &::before {
        z-index: 2;
        box-shadow: inset 0 0 0.01px var(--mk-pagination-border-size) var(--mk-pagination-border-color-active);
        opacity: 1;
      }
    }

    @include melkor.disabled {
      cursor: not-allowed;
    }
  }

  &-slot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--mk-pagination-slot-size);
    height: var(--mk-pagination-slot-size);
    padding: 0;
    background-color: var(--mk-pagination-background-color);
    border-top: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);
    border-bottom: var(--mk-pagination-border-size) solid var(--mk-pagination-border-color);
  }

  &-gap {
    color: var(--mk-text-soft-color);
  }
}
</style>
