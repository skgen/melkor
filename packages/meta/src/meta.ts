import type { PropertyMeta } from 'vue-component-meta';

export type Meta = {
  vue: ContextMeta;
  nuxt: ContextMeta;
};

export type ContextMeta = {
  components: SFCMeta[];
};

export type SFCMeta = {
  name: string;
  component: SFCComponentMeta;
  css: SFCCssMeta;
};

export type SFCComponentMeta = {
  props: Omit<PropertyMeta, 'declarations'>[];
};

export type SFCCssMeta = {
  variables: { key: string; value: string }[];
};
