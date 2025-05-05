import type { DisabledProps, HoveredProps } from '.';

export type CheckableProps = {
  checked?: boolean;
} & DisabledProps & HoveredProps;
