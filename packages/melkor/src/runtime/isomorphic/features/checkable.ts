import type { DisabledProps, FocusedProps, HoveredProps } from './interactions';

export type CheckableProps = {
  checked?: boolean;
} & DisabledProps & HoveredProps & FocusedProps;
