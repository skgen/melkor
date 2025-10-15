<template>
  <!-- <NuxtLink> -->
  <slot />
  <!-- </NuxtLink> -->
</template>

<script lang="ts">
import type { NuxtLinkProps } from '#app';

import type { ActiveProps, DisabledProps } from '../../vue/features';

import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'reka-ui';

export type LinkProps = NuxtLinkProps & {
  // /**
  //  * The element or component this component should render as when not a link.
  //  * @defaultValue 'button'
  //  */
  // as?: any;
  // /**
  //  * The type of the button when not a link.
  //  * @defaultValue 'button'
  //  */
  // type?: ButtonHTMLAttributes['type'];
  // /** Will only be active if the current route is an exact match. */
  // exact?: boolean;
  // /** Will only be active if the current route query is an exact match. */
  // exactQuery?: boolean | 'partial';
  // /** Will only be active if the current route hash is an exact match. */
  // exactHash?: boolean;
  // /** The class to apply when the link is inactive. */
  // inactiveClass?: string;
  // custom?: boolean;
  // /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  // raw?: boolean;
  // class?: any;
} & DisabledProps & ActiveProps;
</script>

<script lang="ts" setup>
// const props = defineProps<LinkProps>();

// const nuxtLinkProps = useForwardProps(reactiveOmit(props, 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'href', 'raw', 'custom', 'class'));
</script>
