import lng from 'wpe-lightning';
import { boolean, radios, withKnobs, text } from '@storybook/addon-knobs';

import { ListItemToggle } from '.';
import mdx from './ListItemToggle.mdx';
import { makeOptions } from '../../.storybook/utils';

export default {
  title: 'ListItemToggle',
  component: ListItemToggle,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = () =>
  class Basic extends lng.Component {
    static _template() {
      return {
        ListItem: {
          type: ListItemToggle,
          title: text('Title', 'List Item'),
          subtitle: text('Subtitle', 'List item metadata'),
          size: radios('Size', makeOptions('Small', 'Large'), 'small'),
          background: radios(
            'Background',
            makeOptions('Fill', 'Float'),
            'fill'
          ),
          checked: boolean('Checked', false)
        }
      };
    }

    _getFocused() {
      if (boolean('Focused', false)) {
        return this.tag('ListItem');
      }
    }
  };
