import logger from '../../globals/context/logger';
/**
 * apply to a component to synchronize the marquee scroll
 * timing of child TextBox components. Target class must
 * have a `get syncArray` property, which contains an
 * array of the tags of all TextBoxes to be synchronized.
 *
 * @param {*} Base class to be extended
 * @returns class with marquee sync functionality
 */
export default function withMarqueeSync(Base) {
  return class extends Base {
    static get name() {
      return Base.name;
    }

    _init() {
      // use _init instead of _construct to ensure elements exist before running setup
      super._init();
      if (this._shouldSync) {
        this._updateSignals();
        this._longestMarqueeWidth = 0;
      }
    }

    _update() {
      super._update();
      if (this._shouldSync) {
        this._updateSignals();
      } else {
        this._cleanupSyncValues();
      }
    }

    _cleanupSyncValues() {
      this.syncArray.map(component => {
        component.marqueeOverrideLoopX = undefined;
        component.signals &&
          component.signals.willMarquee &&
          delete component.signals.willMarquee;
      });
    }

    _updateSignals() {
      if (this.syncArray) {
        this.syncArray.map(component => {
          // preserve signals set in Base class
          component.signals = {
            ...component.signals,
            willMarquee: '_willMarquee'
          };
        });
      }
    }

    _willMarquee(compRef) {
      if (this._shouldSync) {
        this._longestMarqueeWidth = Math.max(
          compRef._textRenderedW,
          this._longestMarqueeWidth
        );
        this.syncArray.map(component => {
          component.marqueeOverrideLoopX = this._longestMarqueeWidth;
        });
      }
    }

    get _shouldSync() {
      if (this.style.marqueeSync === false) {
        // only fail this case if explicitly false
        return false;
      }
      if (!this.syncArray) {
        logger.warn(
          'warning: components using MarqueeSync must have a syncArray getter defined.'
        );
        return false;
      } else if (!Array.isArray(this.syncArray)) {
        logger.warn('warning: syncArray must be typeof array.');
        return false;
      } else if (this.syncArray.length < 2) {
        logger.warn(
          'warning: syncArray must contain at least two component references.'
        );
        return false;
      } else {
        return true;
      }
    }
  };
}