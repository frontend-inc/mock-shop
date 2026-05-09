// A ShopStore is a self-contained mock-shop dataset. We build one per theme,
// cache it, and pass it through GraphQL context so resolvers can be theme-
// aware without touching module-level globals.

import { THEMES } from "./themes";
import type {
  ThemeData,
  ThemeImagePrompt,
  ThemeProductSeed,
  ThemeSlug,
} from "./themes";
import { loadManifest } from "./manifest";

export type Money = { amount: string; currencyCode: string };

export type Image = {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SelectedOption = { name: string; value: string };

export type ProductVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: Image | null;
  productId: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  featuredImageId: string;
  imageIds: string[];
  variantIds: string[];
  optionIds: string[];
  collectionIds: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  imageId: string | null;
  productIds: string[];
  updatedAt: string;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
};

export type Cart = {
  id: string;
  lines: CartLine[];
  createdAt: string;
  updatedAt: string;
  note: string | null;
  buyerIdentity: { countryCode: string };
};

export type ShopMeta = {
  name: string;
  tagline: string;
  description: string;
  designPOV: string;
};

export type ShopStore = {
  slug: ThemeSlug;
  meta: ShopMeta;
  products: Record<string, Product>;
  productByHandle: Record<string, string>;
  variants: Record<string, ProductVariant>;
  productOptions: Record<string, ProductOption>;
  collections: Record<string, Collection>;
  collectionByHandle: Record<string, string>;
  images: Record<string, Image>;
  // Carts are per-theme so an /maison cart never bleeds into /pulse.
  carts: Map<string, Cart>;
};

const CURRENCY = "USD";
const NOW = "2026-01-01T00:00:00Z";

const money = (amount: number): Money => ({
  amount: amount.toFixed(2),
  currencyCode: CURRENCY,
});

const gid = (kind: string, id: string | number) =>
  `gid://shopify/${kind}/${id}`;

// Public Supabase asset URL. The script uploads to /assets/mock/{theme}/...
// so the public URL is deterministic; the manifest only tells the runtime
// whether a given path is actually present yet.
const SUPABASE_PUBLIC_BASE =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://supabase.frontend-ai.com") +
  "/storage/v1/object/public/assets/mock";

