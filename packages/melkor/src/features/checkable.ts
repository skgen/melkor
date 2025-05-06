import type { DisabledProps, HoveredProps } from './interactions';

export type CheckableProps = {
  checked?: boolean;
} & DisabledProps & HoveredProps;
