<template>
  <Primitive
    v-bind="forwardedProps"
    @click="(event: MouseEvent) => emit('click', event)"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
import type { ActiveProps, DisabledProps, ExtractEmitsAsFunctions } from '../features';

import { computed } from 'vue';

export type LinkBaseProps = {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
  isExternal?: boolean;
  /**
   * HTML element of fallback if no href or not click event
   */
  fallback?: string;
} & DisabledProps
& ActiveProps;

export interface LinkBaseEmits {
  click: [event: MouseEvent];
  unclick: [event: MouseEvent];
}
</script>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { getCurrentInstance } from 'vue';

const props = withDefaults(
  defineProps<LinkBaseProps>(),
  {
    fallback: 'span',
  },
);

const emit = defineEmits<LinkBaseEmits>();

const forwardedProps = computed(() => {
  const instance = getCurrentInstance();
  const onClick = instance?.vnode.props?.onClick as ExtractEmitsAsFunctions<LinkBaseEmits>['click'] | undefined;

  const _forwardedProps: PrimitiveProps & Record<string, string> = {};

  const isInteractive = !!(props.href || onClick);

  if (isInteractive) {
    if (props.disabled) {
      _forwardedProps['aria-disabled'] = 'true';
      _forwardedProps.disabled = 'true';
      _forwardedProps.tabindex = '-1';
    }
  }

  if (props.href) {
    _forwardedProps.as = 'a';
    _forwardedProps.href = props.href;
    if (props.disabled) {
      _forwardedProps.role = 'link';
    }
    if (props.rel) {
      _forwardedProps.rel = props.rel;
    }
    if (props.target) {
      _forwardedProps.target = props.target;
    }
  }
  else if (onClick) {
    _forwardedProps.as = 'button';
    _forwardedProps.type = 'button';
  }
  else {
    _forwardedProps.as = props.fallback;
  }
  return _forwardedProps;
});
</script>