function placeholderUrl(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

function resolveImageUrl(
  theme: ThemeSlug,
  generated: Set<string>,
  prompt: ThemeImagePrompt,
): string {
  if (generated.has(prompt.path)) {
    return `${SUPABASE_PUBLIC_BASE}/${theme}/${prompt.path}`;
  }
  return placeholderUrl(`${theme}/${prompt.path}`, prompt.width ?? 800, prompt.height ?? 800);
}

function buildStore(theme: ThemeData): ShopStore {
  const generated = new Set(loadManifest(theme.slug));

  const store: ShopStore = {
    slug: theme.slug,
    meta: {
      name: theme.shop.name,
      tagline: theme.shop.tagline,
      description: theme.shop.description,
      designPOV: theme.shop.designPOV,
    },
    products: {},
    productByHandle: {},
    variants: {},
    productOptions: {},
    collections: {},
    collectionByHandle: {},
    images: {},
    carts: new Map(),
  };

  const addImage = (i: Image) => {
    store.images[i.id] = i;
    return i;
  };

  // Build products + variants + options + images.
  for (const seed of theme.products) {
    const productId = gid("Product", `${theme.slug}-${seed.id}`);

    const productImages = seed.images.map((p, idx) =>
      addImage({
        id: gid("ProductImage", `${theme.slug}-${seed.id}-${idx + 1}`),
        url: resolveImageUrl(theme.slug, generated, p),
        altText: p.alt,
        width: p.width ?? 800,
        height: p.height ?? 800,
      }),
    );
    const featuredImageId = productImages[0]?.id ?? "";

    const variantIds: string[] = [];
    for (const v of seed.variants) {
      const variantId = gid("ProductVariant", `${theme.slug}-${v.id}`);
      variantIds.push(variantId);
      store.variants[variantId] = {
        id: variantId,
        title: v.title,
        sku: `${theme.slug.toUpperCase()}-${seed.handle.toUpperCase().replace(/-/g, "")}-${v.id}`,
        availableForSale: v.available !== false,
        quantityAvailable: v.qty ?? (v.available === false ? 0 : 25),
        price: money(v.price),
        compareAtPrice: v.compareAt != null ? money(v.compareAt) : null,
        selectedOptions: v.options,
        image: productImages[0] ?? null,
        productId,
      };
    }

    const optionIds: string[] = [];
    seed.options.forEach((o, idx) => {
      const optId = gid("ProductOption", `${theme.slug}-${seed.id}-${idx + 1}`);
      store.productOptions[optId] = { id: optId, name: o.name, values: o.values };
      optionIds.push(optId);
    });

    const product: Product = {
      id: productId,
      handle: seed.handle,
      title: seed.title,
      description: seed.description,
      descriptionHtml: `<p>${seed.description}</p>`,
      productType: seed.productType,
      vendor: theme.shop.name,
      tags: seed.tags,
      availableForSale: seed.variants.some((v) => v.available !== false),
      featuredImageId,
      imageIds: productImages.map((i) => i.id),
      variantIds,
      optionIds,
      collectionIds: [],
      createdAt: NOW,
      updatedAt: NOW,
      publishedAt: NOW,
    };
    store.products[productId] = product;
    store.productByHandle[seed.handle] = productId;
  }

  // Build collections.
  for (const c of theme.collections) {
    const id = gid("Collection", `${theme.slug}-${c.id}`);
    let imageId: string | null = null;
    if (c.image) {
      const img = addImage({
        id: gid("CollectionImage", `${theme.slug}-${c.id}`),
        url: resolveImageUrl(theme.slug, generated, c.image),
        altText: c.image.alt,
        width: c.image.width ?? 1200,
        height: c.image.height ?? 800,
      });
      imageId = img.id;
    }
    store.collections[id] = {
      id,
      handle: c.handle,
      title: c.title,
      description: c.description,
      descriptionHtml: `<p>${c.description}</p>`,
      imageId,
      productIds: [],
      updatedAt: NOW,
    };
    store.collectionByHandle[c.handle] = id;
  }

  // Wire products to their collections.
  for (const seed of theme.products) {
    const productId = gid("Product", `${theme.slug}-${seed.id}`);
    for (const handle of seed.collectionHandles) {
      const cid = store.collectionByHandle[handle];
      if (!cid) continue;
      store.collections[cid].productIds.push(productId);
      store.products[productId].collectionIds.push(cid);
    }
  }

  return store;
}

const cache = new Map<ThemeSlug, ShopStore>();

export function getStore(slug: ThemeSlug): ShopStore {
  let s = cache.get(slug);
  if (!s) {
    s = buildStore(THEMES[slug] as ThemeData);
    cache.set(slug, s);
  }
  return s;
}

// --- Cart helpers (operate on a passed-in store) ---------------------------

let cartCounter = 1;
let lineCounter = 1;

export function newCartId(slug: ThemeSlug) {
  const id = `${Date.now().toString(36)}-${cartCounter++}`;
  return gid("Cart", `${slug}-${id}`);
}

export function newLineId(slug: ThemeSlug) {
  return gid("CartLine", `${slug}-${Date.now().toString(36)}-${lineCounter++}`);
}

export function nowIso() {
  return new Date().toISOString();
}

export function lineCost(store: ShopStore, line: CartLine): number {
  const v = store.variants[line.merchandiseId];
  if (!v) return 0;
  return Number(v.price.amount) * line.quantity;
}

export function cartTotal(
  store: ShopStore,
  cart: Cart,
): { subtotal: Money; total: Money; quantity: number } {
  let subtotal = 0;
  let qty = 0;
  for (const l of cart.lines) {
    subtotal += lineCost(store, l);
    qty += l.quantity;
  }
  return { subtotal: money(subtotal), total: money(subtotal), quantity: qty };
}

export function priceRange(
  store: ShopStore,
  product: Product,
): { min: Money; max: Money } {
  const prices = product.variantIds
    .map((id) => Number(store.variants[id]?.price.amount ?? 0))
    .filter((n) => n > 0);
  if (prices.length === 0) return { min: money(0), max: money(0) };
  return { min: money(Math.min(...prices)), max: money(Math.max(...prices)) };
}

export { money, CURRENCY };
