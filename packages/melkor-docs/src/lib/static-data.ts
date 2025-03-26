import { components } from '~/lib/components';

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
    label: 'Generics',
    children: [
      components.button,
      components.card,
      components.image,
      components.pagination,
      components.themeToggle,
      components.checkables,
    ],
  },
  {
    label: 'Inputs',
    children: [
      components.textInput,
      components.numberInput,
      components.colorInput,
    ],
  },
];
