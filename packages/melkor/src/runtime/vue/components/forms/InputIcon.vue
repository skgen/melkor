<template>
  <div
    v-theme="theme"
    class="mk-InputIcon"
    v-bind="bindInteractionStateProps({
      ...props,
      focused: focused || open,
    })"
  >
    <FieldLabel v-if="slots.label">
      <slot name="label" />
    </FieldLabel>

    <PopoverRoot
      :open="props.disabled ? false : open" @update:open="(newOpen) => {
        if (props.disabled) {
          return;
        }
        open = newOpen;
      }"
    >
      <PopoverTrigger as-child>
        <div
          class="mk-InputIcon-input"
          role="button"
          tabindex="0"
          @keydown="handleKeyDown"
          @focus="onFocus"
          @blur="onBlur"
        >
          <input
            type="hidden"
            :disabled="props.disabled"
            :value="props.value"
            :name="props.name"
          >
          <div class="mk-InputIcon-input-value">
            <div
              v-if="!props.value && slots.placeholder"
              class="mk-InputIcon-input-value-placeholder"
            >
              <slot name="placeholder" />
            </div>
            <Icon v-if="props.value" :icon="props.value" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent :side-offset="4" side="bottom" align="center" :style="{ zIndex: 'var(--mk-floating-layer-z-index)' }">
          <div
            v-theme="theme"
            data-root="mk-InputIcon"
            class="mk-InputIcon-menu"
            :style="{
              '--mk-input-icon-menu-grid-column-template': cssColumnSize,
            }"
          >
            <span v-if="currentCollection?.categories.length" class="mk-InputIcon-menu-counter">
              {{ loadedSize }}/{{ collectionSize }}
            </span>
            <div ref="menuContentElement" class="mk-InputIcon-menu-content">
              <template v-if="currentCollection">
                <div
                  v-for="category of currentCollection.categories"
                  :key="category.label"
                  class="mk-InputIcon-menu-category"
                >
                  <span class="mk-InputIcon-menu-category-title">
                    {{ category.label }}
                  </span>
                  <div class="mk-InputIcon-menu-category-grid">
                    <button
                      v-for="icon of category.icons"
                      :key="icon"
                      class="mk-InputIcon-menu-category-icon"
                      :data-is-active="`${currentCollection?.name}:${icon}` === props.value || undefined"
                      @click="() => handleChange(`${currentCollection?.name}:${icon}`)"
                    >
                      <Icon :icon="`${currentCollection.name}:${icon}`" inline />
                    </button>
                  </div>
                </div>
              </template>
              <div v-else class="mk-InputIcon-menu-empty">
                No data
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>

    <FieldHint v-if="slots.hint">
      <slot name="hint" />
    </FieldHint>
    <FieldError v-if="errors.hasErrors">
      {{ errors.formattedErrors }}
    </FieldError>
  </div>
</template>

<script lang="ts">
import type { Slot } from 'vue';

import type { IconCollectionName, InputEmits, InputExpose, InputProps, InputSlots } from '#melkor/features';

export type InputIconValue = string | null;

export type InputIconProps = InputProps<InputIconValue> & {
  placeholder?: string;
  cancelable?: boolean;
  collection?: IconCollectionName;
  pageSize?: number;
  columnSize?: number;
};

export type InputIconEmits = InputEmits<InputIconValue>;

export type InputIconSlots = InputSlots & {
  placeholder?: Slot;
};

export type InputIconExpose = InputExpose;
</script>

<script lang="ts" setup>
// @todo translations in template
import type { Flatten } from '@skgn/kit';

import type { IconCollection } from '#melkor/features';

import { useInfiniteScroll } from '@vueuse/core';
import { isEqual } from 'lodash-es';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';

import { FieldError, FieldHint, FieldLabel, Icon } from '#melkor/components';
import { useIconCollection, useInput, useInputErrors, useTheme } from '#melkor/composables';
import { bindInteractionStateProps } from '#melkor/features';

const props = withDefaults(
  defineProps<InputIconProps>(),
  {
    valid: true,
    touched: false,
    errors: () => [] as string[],
    collection: 'material-symbols',
    pageSize: 100,
    columnSize: 6,
  },
);

const emit = defineEmits<InputIconEmits>();

const slots = defineSlots<InputIconSlots>();

const theme = useTheme();

const errors = useInputErrors(props.errors);

const { collection } = useIconCollection({ collectionName: props.collection });

const iconsPage = ref(0);
const collectionSize = computed(() => collection.value?.categories.reduce((acc, v) => acc += v.icons.length, 0) ?? 0);

