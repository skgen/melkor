<template>
  <div
    v-if="meta?.props"
    v-theme="theme"
    class="mk-AppComponentPlayground"
  >
  <AppCard>dza</AppCard>
    <!-- <pre>{{ computedProps }}</pre> -->
  </div>
</template>

<script lang="ts" setup>
import { isObject, isString } from 'lodash-es';

type Props = {
  name: string;
};

const props = defineProps<Props>();

const theme = useTheme();

const { meta } = useComponentMeta(props.name);

const computedProps = computed(() => {
  const handledTypes = ['string', 'number', 'boolean'];
  return meta.value?.props.map((value) => {
    const _type = value.type.replace('| undefined', '').trim();
    let type: string | null = null;
    if (handledTypes.includes(_type)) {
      type = _type;
    }
    if (isObject(value.schema) && value.schema.kind === 'enum') {
      const kinds = value.schema.schema?.filter(v => v !== 'undefined');
      if (kinds?.length === 1 && kinds[0] && isString(kinds[0])) {
        const _singleType = kinds[0];
        if (handledTypes.includes(_singleType)) {
          type = _singleType;
        }
      }
    }
    return {
      name: value.name,
      // schema: value.schema,
      required: value.required,
      // __type: value.type,
      type,
    };
  });
});
</script>
