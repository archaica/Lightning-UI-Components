import lng from 'wpe-lightning';
import { withKnobs, text } from '@storybook/addon-knobs';

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

export const Unfocused = () =>
  class Basic extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot,
          title: 'Pivot'
        }
      };
    }
  };

export const Focused = () =>
  class Focused extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot,
          title: 'Pivot'
        }
      };
    }

    _init() {
      this._refocus();
    }
    _getFocused() {
      return this.tag('Pivot');
    }
  };

export const LongTitle = () =>
  class LongTitle extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot,
          title: 'This is a pivot with a really long title'
        }
      };
    }
  };

export const Loading = () =>
  class Loading extends lng.Component {
    static _template() {
      return {
        Pivot: {
          type: Pivot
        }
      };
    }
  };
