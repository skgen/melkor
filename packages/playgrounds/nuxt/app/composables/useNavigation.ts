import { capitalize } from '../utils';

const components = [
  'demo',
  'button',
  'pagination',
  'progress',
  'skeleton',
].map(component =>
  ({
    label: capitalize(component),
    icon: 'lucide:box',
    to: `/components/${component}`,
  }));

export function useNavigation() {
  return [
    {
      id: 'components',
      label: 'Components',
      items: components,
    },
  ];
}
