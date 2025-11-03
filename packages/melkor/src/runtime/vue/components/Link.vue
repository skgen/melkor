<template>
  <!-- <NuxtLink> -->
  <RouterLink>
    <a href="">
      <slot />
    </a>
  </RouterLink>
  <!-- </NuxtLink> -->
</template>

<script lang="ts">
import type { ActiveProps, DisabledProps } from '../features';

import { type RouteLocationRaw, RouterLink, type RouterLinkProps } from 'vue-router';

export type LinkProps = Omit<RouterLinkProps, 'to'> & {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: RouteLocationRaw; // need to manually type to avoid breaking typedPages
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: LinkProps['to'];
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean;
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean;
  /**
   * Will only be active if the current route is an exact match.
   */
  activeIfExact?: boolean;
  /**
   * Will only be active if the current route hash is an exact match.
   */
  activeIfExactQuery?: boolean | 'partial';
} & DisabledProps & ActiveProps;
// import type { NuxtLinkProps } from '#app';

// export type LinkProps = NuxtLinkProps & {
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
// } & DisabledProps & ActiveProps;
</script>

<script lang="ts" setup>
// const props = defineProps<LinkProps>();

// const nuxtLinkProps = useForwardProps(reactiveOmit(props, 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'href', 'raw', 'custom', 'class'));
</script>
