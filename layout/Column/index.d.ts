import lng from '@lightningjs/core';
import FocusManager from '../FocusManager';

type transitionObject = {
  delay: number;
  duration: number;
  timingFunction: string;
};

export interface ColumnStyles {
  itemSpacing?: number;
  scrollIndex?: number;
  alwaysScroll?: boolean;
  neverScroll?: boolean;
  itemTransition?: transitionObject;
}

export default class Column extends FocusManager {
  itemSpacing?: number;
  scrollIndex?: number;
  alwaysScroll?: boolean;
  neverScroll?: boolean;
  autoResizeWidth?: boolean;
  autoResizeHeight?: boolean;
  plinko?: boolean;
  itemPosX?: number;
  itemPosY?: number;
  style: ColumnStyles;

  shouldScrollUp(): boolean;
  shouldScrollDown(): boolean;
  checkSkipPlinko(prev: lng.Component, next: lng.Component): lng.Component;
  scrollTo(index: number, duration: number): void;
  onScreenEffect(): void;
  transitionDone(): void;

  $removeItem(item: lng.Component): void;
  $columnChanged(): void;
}