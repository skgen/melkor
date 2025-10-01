// import type { NormalizedPropertiesAST } from '~/lib/components';

// export interface UseComponentPropsPreviewOptions {
//   component: string;
// }

// export async function useComponentPropsAST(options: UseComponentPropsPreviewOptions): Promise<{
//   propsAST: ComputedRef<NormalizedPropertiesAST | null>;
// }> {
//   const { data } = await useAsyncData(`${options.component}Props`, () => {
//     return queryCollection('componentPropsSchema')
//       .where('stem', '=', `generated/components/${options.component}-props-schema`)
//       .first();
//   });

//   return {
//     propsAST: computed(() => data.value?.meta ?? null) as ComputedRef<NormalizedPropertiesAST | null>,
//   };
// }
