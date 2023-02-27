﻿/**
 * Copyright 2023 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import lng from '@lightningjs/core';
import mdx from './Keyboard.mdx';
import { CATEGORIES } from 'lightning-ui-docs';
import { context } from '../../globals';
import utils from '../../utils';
import { default as KeyboardQwertyComponent } from './KeyboardQwerty';
import { Keyboard } from './Keyboard.stories';

export default {
  title: `${CATEGORIES[8]}/KeyboardQwerty`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const KeyboardQwerty = () =>
  class KeyboardQwerty extends lng.Component {
    static _template() {
      return {
        Keyboard: {
          type: KeyboardQwertyComponent,
          defaultFormat: 'lowercase'
        },
        w: utils.getWidthByUpCount(context.theme, 1)
      };
    }
  };

KeyboardQwerty.storyName = 'KeyboardQwerty';

KeyboardQwerty.args = {
  centerKeyboard: false,
  centerKeys: false,
  mode: 'focused'
};

KeyboardQwerty.argTypes = Keyboard.sharedArgTypes;
KeyboardQwerty.parameters = {};