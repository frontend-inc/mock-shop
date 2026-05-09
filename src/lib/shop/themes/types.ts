// Per-theme seed data. Each theme is a self-contained store with its own
// products, collections, and design POV. Image prompts are resolved to real
// URLs at runtime via a generated manifest (see scripts/generate-images.ts).

export type SelectedOption = { name: string; value: string };

export type ThemeImagePrompt = {
  // Stable path within /mock/{theme}/. Used as the Supabase object key.
  // Example: "products/selene-linen-tee/1.png".
  path: string;
  prompt: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ThemeVariantSeed = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  options: SelectedOption[];
  available?: boolean;
  qty?: number;
};

export type ThemeProductSeed = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  options: { name: string; values: string[] }[];
  variants: ThemeVariantSeed[];
  // First image is the featured image.
  images: ThemeImagePrompt[];
  collectionHandles: string[];
};

export type ThemeCollectionSeed = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ThemeImagePrompt | null;
};

export type ThemeShopMeta = {
  name: string;
  tagline: string;
  description: string;
  designPOV: string;
  // Style tail appended to every image prompt to keep imagery consistent.
  imageStyle: string;
};

export type ThemeData = {
  slug: ThemeSlug;
  shop: ThemeShopMeta;
  products: ThemeProductSeed[];
  collections: ThemeCollectionSeed[];
};

export const THEME_SLUGS = [
  "maison",
  "pulse",
  "ferment",
  "pantry",
  "tread",
  "bloom",
  "hearth",
  "roast",
  "frame",
  "trail",
] as const;

export type ThemeSlug = (typeof THEME_SLUGS)[number];

export function isThemeSlug(s: string): s is ThemeSlug {
  return (THEME_SLUGS as readonly string[]).includes(s);
}
