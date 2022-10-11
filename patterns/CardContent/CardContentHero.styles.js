import { getWidthByColumnSpan, getDimensions } from '../../utils';

export const base = () => {
  const { w, h } = getDimensions({ ratioX: 16, ratioY: 9, upCount: 3 });
  return {
    expandedW: getWidthByColumnSpan(9),
    expandedH: h,
    imageSize: { w, h }
  };
};