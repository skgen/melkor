import type { TooltipContentProps, TooltipRootEmits, TooltipRootProps } from 'reka-ui';
import type { Slot } from 'vue';

export type TooltipProps = Pick<TooltipRootProps, 'open' | 'delayDuration' | 'disableClosingTrigger' | 'disabled' | 'disableHoverableContent' | 'ignoreNonKeyboardFocus'>
  & Pick<TooltipContentProps, 'align' | 'alignOffset' | 'side' | 'sideOffset' | 'ariaLabel' | 'avoidCollisions' | 'collisionPadding' | 'hideWhenDetached' | 'positionStrategy' | 'sticky' | 'updatePositionStrategy'>;

export type TooltipEmits = TooltipRootEmits;

export type TooltipSlots = {
  default?: Slot;
  tooltip?: Slot;
};
