import type { PropertyAST } from '~/lib/components';

export interface UseComponentPropsPreviewOptions {
  component: string;
}

export async function useComponentPropsPreview(options: UseComponentPropsPreviewOptions): Promise<{
  propsPreview: ComputedRef<PropertyAST['props'] | null>;
  rootPreview: ComputedRef<PropertyAST | null>;
}> {
  const { data } = await useAsyncData(`${options.component}Props`, () => {
    return queryCollection('componentPropsSchema')
      .where('stem', '=', `generated/components/${options.component}-props-schema`)
      .first();
  });

  return {
    propsPreview: computed(() => data.value?.props ?? null),
    rootPreview: computed(() => data.value ?? null) as ComputedRef<PropertyAST | null>,
  };
}
