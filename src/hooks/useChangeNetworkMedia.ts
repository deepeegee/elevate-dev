import * as React from "react";
import { type IHeroCarouselItem } from "../components/HeroCarousel/HeroCarousel";

export interface IUseChangeNetworkMediaResult {
  slides: IHeroCarouselItem[];
  loading: boolean;
  error: string | undefined;
}

export const useChangeNetworkMedia = (
  _spHttpClient?: unknown
): IUseChangeNetworkMediaResult => {
  const [slides] = React.useState<IHeroCarouselItem[]>([]);
  return { slides, loading: false, error: undefined };
};
