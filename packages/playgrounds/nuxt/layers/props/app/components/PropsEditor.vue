<template>
  <div class="sk-PropsEditor">
    <div class="sk-PropsEditor-list">
      <template
        v-for="[propName, propConfig] of Object.entries(_props)"
        :key="propName"
      >
        <MkTooltip>
          <MkCard class="sk-PropsEditor-prop">
            <div><em>{{ propName }}</em></div>
            <div>
              <PropsScalarEditor
                v-if="propConfig.propType === 'scalar'"
                :type="propConfig.type"
                :required="propConfig.required"
                :value="propConfig.value"
                :on-change="(v: any) => handleChange(v, propName)"
              />
              <PropsArrayEditor
                v-else-if="propConfig.propType === 'array'"
              />
              <PropsUnsupportedEditor v-else />
            </div>
          </MkCard>
          <template #tooltip>
            <pre>{{ propConfig }}</pre>
          </template>
        </MkTooltip>
      </template>
    </div>
    <!-- <pre>{{ _props }}</pre> -->
    <!-- <template v-for=""></template> -->
  </div>
</template>

<script lang="ts" setup>
import type { ComponentMeta, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';

type Props = {
  propsMeta: ComponentMeta['props'];
};

type Emits = {
  change: [newProps: Record<string, any>];
  mounted: [newProps: Record<string, any>];
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const filteredProps = [
  'stringPropArray',
  'stringPropArrayWithDefault',
  'maybeStringPropArray',
  'maybeStringPropArrayWithDefault',
  'unionPropArray',
  'unionPropArrayWithDefault',
  'maybeUnionPropArray',
  'maybeUnionPropArrayWithDefault',
];

const _props: {
  [key: string]: ArrayProp | SingleProp;
} = reactive({});

for (const prop of props.propsMeta) {
  if (filteredProps.includes(prop.name)) {
    _props[prop.name] = resolvePropType(prop);
  }
}

const mappedProps = computed(() => Object.entries(_props).reduce((acc, [propName, propConfig]) => {
  if ('value' in propConfig) {
    acc[propName] = propConfig.value;
  }
  return acc;
}, {} as Record<string, any>));

watch(mappedProps, (newMappedProps) => {
  emit('change', newMappedProps);
});

function handleChange(v: any, propName: string) {
  if (_props[propName] && 'value' in _props[propName]) {
    _props[propName].value = v;
  }
}

onMounted(() => {
  emit('mounted', mappedProps.value);
});
</script>

<style lang="scss">
.sk-PropsEditor {
  display: flex;
  align-items: center;
  justify-content: center;

  &-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--mk-size-8);
    align-items: stretch;
  }

  &-prop {
    display: flex;
    flex-direction: column;
    gap: var(--mk-size-3);
  }
}
</style>
