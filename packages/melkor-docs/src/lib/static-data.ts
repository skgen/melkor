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
        label: 'Theme convertor',
        path: '/theme/convertor',
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
        label: 'Card',
        path: '/components/card',
      },
      {
        label: 'Image',
        path: '/components/image',
      },
      {
        label: 'Pagination',
        path: '/components/pagination',
      },
      {
        label: 'Theme Toggle',
        path: '/components/theme-toggle',
      },
      {
        label: 'Checkables',
        path: '/components/checkables',
      },
    ],
  },
  {
    label: 'Inputs',
    children: [
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
    ],
  },
];