const currentCollection = computed(() => {
  if (!collection.value) {
    return null;
  }
  const _currentCollection: IconCollection = {
    name: collection.value.name,
    categories: [],
  };
  let currentPage = 0;
  const totalIcons = (iconsPage.value + 1) * props.pageSize;
  let leftOverIcons = totalIcons;

  do {
    const collectionCategory = collection.value.categories[currentPage];
    if (!collectionCategory) {
      break;
    }
    const collectionFragment: Flatten<IconCollection['categories']> = {
      label: collectionCategory.label,
      icons: [],
    };
    if (collectionCategory.icons.length > leftOverIcons) {
      collectionFragment.icons = collectionCategory.icons.slice(0, leftOverIcons);
      // We reach the end of the data
      leftOverIcons = 0;
    }
    else {
      collectionFragment.icons = [...collectionCategory.icons];
      leftOverIcons -= collectionFragment.icons.length;
    }
    _currentCollection.categories.push(collectionFragment);
    currentPage += 1;
  } while (leftOverIcons > 0);
  return _currentCollection;
});

const loadedSize = computed(() => currentCollection.value?.categories.reduce((acc, v) => acc += v.icons.length, 0) ?? 0);

function handleNextPage() {
  iconsPage.value += 1;
}

const open = ref(false);

const menuContentElement = useTemplateRef('menuContentElement');

const { reset } = useInfiniteScroll(
  menuContentElement,
  () => {
    handleNextPage();
  },
  {
    distance: 10,
    canLoadMore: () => loadedSize.value < collectionSize.value,
  },
);

function handleResetPage() {
  iconsPage.value = 0;
  reset();
}

const {
  onChange,
  onFocus,
  onBlur,
  focused,
} = useInput<InputIconValue>({
  props,
  emit,
});

function handleChange(newValue: InputIconValue) {
  if (props.cancelable && isEqual(props.value, newValue)) {
    onChange(null);
  }
  else {
    onChange(newValue);
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.code === 'Enter' || event.code === 'Space') {
    const target = event.currentTarget as HTMLElement | null;
    event.preventDefault();
    target?.click();
  }
}

watch(open, (newOpen) => {
  nextTick(() => {
    if (newOpen) {
      onFocus();
    }
    else {
      handleResetPage();
      onBlur();
    }
  });
});

function focus() {
  open.value = true;
}

function blur() {
  open.value = false;
}

const cssColumnSize = computed(() => Array.from({ length: props.columnSize }).fill('1fr').join(' '));

defineExpose<InputIconExpose>({
  focus,
  blur,
});
</script>

<style lang="scss">
@use '../../styles/mixins' as melkor;

.mk-InputIcon,
[data-root='mk-InputIcon'] {
  --mk-input-icon-background-color: var(--mk-input-background-color);
  --mk-input-icon-background-color-hover: var(--mk-input-background-color-hover);
  --mk-input-icon-border-color: var(--mk-input-border-color);
  --mk-input-icon-border-color-hover: var(--mk-input-border-color-hover);
  --mk-input-icon-border-color-focused: var(--mk-input-border-color-focused);
  --mk-input-icon-border-radius-size: var(--mk-input-border-radius-size);
  --mk-input-icon-border-size: var(--mk-input-border-size);
  --mk-input-icon-border-size-hover: var(--mk-input-border-size-hover);
  --mk-input-icon-border-size-focused: var(--mk-input-border-size-focused);
  --mk-input-icon-icon-color: var(--mk-input-text-color);
  --mk-input-icon-placeholder-icon-color: var(--mk-input-placeholder-text-color);
  --mk-input-icon-icon-size: 24px;
  --mk-input-icon-padding-x-size: var(--mk-size-2);
  --mk-input-icon-padding-y-size: var(--mk-size-2);
  --mk-input-icon-value-spacing-size: var(--mk-size-1);

  // Menu
  --mk-input-icon-menu-background-color: var(--mk-shade-0);
  --mk-input-icon-menu-padding-x-size: var(--mk-size-3);
  --mk-input-icon-menu-padding-y-size: var(--mk-size-3);
  --mk-input-icon-menu-grid-column-template: v-bind(cssColumnSize);

  // Menu Option
  --mk-input-icon-option-icon-size: 24px;
  --mk-input-icon-option-padding-size: var(--mk-size-2);
  --mk-input-icon-option-icon-color: var(--mk-input-icon-color);
  --mk-input-icon-option-background-color: var(--mk-shade-1);
  --mk-input-icon-option-background-color-hover: var(--mk-shade-4);
  --mk-input-icon-option-background-color-active: var(--mk-shade-3);
}

