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
        label: 'Colors',
        path: '/theme/colors',
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
      components.progress,
      components.prose,
    ],
  },
  {
    label: 'Inputs',
    children: [
      components.textInput,
      components.textareaInput,
      components.numberInput,
      components.colorInput,
      components.checkboxInput,
      components.radioInput,
      components.toggleInput,
      components.selectNativeInput,
      components.selectInput,
      components.iconInput,
    ],
  },
  {
    label: 'Overlay',
    children: [
      components.toast,
      components.tooltip,
    ],
  },
  // {
  //   label: 'Layers',
  //   children: [
  //     components.menu,
  //   ],
  // },
];
