// In-memory mock data shaped like Shopify Storefront API objects.
// Products and collections are read-only. Carts live for the lifetime of the
// process (lost on restart) and are mutated by cart* GraphQL mutations.

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
  merchandiseId: string; // variant id
};

export type Cart = {
  id: string;
  lines: CartLine[];
  createdAt: string;
  updatedAt: string;
  note: string | null;
  buyerIdentity: { countryCode: string };
};

const CURRENCY = "USD";
const VENDOR = "Mock Shop";
const NOW = "2026-01-01T00:00:00Z";

const money = (amount: number): Money => ({
  amount: amount.toFixed(2),
  currencyCode: CURRENCY,
});

const gid = (kind: string, id: string | number) =>
  `gid://shopify/${kind}/${id}`;

// Use a deterministic, reliable image source so the demo renders without
// configuring remote image hosts.
const img = (id: string, seed: string, alt: string): Image => ({
  id: gid("ProductImage", id),
  url: `https://picsum.photos/seed/${seed}/800/800`,
  altText: alt,
  width: 800,
  height: 800,
});

export const images: Record<string, Image> = {};
const addImage = (i: Image) => {
  images[i.id] = i;
  return i;
};

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

type SeedVariant = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  options: SelectedOption[];
  available?: boolean;
  qty?: number;
};

type SeedProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  options: { name: string; values: string[] }[];
  variants: SeedVariant[];
  imageSeeds: string[]; // first is featured
  collectionHandles: string[];
};

