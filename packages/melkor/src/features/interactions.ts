export type InteractionStateProps = ActiveProps & HoveredProps & DisabledProps & FocusedProps;

export type ActiveProps = {
  active?: boolean;
};
export type HoveredProps = {
  hovered?: boolean;
};
export type DisabledProps = {
  disabled?: boolean;
};
export type FocusedProps = {
  focused?: boolean;
};

export function bindInteractionStateProps(props: InteractionStateProps & Record<string, unknown>): {
  [K in keyof InteractionStateProps as `data-is-${K}`]?: InteractionStateProps[K];
} {
  const allowedKeys = new Set<keyof InteractionStateProps>([
    'active',
    'hovered',
    'disabled',
    'focused',
  ]);

  const filtered = Object.keys(props).filter(key => allowedKeys.has(key as keyof InteractionStateProps));

  return filtered.reduce((acc, key) => {
    acc[`data-is-${key as keyof InteractionStateProps}`] = props[key as keyof InteractionStateProps] || undefined;
    return acc;
  }, {} as {
    [K in keyof InteractionStateProps as `data-is-${K}`]?: InteractionStateProps[K];
  });
}
