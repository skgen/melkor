export type Framework = 'vue' | 'nuxt';

export function useFramework() {
  const framework = useCookie<Framework>(
    'melkor-framework',
    {
      default: () => 'nuxt',
    },
  );
  const frameworks = computed<{
    title: string;
    icon: string;
    value: Framework;
    active: boolean;
  }[]>(() => [
    {
      title: 'Nuxt',
      icon: 'simple-icons:nuxt',
      value: 'nuxt',
      active: framework.value === 'nuxt',
    },
    {
      title: 'Vue',
      icon: 'simple-icons:vuedotjs',
      value: 'vue',
      active: framework.value === 'vue',
    },
  ]);

  return {
    framework,
    frameworks,
  };
}
