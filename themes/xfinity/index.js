import alphas from './alphas';
import colors from './colors';
import extensions from './extensions';
import { layout, getFocusScale } from './layout';
import radius from './radius';
import stroke from './stroke';
import typography from './typography';
import animations from './animations';
import fonts from './fonts';
import iconLeftArrow from './assets/ic_sort_left_fill_inverse_64';
import iconRightArrow from './assets/ic_sort_right_fill_inverse_64';

export default {
  name: 'Xfinity',
  alphas,
  animations,
  colors,
  fonts,
  getFocusScale,
  layout,
  radius,
  stroke,
  typography,
  componentStyles: {
    Surface: {
      focusRing: true
    },
    Knob: {
      focusRing: true
    },
    Slider: {
      iconLeftSrc: iconLeftArrow,
      iconRightSrc: iconRightArrow,
      arrowWidth: layout.spacingBase * 4,
      arrowHeight: layout.spacingBase * 4
    },
    TextBox: {
      offsetY: 2 // Hopefully this can be fixed in a future release. For now we can center align for badge, tag with this adjustment font doesnt seam to fill the whole area in textbox texture
    },
    Tile: {
      artworkFocusScale: 1.12
    }
  },
  extensions
};
