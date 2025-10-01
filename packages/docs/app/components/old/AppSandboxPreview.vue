<template>
  <div class="sk-AppSandboxPreview">
    <AppStack row align="stretch" justify="space-between">
      <AppCard class="sk-AppSandboxPreview-props">
        <AppStack col gap="xl" align="stretch">
          <span class="sk-AppSandboxPreview-subtitle">
            Props
          </span>
          <AppStack col align="stretch">
            <!-- <template v-for="(propModel, key) of propsModel" :key="key">
              <AppCard v-if="'component' in propModel && 'props' in propModel">
                <component
                  :is="propModel.component"
                  v-bind="propModel.props"
                  v-model="propModel.props.modelValue"
                />
              </AppCard>
              <AppCard v-else-if="propModel.type === 'object'">
                <AppStack col>
                  <span>🚧 Prop : <i>{{ key }}</i></span>
                  <span>🚧 Data type : <i>{{ propModel.type }}</i></span>
                  <span>🚧 Required : <i>{{ propModel.required }}</i></span>
                </AppStack>
              </AppCard>
              <AppCard v-else-if="propModel.type === null">
                <AppStack col>
                  <span>🚧 Prop : <i>{{ key }}</i></span>
                  <span>🚧 Data type : <i>{{ propModel.typeStr }}</i></span>
                  <span>🚧 Required : <i>{{ propModel.required }}</i></span>
                </AppStack>
              </AppCard>
            </template> -->
          </AppStack>
        </AppStack>
      </AppCard>
      <AppCard class="sk-AppSandboxPreview-render">
        <AppStack col gap="xl">
          <span class="sk-AppSandboxPreview-subtitle">
            Preview
          </span>
          <!-- <pre>{{ injectableProps }}</pre> -->
          <!-- <component
            :is="props.previewComponent"
            v-if="injectableProps"
            v-bind="injectableProps"
            v-on="injectableEvents"
          /> -->
        </AppStack>
      </AppCard>
    </AppStack>
    <!-- <pre>{{ props.propsAST.props }}</pre> -->
    <!-- <pre>{{ propsModel }}</pre> -->
    <!-- <slot name="component" :props="props.cProps" /> -->
  </div>
</template>

<script lang="ts" setup generic="T, U">
import type AppInputNumber from '#melkor/components/AppInputNumber';
import type AppInputSelect from '#melkor/components/AppInputSelect';
import type AppInputText from '#melkor/components/AppInputText';
import type { InputNumberProps, InputProps, InputSelectProps, InputTextProps, InputTextValue } from '#melkor/features';
import type { ShallowRef } from 'vue';

import type { NormalizedPropertiesAST, NormalizedProperty } from '@/lib/components';

interface Props {
  // previewComponent: T;
  // propsDefaultOverride?: U;
  // propsAST: NormalizedPropertiesAST;
}

// interface Emits {
//   (event: string, value: any): void;
// };

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

// Defining the model for the form
type PreviewModel = Record<string, {
  required: boolean;
} & (
  {
    type: 'string';
    component: ShallowRef<typeof AppInputText>;
    props: InputTextProps;
  } | {
    type: 'number';
    component: ShallowRef<typeof AppInputNumber>;
    props: InputNumberProps;
  } | {
    type: 'object';
    value: object | null;
    props: {
      code?: string;
    };
    // props: InputNumberProps;
  } /* | {
  type: 'boolean';
  model: InputBooleanModel;
  validate: ValidateInputValue<number>;
  } */ | {
    type: 'enum';
    component: ShallowRef<typeof AppInputSelect<InputTextValue>>;
    props: InputSelectProps<InputTextValue>;
  } | {
    type: null;
    typeStr: string;
  }
)>;

// function generateModelFromAST(normalizedProperty: NormalizedProperty & { type: 'object' }) {
//   const previewModel: PreviewModel = {};
//   for (const key of Object.keys(normalizedProperty.properties)) {
//     const normalizedProp = normalizedProperty.properties[key];
//     let propDefaultOverride = null;
//     if (props.propsDefaultOverride) {
//       propDefaultOverride = props.propsDefaultOverride[key as keyof typeof props.propsDefaultOverride];
//     }
//     // Standard props
//     const baseProps: Omit<InputProps<unknown>, 'modelValue'> = {
//       name: key,
//       label: key,
//     };
//     const required = !!normalizedProp?.required;
//     function hintStr<T>(defaultValue?: T) {
//       if (defaultValue && defaultValue.toString) {
//         return `Default value : ${defaultValue.toString()}`;
//       }
//       return `No Default value`;
//     }

