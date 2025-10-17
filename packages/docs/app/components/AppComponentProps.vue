<template>
  <div
    v-if="meta?.props"
    v-theme="theme"
    class="sk-AppComponentProps"
  >
    <MkProse>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Default</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prop, index) in meta.props" :key="prop.name">
            <td>
              <strong>
                <ProseCode>
                  {{ prop.name }}
                </ProseCode>
              </strong>
            </td>
            <td>
              <AppHighlightType v-if="prop.default" :code="prop.default" />
            </td>
            <td>
              <AppHighlightType v-if="prop.type" :code="prop.type" />
            </td>
          </tr>
        </tbody>
      </table>
    </MkProse>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  name: string;
};

const props = defineProps<Props>();

const theme = useTheme();

const { meta } = useComponentMeta(props.name);
</script>

<!-- <style lang="scss">
.sk-AppComponentProps {
}
</style> -->
