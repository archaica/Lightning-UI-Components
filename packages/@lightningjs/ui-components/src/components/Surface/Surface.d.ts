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
import Base from '../Base';
import type { Color, StylePartial } from '../../types/lui';

type TransitionObject = {
  delay: number;
  duration: number;
  timingFunction: string;
};

export type SurfaceStyle = {
  animation: TransitionObject;
  backgroundColor: Color;
  radius: lng.Tools.CornerRadius;
  scale: number;
};

export default class Surface extends Base {
  get innerH(): number;
  get innerW(): number;
  get style(): SurfaceStyle;
  set style(v: StylePartial<SurfaceStyle>);

  // tags
  get _Background(): lng.Component;
}