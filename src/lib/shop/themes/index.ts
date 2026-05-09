import type { ThemeData, ThemeSlug } from "./types";
import { maison } from "./maison";
import { pulse } from "./pulse";
import { ferment } from "./ferment";
import { pantry } from "./pantry";
import { tread } from "./tread";
import { bloom } from "./bloom";
import { hearth } from "./hearth";
import { roast } from "./roast";
import { frame } from "./frame";
import { trail } from "./trail";

export const THEMES: Record<ThemeSlug, ThemeData> = {
  maison,
  pulse,
  ferment,
  pantry,
  tread,
  bloom,
  hearth,
  roast,
  frame,
  trail,
};

export { THEME_SLUGS, isThemeSlug } from "./types";
export type {
  ThemeData,
  ThemeSlug,
  ThemeImagePrompt,
  ThemeProductSeed,
  ThemeCollectionSeed,
  ThemeShopMeta,
  ThemeVariantSeed,
} from "./types";

export function getTheme(slug: ThemeSlug): ThemeData {
  return THEMES[slug];
}

export function listThemes(): ThemeData[] {
  return Object.values(THEMES);
}
