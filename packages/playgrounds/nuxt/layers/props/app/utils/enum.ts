// import type { PropertyMeta, PropertyMetaSchema } from 'vue-component-meta';

// import { isObject } from 'lodash-es';

// type EnumSchema = {
//   kind: 'enum';
//   type: string;
//   schema?: PropertyMetaSchema[];
// };

// export function isEnum(prop: PropertyMeta) {
//   return isObject(prop.schema) && prop.schema.kind === 'enum';
// }

// export type EnumProp = {
//   value: ScalarProp['value'];
//   propType: 'enum';
//   options: ScalarProp[];
// };

// export function createEnum(prop: PropertyMeta): EnumProp | null {
//   if (!isEnum(prop)) {
//     return null;
//   }
//   console.log(prop);

//   const schema = prop.schema;
//   // const { schema: childrenSchema } = prop.schema;
//   // if (!childrenSchema) {
//   //   return null;
//   // }
//   // let value = prop.default ?? null;
//   // const options: ScalarProp[] = [];

//   // for (const option of childrenSchema) {
//   //   if (isScalar(option)) {
//   //     options.push(createScalar(option));
//   //   }
//   // }
//   return null;
// }
