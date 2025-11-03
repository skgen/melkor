import type { DisabledProps, FocusedProps, HoveredProps } from '../features';

export type CheckableProps = {
  checked?: boolean;
} & DisabledProps & HoveredProps & FocusedProps;