.mk-InputIcon {
  display: inline-flex;
  flex-direction: column;
  gap: var(--mk-size-2);
  align-items: flex-start;
  justify-content: flex-start;

  $this: &;

  &-input {
    position: relative;
    padding: var(--mk-input-icon-padding-y-size) var(--mk-input-icon-padding-x-size);
    overflow: hidden;
    background-color: var(--mk-input-icon-background-color);
    border-radius: var(--mk-input-icon-border-radius-size);
    outline: none;
    box-shadow: inset 0 0 0.01px var(--mk-input-icon-border-size) var(--mk-input-icon-border-color);
    transition:
      background-color var(--mk-transition-color-duration),
      opacity var(--mk-transition-opacity-duration),
      box-shadow var(--mk-transition-color-duration);

    &-value {
      display: flex;
      min-width: var(--mk-input-icon-icon-size);
      min-height: var(--mk-input-icon-icon-size);

      .mk-Icon {
        --mk-icon-color: var(--mk-input-icon-icon-color);
        --mk-icon-size: var(--mk-input-icon-icon-size);
      }

      &-placeholder {
        filter: grayscale(1);

        .mk-Icon {
          --mk-icon-color: var(--mk-input-icon-placeholder-icon-color);
        }
      }
    }
  }

  &-menu {
    position: relative;
    padding: var(--mk-input-icon-menu-padding-y-size) 0;
    overflow: hidden;
    background-color: var(--mk-input-icon-menu-background-color);
    border: var(--mk-input-icon-border-size) solid var(--mk-input-icon-border-color);
    border-radius: var(--mk-input-icon-border-radius-size);

    &-empty {
      padding: 0 var(--mk-input-icon-menu-padding-x-size);
    }

    &-content {
      position: relative;
      display: flex;
      flex-direction: column;
      max-height: min(var(--reka-popover-content-available-height), 400px);
      overflow: auto;
    }

    &-counter {
      position: absolute;
      top: var(--mk-input-icon-menu-padding-y-size);
      right: var(--mk-input-icon-menu-padding-x-size);
      z-index: 1;
      font-size: 0.875em;
      color: var(--mk-text-soft-color);
      transform: translate(0, 10%);
    }

    &-category {
      $category: &;

      display: flex;
      flex-direction: column;

      &:last-of-type {
        #{$category} {
          &-grid {
            padding-bottom: 0;
          }
        }
      }

      &-title {
        position: sticky;
        top: 0;
        display: block;
        padding: 0 var(--mk-input-icon-menu-padding-x-size) var(--mk-input-icon-menu-padding-y-size)
          var(--mk-input-icon-menu-padding-x-size);
        font-weight: 700;
        background-color: var(--mk-input-icon-menu-background-color);
      }

      &-grid {
        display: grid;
        grid-template-columns: var(--mk-input-icon-menu-grid-column-template);
        gap: var(--mk-size-1);
        padding: 0 var(--mk-input-icon-menu-padding-x-size) calc(var(--mk-input-icon-menu-padding-y-size) * 2)
          var(--mk-input-icon-menu-padding-x-size);
      }

      &-icon {
        padding: var(--mk-input-icon-option-padding-size);
        background-color: var(--mk-input-icon-option-background-color);
        border-radius: var(--mk-input-icon-border-radius-size);
        box-shadow: inset 0 0 0.01px 0 transparent;
        transition:
          background-color var(--mk-transition-color-duration),
          box-shadow var(--mk-transition-color-duration);

        @include melkor.on-hover {
          background-color: var(--mk-input-icon-option-background-color-hover);
        }

        @include melkor.on-active {
          background-color: var(--mk-input-icon-option-background-color-active);
          box-shadow: inset 0 0 0.01px var(--mk-input-icon-border-size-focused)
            var(--mk-input-icon-border-color-focused);
        }

        .mk-Icon {
          --mk-icon-color: var(--mk-input-icon-option-icon-color);
          --mk-icon-size: var(--mk-input-icon-option-icon-size);
        }
      }
    }
  }

  @include melkor.on-not-disabled {
    @include melkor.on-hover {
      #{$this} {
        &-input {
          background-color: var(--mk-input-icon-background-color-hover);
          box-shadow: inset 0 0 0.01px var(--mk-input-icon-border-size-hover) var(--mk-input-icon-border-color-hover);
        }
      }
    }

    @include melkor.on-focused {
      #{$this} {
        &-input {
          box-shadow: inset 0 0 0.01px var(--mk-input-icon-border-size-focused)
            var(--mk-input-icon-border-color-focused);
        }
      }
    }
  }

  @include melkor.on-disabled {
    #{$this} {
      &-input {
        cursor: not-allowed;
        opacity: var(--mk-input-opacity-disabled);
      }
    }
  }
}
</style>
