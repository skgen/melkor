<template>
  <Primitive
    v-theme="theme"
    class="mk-AppProse"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui';

import { reactivePick } from '@vueuse/core';
import { Primitive, useForwardProps } from 'reka-ui';

import { useTheme } from '../../composables';

type Props = Pick<PrimitiveProps, 'asChild'>;

const props = defineProps<Props>();

const theme = useTheme();
</script>

<style lang="scss">
.mk-AppProse {
  --mk-prose-background-color: transparent;
  --mk-prose-background-color-soft: var(--mk-shade-2);
  --mk-prose-background-color-highlight: var(--mk-shade-3);
  --mk-prose-border-color: var(--mk-shade-3);
  --mk-prose-border-soft-color: var(--mk-shade-6);
  --mk-prose-font-family: var(--mk-font-family);
  --mk-prose-font-size: 1rem;
  --mk-prose-line-height: var(--mk-line-height);
  --mk-prose-text-color: var(--mk-text-color);
  --mk-prose-text-color-accent: var(--mk-primary);
  --mk-prose-text-soft-color: var(--mk-text-soft-color);
  --mk-prose-background-color-attention: var(--mk-shade-3);
  --mk-prose-text-color-attention: var(--mk-text-color);

  margin: 0;
  font-family: var(--mk-prose-font-family);
  font-size: var(--mk-prose-font-size);
  line-height: var(--mk-prose-line-height);
  color: var(--mk-prose-text-color);
  word-wrap: break-word;
  background-color: var(--mk-prose-background-color);
  text-size-adjust: 100%;

  @mixin prose-selector($selector, $append: '') {
    :where(#{$selector}):not(:where([data-not-prose], [data-not-prose] *))#{$append} {
      @content;
    }
  }

  @include prose-selector('.mk-AppProse > :first-child') {
    margin-top: 0 !important;
  }

  @include prose-selector('.mk-AppProse > :last-child') {
    margin-bottom: 0 !important;
  }

  @include prose-selector('section') {
    margin-top: 3em;
    margin-bottom: 3em;
  }

  // @include prose-selector('details, figcaption, figure') {
  //   display: block;
  // }

  // @include prose-selector('summary') {
  //   display: list-item;
  // }

  // @include prose-selector('[hidden]') {
  //   display: none !important;
  // }

  // @include prose-selector('a') {
  //   color: var(--mk-prose-text-color-accent);
  //   text-decoration: none;
  //   background-color: transparent;

  //   &:hover {
  //     text-decoration: underline;
  //   }

  //   &:hover,
  //   &:active {
  //     outline-width: 0;
  //   }

  //   &:not([href]) {
  //     color: inherit;
  //     text-decoration: none;
  //   }
  // }

  // @include prose-selector('sub, sup') {
  //   position: relative;
  //   font-size: 0.75em;
  //   line-height: 0;
  //   vertical-align: baseline;
  // }

  // @include prose-selector('sub') {
  //   bottom: -0.25em;
  // }

  // @include prose-selector('sub, sub') {
  //   top: -0.5em;

  //   @include prose-selector('> a') {
  //     &::before {
  //       content: '[';
  //     }

  //     &::after {
  //       content: ']';
  //     }
  //   }
  // }

  // @include prose-selector('abbr[title]') {
  //   text-decoration: underline dotted;
  //   border-bottom: none;
  // }

  // @include prose-selector('b, strong') {
  //   font-weight: 600;
  // }

  // @include prose-selector('dfn') {
  //   font-style: italic;
  // }

  // @include prose-selector('mark') {
  //   color: var(--mk-prose-text-color-attention);
  //   background-color: var(--mk-prose-background-color-attention);
  // }

  // @include prose-selector('small') {
  //   font-size: 0.9em;
  // }

  // @include prose-selector('img') {
  //   box-sizing: content-box;
  //   max-width: 100%;
  //   border-style: none;
  // }

  // @include prose-selector('code, kbd, pre, samp') {
  //   font-family: monospace;
  //   font-size: 1em;
  // }

  // @include prose-selector('figure') {
  //   margin: 1em var(--mk-size-10);
  // }

  @include prose-selector('hr') {
    box-sizing: content-box;
    height: 0.25em;
    margin-top: 3em;
    margin-bottom: 3em;
    overflow: hidden;
    background-color: var(--mk-prose-border-color);
    border: 0;

    // border-bottom: 1px solid var(--mk-prose-border-soft-color);
  }

  @include prose-selector('hr', '::before') {
    display: table;
    content: '';
  }

  @include prose-selector('hr', '::after') {
    display: table;
    clear: both;
    content: '';
  }

  // @include prose-selector('input') {
  //   margin: 0;
  //   overflow: visible;
  //   font: inherit;
  //   font-family: inherit;
  //   font-size: inherit;
  //   line-height: inherit;
  // }

  // @include prose-selector("[type='button'], [type='reset'], [type='submit']") {
  //   appearance: button;

  //   &::-moz-focus-inner {
  //     padding: 0;
  //     border-style: none;
  //   }

  //   &:-moz-focusring {
  //     outline: 1px dotted ButtonText;
  //   }
  // }

  // @include prose-selector("[type='checkbox'], [type='radio']") {
  //   box-sizing: border-box;
  //   padding: 0;
  // }

  // @include prose-selector("[type='number']") {
  //   &::-webkit-inner-spin-button,
  //   &::-webkit-outer-spin-button {
  //     height: auto;
  //   }
  // }

  // @include prose-selector("[type='search']") {
  //   appearance: textfield;
  //   outline-offset: -2px;

  //   &::-webkit-search-cancel-button,
  //   &::-webkit-search-decoration {
  //     appearance: none;
  //   }
  // }

  // @include prose-selector('::-webkit-file-upload-button') {
  //   font: inherit;
  //   appearance: button;
  // }

  // @include prose-selector('details') {
  //   @include prose-selector('summary') {
  //     cursor: pointer;
  //   }

  //   &:not[open] {
  //     > *:not(summary) {
  //       display: none !important;
  //     }
  //   }
  // }

  // @include prose-selector('kbd') {
  //   display: inline-block;
  //   padding: var(--mk-size-1) var(--mk-size-2);
  //   font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  //   font-size: 11px;
  //   line-height: 10px;
  //   color: var(--mk-prose-text-color);
  //   vertical-align: middle;
  //   background-color: var(--mk-prose-background-color-soft);
  //   border: solid 1px var(--mk-prose-border-soft-color);
  //   border-radius: var(--mk-border-radius-size);
  //   box-shadow: inset 0 -1px 0 var(--mk-prose-border-soft-color);
  // }

  // @include prose-selector('h1, h2, h3, h4, h5, h6') {
  //   margin-top: var(--mk-size-6);
  //   margin-bottom: var(--mk-size-4);
  //   font-weight: 600;
  //   line-height: 1.25;
  // }

  @include prose-selector('h1') {
    margin-top: 0.8em;
    margin-bottom: 0.8em;
    font-size: 2.5em;
    font-weight: 800;
    line-height: 1;
  }

  @include prose-selector('h2') {
    margin-top: 1.8em;
    margin-bottom: 1em;
    font-size: 1.6em;
    font-weight: 700;
    line-height: 1.3;
  }

  @include prose-selector('h3') {
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    font-size: 1.3em;
    font-weight: 600;
    line-height: 1.5;
  }

  @include prose-selector('h4') {
    margin-top: 1.6em;
    margin-bottom: 0.4em;
    font-size: 1em;
    font-weight: 600;
  }

  // @include prose-selector('h5') {
  //   font-size: 0.875em;
  //   font-weight: 600;
  // }

  // @include prose-selector('h6') {
  //   font-size: 0.85em;
  //   font-weight: 600;
  //   color: var(--mk-prose-text-soft-color);
  // }

  // @include prose-selector('blockquote') {
  //   padding: 0 1em;
  //   margin: 0;
  //   color: var(--mk-prose-text-soft-color);
  //   border-left: 0.25em solid var(--mk-prose-border-color);

  //   > :first-child {
  //     margin-top: 0;
  //   }

  //   > :last-child {
  //     margin-bottom: 0;
  //   }
  // }

  @include prose-selector('p, blockquote, ul, ol, dl, pre, details') {
    margin: 1.3em 0;
  }

  // @include prose-selector('ul, ol') {
  //   padding-left: 1.625em;
  //   margin-top: 1.25em;
  //   margin-bottom: 1.25em;
  // }

  // @include prose-selector('ol') {
  //   list-style-type: decimal;
  // }

  // @include prose-selector('ol > li', '::marker') {
  //   font-weight: 400;
  //   color: var(--mk-prose-text-soft-color);
  // }

  // @include prose-selector('ul') {
  //   list-style-type: disc;
  // }

  // @include prose-selector('ul ul, ul ol, ol ol, ol ul') {
  //   margin-top: 1em;
  //   margin-bottom: 1em;
  // }

  // @include prose-selector('ol ol, ul ol') {
  //   list-style-type: lower-roman;
  // }

  // @include prose-selector('ul ul ol, ul ol ol, ol ul ol, ol ol ol') {
  //   list-style-type: lower-alpha;
  // }

  // @include prose-selector('dd') {
  //   margin-left: 0;
  // }

  // @include prose-selector('tt, code') {
  //   padding: 0.2em 0.4em;
  //   margin: 0;
  //   font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  //   font-size: 0.85em;
  //   background-color: var(--mk-prose-background-color-highlight);
  //   border-radius: var(--mk-border-radius-size);

  //   @include prose-selector('br') {
  //     display: none;
  //   }
  // }

  // @include prose-selector('pre') {
  //   padding: var(--mk-size-4);
  //   margin-top: 0;
  //   margin-bottom: 0;
  //   overflow: auto;
  //   font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
  //   font-size: 0.85em;
  //   line-height: 1.45;
  //   word-wrap: normal;
  //   background-color: var(--mk-prose-background-color-soft);
  //   border-radius: var(--mk-border-radius-size);

  //   @include prose-selector('code') {
  //     font-size: 1em;
  //   }

  //   @include prose-selector('> code') {
  //     padding: 0;
  //     margin: 0;
  //     word-break: normal;
  //     white-space: pre;
  //     background: transparent;
  //     border: 0;
  //   }

  //   @include prose-selector('code, tt') {
  //     display: inline;
  //     max-width: none;
  //     padding: 0;
  //     margin: 0;
  //     overflow: visible;
  //     line-height: inherit;
  //     word-wrap: normal;
  //     background-color: transparent;
  //     border: 0;
  //   }
  // }

  // @include prose-selector('::placeholder') {
  //   color: var(--mk-prose-text-soft-color);
  //   opacity: 1;
  // }

  // @include prose-selector('input::-webkit-outer-spin-button, input::-webkit-inner-spin-button') {
  //   margin: 0;
  //   appearance: none;
  // }

  // @include prose-selector("ol[type='1']") {
  //   list-style-type: decimal;
  // }

  // @include prose-selector("ol[type='a']") {
  //   list-style-type: lower-alpha;
  // }

  // @include prose-selector("ol[type='i']") {
  //   list-style-type: lower-roman;
  // }

  // @include prose-selector('li') {
  //   & + li {
  //     margin-top: 0.25em;
  //   }

  //   > p {
  //     margin-top: var(--mk-size-4);
  //   }
  // }

  // @include prose-selector('dl') {
  //   padding: 0;

  //   @include prose-selector('dt') {
  //     padding: 0;
  //     margin-top: var(--mk-size-4);
  //     font-size: 1em;
  //     font-style: italic;
  //     font-weight: 600;
  //   }

  //   @include prose-selector('dd') {
  //     padding: 0 var(--mk-size-4);
  //     margin-bottom: var(--mk-size-4);
  //   }
  // }

  @include prose-selector('table') {
    display: block;
    width: max-content;
    max-width: 100%;
    margin-top: 0;
    margin-bottom: var(--mk-size-4);
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;
  }

  @include prose-selector('thead th') {
    font-weight: 600;
  }

  @include prose-selector('thead th, tbody td') {
    padding: var(--mk-size-2) var(--mk-size-4);
    border: 1px solid var(--mk-prose-border-color);
  }

  @include prose-selector('thead tr, tbody tr') {
    background-color: var(--mk-prose-background-color);
    border-top: 1px solid var(--mk-prose-border-soft-color);

    &:nth-child(2n) {
      background-color: var(--mk-prose-background-color-soft);
    }
  }

  // @include prose-selector('img') {
  //   background-color: transparent;
  // }

  // @include prose-selector('del') {
  //   @include prose-selector('code') {
  //     text-decoration: inherit;
  //   }
  // }

  // /* stylelint-disable-next-line no-duplicate-selectors */
  // @include prose-selector('pre code, pre tt') {
  //   display: inline;
  //   max-width: none;
  //   padding: 0;
  //   margin: 0;
  //   overflow: visible;
  //   line-height: inherit;
  //   word-wrap: normal;
  //   background-color: transparent;
  //   border: 0;
  // }
}
</style>
