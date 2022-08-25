import { withStyles } from '../../mixins';
import Card, { baseCardProps, artCardProps, logoProps } from '.';

const horizontalStyles = theme => ({
  orientation: 'horizontal',
  w: 860,
  h: 231,
  artHeight: 231,
  artWidth: 410,
  imgRadius: theme.border.radius.medium
});

export default class CardHorizontal extends withStyles(Card, horizontalStyles) {
  static get properties() {
    return [...artCardProps, ...baseCardProps, ...logoProps, 'data', 'cta'];
  }
}

const horizontalLargeStyles = theme => ({
  ...horizontalStyles(theme),
  w: 1085,
  h: 231
});

export class CardHorizontalLarge extends withStyles(
  Card,
  horizontalLargeStyles
) {
  static get properties() {
    return [...artCardProps, ...baseCardProps, ...logoProps, 'data', 'cta'];
  }
}