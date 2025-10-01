import type { ContentNavigationItem, PageCollections } from '@nuxt/content';

export type EnhancedContentNavigationItem = ContentNavigationItem & {
  icon?: string;
  shadow?: boolean;
  framework?: Framework;
  category?: string;
  children?: EnhancedContentNavigationItem[];
};

function processNavigationItem(item: EnhancedContentNavigationItem, framework: Framework): EnhancedContentNavigationItem[] {
  const children = item.children?.flatMap(child => processNavigationItem(child, framework)) ?? [];
  if (item.shadow) {
    return children.filter((v) => {
      // This keeps only the routes that match framework based on route last path
      return v.path.split('/').slice(-1)[0] === framework;
    });
  }
  return [{
    ...item,
    children,
  }];
}

export async function useNavigation(scope: Ref<keyof PageCollections>) {
  const { framework } = useFramework();
  const { data: rawNavigation } = await useAsyncData(
    scope ? `${scope.value}-navigation` : 'navigation',
    () => queryCollectionNavigation(scope.value),
  );

  const navigation: Ref<EnhancedContentNavigationItem[]> = computed(() => {
    const baseNavigation = rawNavigation.value ? rawNavigation.value[0]?.children ?? [] : [];
    const mappedNavigation = baseNavigation.map(v => processNavigationItem(v, framework.value).flat()).flat();
    return mappedNavigation;
  });
  return navigation;
}