const seeds: SeedProduct[] = [
  {
    id: "1001",
    handle: "selene-linen-tee",
    title: "Selene Linen Tee",
    description:
      "A breezy, oversized linen tee made from European-spun flax. Pre-washed for everyday softness.",
    productType: "Apparel",
    tags: ["new", "linen", "summer"],
    options: [
      { name: "Color", values: ["Bone", "Sage"] },
      { name: "Size", values: ["S", "M", "L"] },
    ],
    variants: [
      { id: "2001", title: "Bone / S", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "S" }] },
      { id: "2002", title: "Bone / M", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "M" }] },
      { id: "2003", title: "Bone / L", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "L" }], available: false, qty: 0 },
      { id: "2004", title: "Sage / S", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "S" }] },
      { id: "2005", title: "Sage / M", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "M" }] },
      { id: "2006", title: "Sage / L", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "L" }] },
    ],
    imageSeeds: ["selene-1", "selene-2"],
    collectionHandles: ["new-arrivals", "apparel"],
  },
  {
    id: "1002",
    handle: "atlas-canvas-tote",
    title: "Atlas Canvas Tote",
    description:
      "A heavyweight 18oz canvas tote with reinforced leather handles. Carries everything you need for a weekend trip.",
    productType: "Bags",
    tags: ["bestseller", "canvas"],
    options: [{ name: "Color", values: ["Natural", "Black"] }],
    variants: [
      { id: "2010", title: "Natural", price: 64, compareAt: 78, options: [{ name: "Color", value: "Natural" }] },
      { id: "2011", title: "Black", price: 64, compareAt: 78, options: [{ name: "Color", value: "Black" }] },
    ],
    imageSeeds: ["atlas-1", "atlas-2", "atlas-3"],
    collectionHandles: ["bestsellers", "accessories"],
  },
  {
    id: "1003",
    handle: "harbor-mug",
    title: "Harbor Stoneware Mug",
    description:
      "Hand-thrown stoneware mug, glazed in a soft fog blue. Holds 12oz. Microwave and dishwasher safe.",
    productType: "Home",
    tags: ["ceramic", "kitchen"],
    options: [{ name: "Color", values: ["Fog", "Cream"] }],
    variants: [
      { id: "2020", title: "Fog", price: 28, options: [{ name: "Color", value: "Fog" }] },
      { id: "2021", title: "Cream", price: 28, options: [{ name: "Color", value: "Cream" }] },
    ],
    imageSeeds: ["harbor-1", "harbor-2"],
    collectionHandles: ["home", "new-arrivals"],
  },
  {
    id: "1004",
    handle: "field-notebook",
    title: "Field Notebook, Set of 3",
    description:
      "Pocket-size notebooks with thread-stitched bindings and a soft kraft cover. 64 pages of dot-grid paper.",
    productType: "Stationery",
    tags: ["paper", "gift"],
    options: [{ name: "Cover", values: ["Kraft", "Olive", "Charcoal"] }],
    variants: [
      { id: "2030", title: "Kraft", price: 18, options: [{ name: "Cover", value: "Kraft" }] },
      { id: "2031", title: "Olive", price: 18, options: [{ name: "Cover", value: "Olive" }] },
      { id: "2032", title: "Charcoal", price: 18, options: [{ name: "Cover", value: "Charcoal" }] },
    ],
    imageSeeds: ["field-1"],
    collectionHandles: ["home", "bestsellers"],
  },
  {
    id: "1005",
    handle: "ridge-merino-beanie",
    title: "Ridge Merino Beanie",
    description:
      "Fine-gauge merino wool beanie knit in Portugal. Warm without bulk and naturally moisture wicking.",
    productType: "Apparel",
    tags: ["wool", "winter"],
    options: [{ name: "Color", values: ["Charcoal", "Rust", "Stone"] }],
    variants: [
      { id: "2040", title: "Charcoal", price: 42, options: [{ name: "Color", value: "Charcoal" }] },
      { id: "2041", title: "Rust", price: 42, options: [{ name: "Color", value: "Rust" }] },
      { id: "2042", title: "Stone", price: 42, options: [{ name: "Color", value: "Stone" }] },
    ],
    imageSeeds: ["ridge-1", "ridge-2"],
    collectionHandles: ["apparel"],
  },
  {
    id: "1006",
    handle: "noma-leather-card-case",
    title: "Noma Leather Card Case",
    description:
      "A minimalist three-pocket card case in vegetable-tanned Italian leather. Patinas beautifully with use.",
    productType: "Accessories",
    tags: ["leather", "wallet"],
    options: [{ name: "Color", values: ["Tan", "Black", "Cognac"] }],
    variants: [
      { id: "2050", title: "Tan", price: 58, options: [{ name: "Color", value: "Tan" }] },
      { id: "2051", title: "Black", price: 58, options: [{ name: "Color", value: "Black" }] },
      { id: "2052", title: "Cognac", price: 58, options: [{ name: "Color", value: "Cognac" }] },
    ],
    imageSeeds: ["noma-1"],
    collectionHandles: ["accessories", "bestsellers"],
  },
  {
    id: "1007",
    handle: "kestrel-trail-cap",
    title: "Kestrel Trail Cap",
    description:
      "Lightweight five-panel running cap with a perforated brim and quick-dry sweatband.",
    productType: "Apparel",
    tags: ["new", "outdoor"],
    options: [{ name: "Color", values: ["Sand", "Forest"] }],
    variants: [
      { id: "2060", title: "Sand", price: 36, options: [{ name: "Color", value: "Sand" }] },
      { id: "2061", title: "Forest", price: 36, options: [{ name: "Color", value: "Forest" }] },
    ],
    imageSeeds: ["kestrel-1"],
    collectionHandles: ["apparel", "new-arrivals"],
  },
  {
    id: "1008",
    handle: "drift-incense-bundle",
    title: "Drift Incense Bundle",
    description:
      "A trio of slow-burning Japanese incense in cedar, citrus, and sea salt. 40 sticks per box.",
    productType: "Home",
    tags: ["gift", "scent"],
    options: [{ name: "Scent", values: ["Cedar", "Citrus", "Sea Salt"] }],
    variants: [
      { id: "2070", title: "Cedar", price: 24, options: [{ name: "Scent", value: "Cedar" }] },
      { id: "2071", title: "Citrus", price: 24, options: [{ name: "Scent", value: "Citrus" }] },
      { id: "2072", title: "Sea Salt", price: 24, options: [{ name: "Scent", value: "Sea Salt" }] },
    ],
    imageSeeds: ["drift-1", "drift-2"],
    collectionHandles: ["home"],
  },
];

export const products: Record<string, Product> = {};
export const productByHandle: Record<string, string> = {};
export const variants: Record<string, ProductVariant> = {};
export const productOptions: Record<string, ProductOption> = {};

for (const seed of seeds) {
  const productId = gid("Product", seed.id);

  const imageObjs = seed.imageSeeds.map((s, i) =>
    addImage(img(`${seed.id}-${i + 1}`, s, `${seed.title} - image ${i + 1}`)),
  );
  const featuredImageId = imageObjs[0].id;

  const variantIds: string[] = [];
  for (const v of seed.variants) {
    const variantId = gid("ProductVariant", v.id);
    variantIds.push(variantId);
    variants[variantId] = {
      id: variantId,
      title: v.title,
      sku: `${seed.handle.toUpperCase().replace(/-/g, "")}-${v.id}`,
      availableForSale: v.available !== false,
      quantityAvailable: v.qty ?? (v.available === false ? 0 : 25),
      price: money(v.price),
      compareAtPrice: v.compareAt != null ? money(v.compareAt) : null,
      selectedOptions: v.options,
      image: imageObjs[0],
      productId,
    };
  }

  const optionIds: string[] = [];
  for (let i = 0; i < seed.options.length; i++) {
    const o = seed.options[i];
    const optId = gid("ProductOption", `${seed.id}-${i + 1}`);
    productOptions[optId] = { id: optId, name: o.name, values: o.values };
    optionIds.push(optId);
  }

  const product: Product = {
    id: productId,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    descriptionHtml: `<p>${seed.description}</p>`,
    productType: seed.productType,
    vendor: VENDOR,
    tags: seed.tags,
    availableForSale: seed.variants.some((v) => v.available !== false),
    featuredImageId,
    imageIds: imageObjs.map((i) => i.id),
    variantIds,
    optionIds,
    collectionIds: [], // filled in below
    createdAt: NOW,
    updatedAt: NOW,
    publishedAt: NOW,
  };
  products[productId] = product;
  productByHandle[seed.handle] = productId;
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

type SeedCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  imageSeed: string;
};

