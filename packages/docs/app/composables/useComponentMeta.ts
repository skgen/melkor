import meta from '#melkor/meta';

export function useComponentMeta(componentName: string) {
  return {
    meta: computed(() => meta.components.find(c => c.name === componentName)?.component ?? null),
  };
}
