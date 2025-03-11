export interface NavigationLevel {
  label: string;
  path?: string;
  children?: NavigationLevel[];
}

export const asideNavigation: NavigationLevel[] = [
  {
    label: 'Global',
    children: [
      {
        label: 'Theme generator',
        path: '/theme/generator',
      },
    ],
  },
  {
    label: 'Components',
    children: [
      {
        label: 'Button',
        path: '/components/button',
      },
      {
        label: 'Text Input',
        path: '/components/input-text',
      },
      {
        label: 'Number Input',
        path: '/components/input-number',
      },
      {
        label: 'Color Input',
        path: '/components/input-color',
      },
      {
        label: 'Card',
        path: '/components/card',
      },
      {
        label: 'Image',
        path: '/components/image',
      },
    ],
  },
];