//     if (normalizedProp.type === 'string') {
//       previewModel[key] = {
//         type: 'string',
//         component: shallowRef(AppInputText),
//         required,
//         props: {
//           ...baseProps,
//           modelValue: createInputModel({
//             value: normalizedProp.default
//               ?? (propDefaultOverride as string)
//               ?? null,
//           }),
//           validate: (value) => {
//             if (!isValue(value) && required) {
//               return 'Required';
//             }
//             return null;
//           },
//           hint: hintStr(normalizedProp.default),
//           fill: true,
//         },
//       };
//     }
//     else if (normalizedProp.type === 'number') {
//       previewModel[key] = {
//         type: 'number',
//         component: shallowRef(AppInputNumber),
//         required,
//         props: {
//           ...baseProps,
//           modelValue: createInputModel({
//             value: normalizedProp.default
//               ?? (propDefaultOverride as number)
//               ?? null,
//           }),
//           validate: (value) => {
//             if (!isValue(value) && required) {
//               return 'Required';
//             }
//             return null;
//           },
//           hint: hintStr(normalizedProp.default),
//           fill: true,
//         },
//       };
//     }
//     else if (normalizedProp.type === 'enum') {
//       let options: InputSelectProps<InputTextValue>['options'] = normalizedProp.values.map(value => ({ value }));
//       if (!normalizedProp.default) {
//         options = [
//           { value: null },
//           ...options,
//         ];
//       }
//       previewModel[key] = {
//         type: 'enum',
//         component: shallowRef(AppInputSelect),
//         required,
//         props: {
//           ...baseProps,
//           modelValue: createInputModel({
//             value: normalizedProp.default
//               ?? (propDefaultOverride as string)
//               ?? null,
//           }),
//           validate: (value) => {
//             if (!isValue(value) && required) {
//               return 'Required';
//             }
//             return null;
//           },
//           options,
//           hint: hintStr(normalizedProp.default),
//           fill: true,
//         },
//       };
//     }
//     else if (normalizedProp.type === 'object') {
//       previewModel[key] = {
//         type: 'object',
//         // component: shallowRef(AppInputSelect),
//         required,
//         props: {
//           // code:
//         },
//         value: propDefaultOverride as object ?? null,
//       };
//     }
//     else {
//       if (normalizedProp.type !== null) {
//         previewModel[key] = {
//           type: null,
//           typeStr: normalizedProp.type,
//           required: false,
//         };
//       }
//     }
//   }
//   return previewModel;
// }

// const propsModel = ref<PreviewModel | null>(null);

// watch(() => props.propsAST, (newPropsAST) => {
//   if (newPropsAST.props?.type === 'object') {
//     propsModel.value = generateModelFromAST(newPropsAST.props);
//   }
// }, {
//   immediate: true,
//   deep: true,
// });

// // Injectable props for the preview

// type InjectableProps = Record<string, unknown>;

// function transformModelToInjectableProps(model: PreviewModel): InjectableProps {
//   const injectableProps = Object.entries(model).reduce<InjectableProps>((acc, [key, value]) => {
//     if ('props' in value && 'modelValue' in value.props) {
//       acc[key] = value.props.modelValue.value;
//     }
//     else if (value.type === 'object') {
//       acc[key] = value.value;
//     }
//     else {
//       acc[key] = null;
//     }
//     return acc;
//   }, {});
//   return injectableProps;
// }

// const injectableProps = ref<InjectableProps | null>(null);

// watch(propsModel, (newPropsModel) => {
//   if (newPropsModel) {
//     injectableProps.value = transformModelToInjectableProps(newPropsModel);
//   }
// }, {
//   immediate: true,
//   deep: true,
// });

// const injectableEvents = computed(() =>
//   injectableProps.value
//     ? Object.keys(injectableProps.value)
//         .reduce((acc, key) => {
//           acc[`update:${key}`] = (value: any) => handlePreviewUpdate(key, value);
//           return acc;
//         }, {} as Record<string, (value: any) => void>)
//     : {});

// function handlePreviewUpdate<T>(key: string, value: T) {
//   if (!propsModel.value) {
//     return;
//   }
//   const propModel = propsModel.value[key];
//   if (propModel.type === 'object') {
//     propModel.value = value as object | null;
//   }
// }
</script>

<style lang="scss">
.sk-AppSandboxPreview {
  // display: flex;
  // spa

  &-render,
  &-props {
    flex: 1 1 100%;
  }

  &-subtitle {
    font-size: 1.5rem;
  }
}
</style>
