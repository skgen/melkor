import type { DisabledProps, FocusedProps, HoveredProps } from '#melkor/features';

export type CheckableProps = {
  checked?: boolean;
} & DisabledProps & HoveredProps & FocusedProps;
