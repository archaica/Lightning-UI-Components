import { create } from '@storybook/theming/create';
import brand from './brand.png';
import { version } from '@lightningjs/ui-components/package.json';

export default create({
  base: 'dark',
  appBg: 'rgba(33, 35, 43, 1)',
  textColor: 'white',
  brandTitle: `Lightning UI Components v${version}`,
  brandUrl: 'https://github.com/rdkcentral/Lightning-UI-Components',
  brandImage: brand
});
