import lng from '@lightningjs/core';
import Base from '../Base';
import { Icon, TextBox, ProgressBar } from '..';
import { withStyles } from '../../mixins';
import { InlineContent } from '../../layout';

export const styles = theme => ({
  title: {
    ...theme.typography.headline3,
    textColor: theme.palette.text.light.primary,
    maxLines: 2,
    maxLinesSuffix: '...'
  },
  data: {
    ...theme.typography.body3,
    textColor: theme.palette.text.light.secondary,
    alphaDark: theme.palette.opacity[6] / 100,
    alphaLight: theme.palette.opacity[4] / 100
  },
  logo: {
    h: theme.typography.body3.lineHeight,
    offset: 8
  },
  progressBarPadding: theme.spacing(3)
});

export default class MetadataSmall extends withStyles(Base, styles) {
  static _template() {
    return {
      flex: { direction: 'column', justifyContent: 'flex-end' },
      Title: {
        type: TextBox,
        ...this.styles.title
      },
      Data: {
        type: InlineContent,
        w: 200,
        contentSpacing: 8,
        contentWrap: false,
        justify: 'flex-start',
        ...this.styles.data
      },
      Logo: {
        flexItem: false,
        type: Icon,
        ...this.styles.logo
      },
      ProgressBarWrapper: {
        h: 0
      }
    };
  }

  static get properties() {
    return ['title', 'data', 'logo', 'progress'];
  }

  static get tags() {
    return [
      'Title',
      'Data',
      'Logo',
      'ProgressBarWrapper',
      { name: 'ProgressBar', path: 'ProgressBarWrapper.ProgressBar' }
    ];
  }

  _construct() {
    super._construct();
    this._logoRenderHeight = this.styles.logo.h;
    this._logoYOffset = this.styles.logo.offset;
    this._progressBarPadding = this.styles.progressBarPadding;
    this._progressBarHeight =
      this.styles.progressBarPadding + ProgressBar.styles.h;
    this._mixedContentAlpha = this.styles.data.alphaDark;
    this._textAlpha = this.styles.data.alphaLight;
    this._dataAlpha = this._textAlpha;
  }

  _init() {
    this._update();
  }

  _update() {
    this._updateTitle();
    this._updateData();
    this._updateLogo();
    this._updateProgress();
  }

  _updateTitle() {
    const wordWrapWidth = this._logo ? this.w - this._Logo.finalW : this.w;
    this._Title.patch({
      content: this._title,
      wordWrapWidth
    });
  }

  _updateData() {
    if (this._data) {
      this._Data.patch({
        content: this._data,
        alpha: this._dataAlpha
      });
    }
  }

  _updateLogo() {
    const ratio = this.logoWidth / this.logoHeight;
    const progressBarOffset = this._progress ? this._progressBarHeight : 0;
    this._Logo.patch({
      type: Icon,
      h: this._logoRenderHeight,
      w: this._logoRenderHeight * ratio,
      icon: this.logo,
      ...this.styles.logo
    });

    this._Logo.x = this.renderWidth - this._Logo.w;
    this._Logo.y =
      this.h - (this._logoRenderHeight + this._logoYOffset + progressBarOffset);
  }

  _updateProgress() {
    if (this._progress) {
      this._ProgressBarWrapper.patch({
        h: this._progressBarHeight,
        ProgressBar: {
          type: ProgressBar,
          progress: this._progress,
          y: this._progressBarPadding, // offset flexItem height
          w: this.finalW
        }
      });
    }
  }

  _setData(data) {
    this._dataAlpha = Array.isArray(data)
      ? this._mixedContentAlpha
      : this._textAlpha;
    return data;
  }
}