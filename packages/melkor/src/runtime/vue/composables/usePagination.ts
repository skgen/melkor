import type { ComputedRef, Ref } from 'vue';

import { toRefs } from '@vueuse/core';
import { computed } from 'vue';

export interface UsePaginationOptions {
  page: number;
  range: [number, number];
  gap?: number;
}

const defaultParams: Required<Pick<UsePaginationOptions, 'gap'>> = {
  gap: 1,
};

export function usePagination(params: UsePaginationOptions): Readonly<{
  firstPage: ComputedRef<number>;
  lastPage: ComputedRef<number>;
  gap: ComputedRef<number>;
  page: Ref<number, number>;
  range: Ref<[number, number], [number, number]>;
  prevCta: ComputedRef<boolean>;
  slotsRange: ComputedRef<(number | null)[]>;
  nextCta: ComputedRef<boolean>;
}> {
  const refParams = {
    ...toRefs(params),
    gap: computed(() => params.gap ?? defaultParams.gap),
  };
  const firstPage = computed(() => Math.min(refParams.range.value[0], refParams.range.value[1]));
  const lastPage = computed(() => Math.max(refParams.range.value[0], refParams.range.value[1]));
  const totalPages = computed(() => (lastPage.value - firstPage.value) + 1);

  const displayRangeMaxSize = computed(() => 1 + (refParams.gap.value + 1 + refParams.gap.value) + 1);
  const displayRangeSize = computed(() => Math.min(totalPages.value - 2, displayRangeMaxSize.value));

  function fill(): (number | null)[] {
    const rawBase = Array.from<number | null>({ length: displayRangeSize.value }).fill(null);
    if (rawBase.length === totalPages.value - 2) {
      const withoutGap = rawBase.map<number>((_, i) => firstPage.value + i + 1);
      return withoutGap;
    }
    if (firstPage.value + (refParams.gap.value + 1 + 1) >= refParams.page.value) {
      const withoutGap = rawBase.map<number>((_, i) => firstPage.value + i + 1);
      const lastWithoutGap = withoutGap[withoutGap.length - 1];
      if (withoutGap.length === displayRangeMaxSize.value && lastWithoutGap && lastWithoutGap + 1 === lastPage.value) {
        return withoutGap;
      }
      const withGap: (number | null)[] = withoutGap;
      withGap[withGap.length - 1] = null;
      return withGap;
    }
    if (lastPage.value - (refParams.gap.value + 1 + 1) <= refParams.page.value) {
      const withoutGap = rawBase.map<number>((_, i) => lastPage.value - i - 1).reverse();
      const firstWithoutGap = withoutGap[0];
      if (withoutGap.length === displayRangeMaxSize.value && firstWithoutGap && firstWithoutGap - 1 === firstPage.value) {
        return withoutGap;
      }
      const withGap: (number | null)[] = withoutGap;
      withGap[0] = null;
      return withGap;
    }
    const withoutGap = [...rawBase];
    for (let i = 1; i < rawBase.length - 1; i += 1) {
      withoutGap[i] = refParams.page.value - refParams.gap.value + i - 1;
    }
    return withoutGap;
  }

  return {
    firstPage,
    lastPage,
    ...refParams,
    prevCta: computed(() => refParams.page.value > firstPage.value),
    slotsRange: computed(() => fill()),
    nextCta: computed(() => refParams.page.value < lastPage.value),
  };
};
