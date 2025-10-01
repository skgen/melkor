<template>
  <div
    class="sk-AppStack"
    :data-type="props.col ? 'col' : 'row'"
    :data-gap="props.gap"
    :data-align="props.align"
    :data-justify="props.justify"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  row?: boolean;
  col?: boolean;
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  wrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  row: false,
  col: false,
  gap: 'm',
  align: 'start',
  justify: 'start',
  wrap: false,
});
</script>

<style lang="scss">
.sk-AppStack {
  display: flex;

  &[data-type='row'] {
    flex-direction: row;
  }

  &[data-type='col'] {
    flex-direction: column;
  }

  &[data-gap='xs'] {
    gap: var(--mk-size-2);
  }

  &[data-gap='s'] {
    gap: var(--mk-size-3);
  }

  &[data-gap='m'] {
    gap: var(--mk-size-3);
  }

  &[data-gap='l'] {
    gap: var(--mk-size-4);
  }

  &[data-gap='xl'] {
    gap: var(--mk-size-5);
  }

  &[data-justify='start'] {
    justify-content: start;
  }

  &[data-justify='end'] {
    justify-content: end;
  }

  &[data-justify='center'] {
    justify-content: center;
  }

  &[data-justify='space-between'] {
    justify-content: space-between;
  }

  &[data-justify='space-around'] {
    justify-content: space-around;
  }

  &[data-align='start'] {
    align-items: start;
  }

  &[data-align='end'] {
    align-items: end;
  }

  &[data-align='center'] {
    align-items: center;
  }

  &[data-align='stretch'] {
    align-items: stretch;
  }

  &[data-align='baseline'] {
    align-items: stretch;
  }

  &[data-wrap='true'] {
    flex-wrap: wrap;
  }
}
</style>
