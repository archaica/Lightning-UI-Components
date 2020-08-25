import lng from 'wpe-lightning';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, radios } from '@storybook/addon-knobs';
import icon from '../../assets/images/ic_lightning_white_32.png';
import Pivot from '.';

import mdx from './Pivot.mdx';

export default {
  title: 'Pivot',
  component: Pivot,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const makeOptions = (...opts) => {
  return opts.reduce(
    (obj, key) => ({
      ...obj,
      [key]: key.toLowerCase()
    }),
    {}
  );
};

export const Basic = () =>
  class Basic extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot,
          title: text('Title', 'Dynamic Pivot'),
          backgroundType: radios(
            'Background',
            makeOptions('stroke', 'fill', 'float', 'ghost'),
            'stroke'
          ),
          onEnter: action('onEnter')
        }
      };
    }
    _init() {
      if (boolean('Icon', false)) {
        this.tag('Pivot').icon = icon;
      }
    }

    _getFocused() {
      if (boolean('Focused', false)) {
        return this.tag('Pivot');
      }
    }
  };

export const Loading = () =>
  class Loading extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot,
          backgroundType: 'fill'
        }
      };
    }
  };
