import lng from '@lightningjs/core';
import tileImage from '../../assets/images/tile-image.png';
import mdx from './CardContent.mdx';
import { Label as LabelStory } from '@lightning/ui-core/src/components/Label/Label.stories';
import { ProgressBar as ProgressBarStory } from '@lightning/ui-core/src/components/ProgressBar/ProgressBar.stories';
import { Text as BadgeStory } from '@lightning/ui-core/src/components/Badge/Badge.stories';
import { CardContent as MetadataStory } from '../MetadataCardContent/MetadataCardContent.stories';
import { generateSubStory } from '@lightning/ui-core/storybook/index.js';
import { createModeControl } from '@lightning/ui-core/storybook/index.js';
import { default as CardContentHorizontalLargeComponent } from './CardContentHorizontalLarge';
import { Icon } from '@lightning/ui-core';
import xfinityLogo from '../../assets/images/Xfinity-Provider-Logo-2x1.png';
import { CardContent } from './CardContent.stories';
import { CATEGORIES } from 'lightning-ui-docs';

export default {
  title: `${CATEGORIES[128]}/CardContentHorizontalLarge`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const CardContentHorizontalLarge = args =>
  class CardContentHorizontalLarge extends lng.Component {
    static _template() {
      return {
        CardContentHorizontalLarge: {
          type: CardContentHorizontalLargeComponent,
          src: tileImage,
          shouldCollapse: args.shouldCollapse,
          collapseToMetadata: args.collapseToMetadata,
          metadata: {
            provider: {
              providers: [
                {
                  type: Icon,
                  w: 96,
                  h: 48,
                  icon: xfinityLogo
                }
              ],
              visibleCount: 3
            }
          }
        }
      };
    }
  };
CardContentHorizontalLarge.args = {
  shouldCollapse: false,
  collapseToMetadata: false,
  ...CardContent.tileProps.args
};
CardContentHorizontalLarge.argTypes = {
  ...createModeControl(),
  shouldCollapse: {
    defaultValue: false,
    table: {
      defaultValue: { summary: false }
    },
    control: 'boolean',
    description: 'should the Card collapse?'
  },
  collapseToMetadata: {
    defaultValue: false,
    table: {
      defaultValue: { summary: false }
    },
    control: 'boolean',
    description: 'determines if collapsed state shows image or metadata'
  },
  ...CardContent.tileProps.argTypes
};
CardContentHorizontalLarge.parameters = {
  argActions: CardContent.tileProps.argActions('CardContentHorizontalLarge')
};
generateSubStory(
  'CardContentHorizontalLarge',
  CardContentHorizontalLarge,
  BadgeStory,
  'badge'
);
generateSubStory(
  'CardContentHorizontalLarge',
  CardContentHorizontalLarge,
  LabelStory,
  'label'
);
generateSubStory(
  'CardContentHorizontalLarge',
  CardContentHorizontalLarge,
  ProgressBarStory,
  'progressBar',
  ['w']
);
generateSubStory(
  'CardContentHorizontalLarge',
  CardContentHorizontalLarge,
  MetadataStory,
  'metadata',
  ['w', 'h', 'visibleCount']
);

CardContentHorizontalLarge.storyName = 'CardContentHorizontalLarge';