const collectionSeeds: SeedCollection[] = [
  {
    id: "3001",
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Fresh additions to the shop, restocked weekly.",
    imageSeed: "collection-new",
  },
  {
    id: "3002",
    handle: "bestsellers",
    title: "Bestsellers",
    description: "The pieces our customers come back for.",
    imageSeed: "collection-best",
  },
  {
    id: "3003",
    handle: "apparel",
    title: "Apparel",
    description: "Everyday clothing built to last.",
    imageSeed: "collection-apparel",
  },
  {
    id: "3004",
    handle: "accessories",
    title: "Accessories",
    description: "Small goods that finish an outfit.",
    imageSeed: "collection-accessories",
  },
  {
    id: "3005",
    handle: "home",
    title: "Home & Living",
    description: "Objects for the table, the kitchen, and the bedside.",
    imageSeed: "collection-home",
  },
];

export const collections: Record<string, Collection> = {};
export const collectionByHandle: Record<string, string> = {};

for (const c of collectionSeeds) {
  const id = gid("Collection", c.id);
  const image = addImage({
    id: gid("CollectionImage", c.id),
    url: `https://picsum.photos/seed/${c.imageSeed}/1200/800`,
    altText: c.title,
    width: 1200,
    height: 800,
  });
  collections[id] = {
    id,
    handle: c.handle,
    title: c.title,
    description: c.description,
    descriptionHtml: `<p>${c.description}</p>`,
    imageId: image.id,
    productIds: [],
    updatedAt: NOW,
  };
  collectionByHandle[c.handle] = id;
}

// Wire products <-> collections from the seed data.
for (const seed of seeds) {
  const productId = gid("Product", seed.id);
  for (const handle of seed.collectionHandles) {
    const cid = collectionByHandle[handle];
    if (!cid) continue;
    collections[cid].productIds.push(productId);
    products[productId].collectionIds.push(cid);
  }
}

// ---------------------------------------------------------------------------
// Carts (in-memory, mutable)
// ---------------------------------------------------------------------------

export const carts: Map<string, Cart> = new Map();

let cartCounter = 1;
let lineCounter = 1;

export function newCartId() {
  // Mimic Shopify cart id format loosely.
  const id = `${Date.now().toString(36)}-${cartCounter++}`;
  return gid("Cart", id);
}

export function newLineId() {
  return gid("CartLine", `${Date.now().toString(36)}-${lineCounter++}`);
}

export function nowIso() {
  return new Date().toISOString();
}

export function getVariant(id: string): ProductVariant | null {
  return variants[id] ?? null;
}

export function getProduct(id: string): Product | null {
  return products[id] ?? null;
}

export function getProductOfVariant(variantId: string): Product | null {
  const v = variants[variantId];
  if (!v) return null;
  return products[v.productId] ?? null;
}

export function lineCost(line: CartLine): number {
  const v = variants[line.merchandiseId];
  if (!v) return 0;
  return Number(v.price.amount) * line.quantity;
}

export function cartTotal(cart: Cart): { subtotal: Money; total: Money; quantity: number } {
  let subtotal = 0;
  let qty = 0;
  for (const l of cart.lines) {
    subtotal += lineCost(l);
    qty += l.quantity;
  }
  return {
    subtotal: money(subtotal),
    total: money(subtotal),
    quantity: qty,
  };
}

export function priceRange(product: Product): { min: Money; max: Money } {
  const prices = product.variantIds
    .map((id) => Number(variants[id]?.price.amount ?? 0))
    .filter((n) => n > 0);
  if (prices.length === 0) return { min: money(0), max: money(0) };
  return { min: money(Math.min(...prices)), max: money(Math.max(...prices)) };
}

export const constants = { CURRENCY, VENDOR };
export { money };
