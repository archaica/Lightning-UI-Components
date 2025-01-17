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

export const base = theme => ({
  radius: theme.radius.xl,
  paddingX: theme.spacer.xxxl + theme.spacer.xxs,
  paddingY: theme.spacer.md + theme.spacer.xs,
  paddingXNoTitle: theme.spacer.xl,
  iconSize: theme.spacer.xxxl,
  iconMarginRight: theme.spacer.md,
  textStyle: {
    ...theme.typography.headline3,
    textColor: theme.color.textNeutral
  },
  backgroundColor: theme.color.fillTransparent,
  contentColor: theme.color.fillNeutral
});

export const mode = theme => ({
  focused: {
    backgroundColor: theme.color.interactiveNeutralFocus,
    contentColor: theme.color.fillInverse,
    textStyle: { textColor: theme.color.textInverse }
  },
  selected: {
    backgroundColor: theme.color.interactiveNeutralFocusSoft,
    contentColor: theme.color.fillNeutral,
    textStyle: { textColor: theme.color.textNeutral }
  },
  disabled: {
    backgroundColor: theme.color.fillTransparent,
    contentColor: theme.color.fillNeutralDisabled,
    textStyle: { textColor: theme.color.textNeutralDisabled }
  }
});

export const tone = theme => ({
  neutral: {},
  inverse: {
    mode: {
      focused: {
        contentColor: theme.color.fillNeutral,
        textStyle: { textColor: theme.color.textNeutral }
      }
    }
  },
  brand: {
    mode: {
      focused: {
        contentColor: theme.color.fillNeutral,
        textStyle: { textColor: theme.color.textNeutral }
      }
    }
  }
});
