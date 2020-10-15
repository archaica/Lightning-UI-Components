import lng from 'wpe-lightning';

import DataItem from '.';
import Row from '../Row';
import Icon from '../Icon';
import icon from '../../assets/images/ic_lightning_white_32.png';
import mdx from './DataItem.mdx';

export default {
  title: 'DataItem',
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = () => {
  const DataItem1 = {
    type: DataItem,
    h: 140,
    w: 410,
    margin: {
      x: 20,
      y: 25
    },
    content: {
      Wrapper: {
        flex: {
          direction: 'row',
          alignContent: 'center',
          alignItems: 'center'
        },
        Icon1: {
          type: Icon,
          w: 90,
          h: 90,
          icon
        },
        Text: {
          flex: {
            direction: 'column',
            alignContent: 'center',
            alignItems: 'center'
          },
          Subtitle: {
            text: {
              fontFace: 'XfinityBrownBold',
              fontSize: 24,
              text: 'Sports Data Item'
            }
          },
          Title: {
            text: {
              fontFace: 'XfinityBrownBold',
              fontSize: 36,
              text: 'SPORTS!'
            }
          }
        },
        Icon2: {
          type: Icon,
          w: 90,
          h: 90,
          icon
        }
      }
    }
  };
  const DataItem2 = {
    type: DataItem,
    h: 140,
    w: 410,
    margin: 16,
    content: {
      Wrapper: {
        flex: {
          direction: 'row',
          alignContent: 'center',
          alignItems: 'center'
        },
        Icon: {
          type: Icon,
          w: 113,
          h: 113,
          icon
        },
        Text: {
          flex: {
            direction: 'column'
          },
          Title: {
            text: {
              fontFace: 'XfinityBrownBold',
              fontSize: 28,
              text: 'Cast and Crew'
            }
          },
          Subtitle: {
            text: {
              fontFace: 'XfinityBrownBold',
              fontSize: 24,
              text: 'Another data item'
            }
          }
        }
      }
    }
  };

  return class Basic extends lng.Component {
    static _template() {
      return {
        Row: {
          type: Row,
          itemSpacing: 60,
          items: [DataItem1, DataItem2]
        }
      };
    }

    _getFocused() {
      return this.tag('Row');
    }
  };
};

Basic.args = {};
Basic.argTypes = {};
Basic.parameters = {
  argActions: {}
};
