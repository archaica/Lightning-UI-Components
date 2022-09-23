import type MetadataBase from '../MetadataBase';
import { MetadataBaseStyles } from '../MetadataBase';
import type Provider from '../Provider';
import { ProviderStyles } from '../Provider';
import type lng from '@lightningjs/core';

export interface MetadataCardContentStyles extends MetadataBaseStyles {
  titleTextProperties?: lng.textures.TextTexture.Settings;
  descriptionProperties?: lng.textures.TextTexture.Settings;
  detailsTextProperties?: lng.textures.TextTexture.Settings;
  providerStyle?: ProviderStyles;
}

export default class MetadataCardContent extends MetadataBase {
  details?: string;
  provider?: Provider;
  style: MetadataCardContentStyles;
}