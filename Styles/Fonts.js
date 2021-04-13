/**
 * Fonts
 *
 * Contains global font style information to easily maintain consistency throughout components.
 */
import { flatten } from '../utils';

export const XfinityFonts = {
  default: {
    fontName: 'XfinityStandard',
    baseUrl:
      'https://static.cimcontent.net/common-web-assets/fonts/xfinity-standard-optimized',
    weights: {
      regular: {
        family: 'Regular',
        url: 'xfinitystandard-regular.woff'
      },
      medium: {
        family: 'Medium',
        url: 'xfinitystandard-medium.woff'
      },
      bold: {
        family: 'Bold',
        url: 'xfinitystandard-bold.woff'
      }
    }
  },
  brand: {
    fontName: 'XfinityBrown',
    baseUrl:
      'https://static.cimcontent.net/common-web-assets/fonts/xfinity-brown-optimized',
    weights: {
      regular: {
        family: 'Regular',
        url: 'xfinitybrown-regular.woff'
      },
      bold: {
        family: 'Bold',
        url: 'xfinitybrown-bold.woff'
      }
    }
  }
};

export const createFonts = (...fonts) =>
  flatten(
    fonts.map(font =>
      Object.values(font).reduce(
        (acc, { fontName, baseUrl, weights }) => [
          ...acc,
          ...Object.values(weights).reduce(
            (acc, { family, url }) => [
              ...acc,
              {
                family: fontName + family,
                url: `${baseUrl}/${url}`,
                descriptors: {}
              }
            ],
            []
          )
        ],
        []
      )
    )
  );

/**
 * Xfinity-branded typography definitions for Lightning
 * https://share.goabstract.com/06d0601d-b7d2-48f3-93a2-17cc78bedb5e?mode=build&sha=6d9d06ec3e924eb83ff133826956e1e9a4fc7e36
 */

export const TYPOGRAPHY = {
  display1: {
    fontFace: 'XfinityBrownBold',
    fontSize: 56,
    fontWeight: 700,
    letterSpacing: -0.4,
    lineHeight: 72,
    verticalAlign: 'middle'
  },
  display2: {
    fontFace: 'XfinityBrownBold',
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: -0.4,
    lineHeight: 64,
    verticalAlign: 'middle'
  },
  headline1: {
    fontFace: 'XfinityBrownBold',
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 48,
    verticalAlign: 'middle'
  },
  headline2: {
    fontFace: 'XfinityBrownBold',
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 40,
    verticalAlign: 'middle'
  },
  headline3: {
    fontFace: 'XfinityBrownBold',
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 36,
    verticalAlign: 'middle'
  },
  body1: {
    fontFace: 'XfinityStandardMedium',
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 40,
    verticalAlign: 'middle'
  },
  body2: {
    fontFace: 'XfinityStandardMedium',
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 32,
    verticalAlign: 'middle'
  },
  body3: {
    fontFace: 'XfinityStandardMedium',
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 32,
    verticalAlign: 'middle'
  },
  button1: {
    fontFace: 'XfinityBrownBold',
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 32,
    verticalAlign: 'middle'
  },
  button2: {
    fontFace: 'XfinityBrownBold',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: -0.2,
    lineHeight: 32,
    verticalAlign: 'middle'
  },
  callout1: {
    fontFace: 'XfinityBrownBold',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    lineHeight: 32,
    verticalAlign: 'middle'
  },
  caption: {
    fontFace: 'XfinityBrownBold',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 24,
    verticalAlign: 'middle'
  }
};