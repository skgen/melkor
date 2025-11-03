<template>
  <div class="mk-Demo">
    <div v-for="([propName, propValue]) of Object.entries(props)" :key="propName" class="mk-Demo-prop">
      <div>
        <strong>Prop name:</strong><Prose as="div">
          <code>{{ propName }}</code>
        </Prose>
      </div>
      <div>
        <strong>Props value:</strong><Prose as="div">
          <pre>{{ propValue }}</pre>
        </Prose>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export type DemoProps = {
  stringProp: string;
  stringPropWithDefault: string;
  maybeStringProp?: string;
  maybeStringPropWithDefault?: string;
  //
  numberProp: number;
  numberPropWithDefault: number;
  maybeNumberProp?: number;
  maybeNumberPropWithDefault?: number;
  //
  booleanProp: boolean;
  maybeBooleanProp?: boolean;
  booleanPropWithDefault: boolean;
  maybeBooleanPropWithDefault?: boolean;
  //
  stringPropArray: string[];
  stringPropArrayWithDefault: string[];
  maybeStringPropArray?: string[];
  maybeStringPropArrayWithDefault?: string[];
  //
  unionPropArray: (string | number)[];
  unionPropArrayWithDefault: (string | number)[];
  maybeUnionPropArray?: (string | number)[];
  maybeUnionPropArrayWithDefault?: (string | number)[];
  //
  // numberTuple: [number, number];
  // maybeNumberTuple?: [number, number];
  // maybeStringArray?: string[];
  // maybeStringOrBooleanOrNumberArray?: (string | boolean | number)[];
};
</script>

<script lang="ts" setup>
import { Prose } from '../components';

const props = withDefaults(
  defineProps<DemoProps>(),
  {
    stringPropWithDefault: 'stringPropWithDefault',
    maybeStringPropWithDefault: 'maybeStringPropWithDefault',
    numberPropWithDefault: 123,
    maybeNumberPropWithDefault: 456,
    booleanPropWithDefault: true,
    maybeBooleanPropWithDefault: true,
    stringPropArrayWithDefault: () => ['stringPropArrayWithDefault #1', 'stringPropArrayWithDefault #2'],
    maybeStringPropArrayWithDefault: () => ['maybeStringPropArrayWithDefault #1', 'maybeStringPropArrayWithDefault #2'],
    unionPropArrayWithDefault: () => ['unionPropArrayWithDefault', 123],
    maybeUnionPropArrayWithDefault: () => ['maybeUnionPropArrayWithDefault', 456],
  },
);
</script>

<style lang="scss">
.mk-Demo {
  display: flex;
  flex-direction: column;
  gap: var(--mk-size-4);

  &-prop {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-1);
    padding-block-start: var(--mk-size-2);

    & + & {
      padding-block-start: var(--mk-size-2);
      border-block-start: 1px solid var(--mk-border-color);
    }

    > * {
      display: flex;
      gap: var(--mk-size-2);
      align-items: center;
    }
  }
}
</style>
