import type { PropertyMeta } from 'vue-component-meta';

export type Meta = {
  schema: Schema;
  components: {
    name: string;
    component: ComponentMeta;
    css: CssMeta | null;
  }[];
};

export type SchemaModule = {
  name: string;
  module: string;
  types: string;
};

export type Schema = {
  components: SchemaModule[];
  composables: SchemaModule[];
};

export type ComponentMeta = {
  props: Omit<PropertyMeta, 'declarations'>[];
};

export type CssMeta = {
  variables: { key: string; value: string }[];
};

declare const meta: Meta;
export default meta;
