import {
  carts,
  cartTotal,
  collectionByHandle,
  collections,
  getProduct,
  getProductOfVariant,
  getVariant,
  images,
  newCartId,
  newLineId,
  nowIso,
  priceRange,
  productByHandle,
  productOptions,
  products,
  variants,
  type Cart,
  type CartLine,
  type Collection,
  type Image,
  type Product,
  type ProductVariant,
} from "./data";

type Connection<T> = {
  edges: { node: T; cursor: string }[];
  nodes: T[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
};

function toConnection<T extends { id: string }>(
  items: T[],
  first: number = items.length,
): Connection<T> {
  const sliced = items.slice(0, Math.max(0, first));
  const edges = sliced.map((node) => ({
    node,
    cursor: Buffer.from(node.id).toString("base64"),
  }));
  return {
    edges,
    nodes: sliced,
    pageInfo: {
      hasNextPage: items.length > sliced.length,
      hasPreviousPage: false,
      startCursor: edges[0]?.cursor ?? null,
      endCursor: edges[edges.length - 1]?.cursor ?? null,
    },
  };
}

function sortProducts(
  list: Product[],
  sortKey?: string | null,
  reverse?: boolean | null,
): Product[] {
  const out = [...list];
  switch (sortKey) {
    case "TITLE":
      out.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "PRICE":
      out.sort(
        (a, b) =>
          Number(priceRange(a).min.amount) - Number(priceRange(b).min.amount),
      );
      break;
    case "CREATED_AT":
    case "CREATED":
    case "UPDATED_AT":
      out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      break;
    case "ID":
      out.sort((a, b) => a.id.localeCompare(b.id));
      break;
    default:
      break;
  }
  if (reverse) out.reverse();
  return out;
}

function sortCollections(
  list: Collection[],
  sortKey?: string | null,
  reverse?: boolean | null,
): Collection[] {
  const out = [...list];
  switch (sortKey) {
    case "TITLE":
      out.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "UPDATED_AT":
      out.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      break;
    case "ID":
      out.sort((a, b) => a.id.localeCompare(b.id));
      break;
    default:
      break;
  }
  if (reverse) out.reverse();
  return out;
}

function searchProducts(list: Product[], query?: string | null): Product[] {
  if (!query) return list;
  // Very loose support for the Storefront query DSL: tag:foo, vendor:foo,
  // product_type:foo, otherwise treat as a substring match on title/desc.
  const tokens = query.match(/("[^"]+"|\S+)/g) ?? [];
  return list.filter((p) =>
    tokens.every((raw) => {
      const t = raw.replace(/"/g, "");
      const [field, value] = t.includes(":") ? t.split(":") : [null, t];
      const v = value.toLowerCase();
      if (field === "tag") return p.tags.some((tag) => tag.toLowerCase() === v);
      if (field === "vendor") return p.vendor.toLowerCase().includes(v);
      if (field === "product_type")
        return p.productType.toLowerCase().includes(v);
      return (
        p.title.toLowerCase().includes(v) ||
        p.description.toLowerCase().includes(v) ||
        p.handle.toLowerCase().includes(v)
      );
    }),
  );
}

export const resolvers = {
  Query: {
    shop: () => ({
      name: "Mock Shop",
      description:
        "An in-memory mock storefront that speaks the Shopify Storefront API.",
      primaryDomain: {
        host: "mock-shop.local",
        url: "https://mock-shop.local",
      },
      paymentSettings: { currencyCode: "USD", countryCode: "US" },
    }),
    product: (_: unknown, args: { id?: string; handle?: string }) => {
      if (args.id) return products[args.id] ?? null;
      if (args.handle)
        return products[productByHandle[args.handle] ?? ""] ?? null;
      return null;
    },
    productByHandle: (_: unknown, args: { handle: string }) =>
      products[productByHandle[args.handle] ?? ""] ?? null,
    products: (
      _: unknown,
      args: {
        first?: number;
        sortKey?: string;
        reverse?: boolean;
        query?: string;
      },
    ) => {
      const all = sortProducts(
        searchProducts(Object.values(products), args.query),
        args.sortKey,
        args.reverse,
      );
      return toConnection(all, args.first);
    },
    collection: (_: unknown, args: { id?: string; handle?: string }) => {
      if (args.id) return collections[args.id] ?? null;
      if (args.handle)
        return collections[collectionByHandle[args.handle] ?? ""] ?? null;
      return null;
    },
    collectionByHandle: (_: unknown, args: { handle: string }) =>
      collections[collectionByHandle[args.handle] ?? ""] ?? null,
    collections: (
      _: unknown,
      args: { first?: number; sortKey?: string; reverse?: boolean },
    ) => {
      const all = sortCollections(
        Object.values(collections),
        args.sortKey,
        args.reverse,
      );
      return toConnection(all, args.first);
    },
    cart: (_: unknown, args: { id: string }) => carts.get(args.id) ?? null,
    node: (_: unknown, args: { id: string }) => {
      return (
        products[args.id] ??
        variants[args.id] ??
        collections[args.id] ??
        carts.get(args.id) ??
        null
      );
    },
  },

  Node: {
    __resolveType(obj: { id: string }) {
      if (obj.id.includes("/Product/")) return "Product";
      if (obj.id.includes("/ProductVariant/")) return "ProductVariant";
      if (obj.id.includes("/Collection/")) return "Collection";
      if (obj.id.includes("/Cart/")) return "Cart";
      return null;
    },
  },

  Product: {
    featuredImage: (p: Product) => images[p.featuredImageId] ?? null,
    images: (p: Product, args: { first?: number }) =>
      toConnection(
        p.imageIds.map((id) => images[id]).filter(Boolean) as Image[],
        args.first,
      ),
    options: (p: Product) =>
      p.optionIds.map((id) => productOptions[id]).filter(Boolean),
    priceRange: (p: Product) => {
      const r = priceRange(p);
      return { minVariantPrice: r.min, maxVariantPrice: r.max };
    },
    variants: (p: Product, args: { first?: number }) =>
      toConnection(
        p.variantIds.map((id) => variants[id]).filter(Boolean) as ProductVariant[],
        args.first,
      ),
    collections: (p: Product, args: { first?: number }) =>
      toConnection(
        p.collectionIds.map((id) => collections[id]).filter(Boolean) as Collection[],
        args.first,
      ),
  },

  ProductVariant: {
    product: (v: ProductVariant) => products[v.productId] ?? null,
  },

  Collection: {
    image: (c: Collection) => (c.imageId ? (images[c.imageId] ?? null) : null),
    products: (
      c: Collection,
      args: { first?: number; sortKey?: string; reverse?: boolean },
    ) => {
      const list = c.productIds
        .map((id) => products[id])
        .filter(Boolean) as Product[];
      return toConnection(
        sortProducts(list, args.sortKey, args.reverse),
        args.first,
      );
    },
  },

  Cart: {
    totalQuantity: (c: Cart) => cartTotal(c).quantity,
    cost: (c: Cart) => {
      const t = cartTotal(c);
      return { subtotalAmount: t.subtotal, totalAmount: t.total };
    },
    lines: (c: Cart, args: { first?: number }) =>
      toConnection(c.lines as (CartLine & { id: string })[], args.first),
    checkoutUrl: (c: Cart) =>
      `https://mock-shop.local/checkout/${encodeURIComponent(c.id)}`,
  },

  CartLine: {
    merchandise: (l: CartLine) => getVariant(l.merchandiseId),
    cost: (l: CartLine) => {
      const v = getVariant(l.merchandiseId);
      const per = Number(v?.price.amount ?? 0);
      const sub = per * l.quantity;
      return {
        amountPerQuantity: { amount: per.toFixed(2), currencyCode: "USD" },
        subtotalAmount: { amount: sub.toFixed(2), currencyCode: "USD" },
        totalAmount: { amount: sub.toFixed(2), currencyCode: "USD" },
      };
    },
  },

  Mutation: {
    cartCreate: (
      _: unknown,
      args: { input?: { lines?: { merchandiseId: string; quantity?: number }[]; note?: string; buyerIdentity?: { countryCode?: string } } },
    ) => {
      const userErrors: { field: string[]; message: string }[] = [];
      const id = newCartId();
      const cart: Cart = {
        id,
        lines: [],
        createdAt: nowIso(),
        updatedAt: nowIso(),
        note: args.input?.note ?? null,
        buyerIdentity: { countryCode: args.input?.buyerIdentity?.countryCode ?? "US" },
      };
      for (const line of args.input?.lines ?? []) {
        if (!getVariant(line.merchandiseId)) {
          userErrors.push({
            field: ["lines", "merchandiseId"],
            message: `Variant ${line.merchandiseId} not found.`,
          });
          continue;
        }
        cart.lines.push({
          id: newLineId(),
          quantity: line.quantity ?? 1,
          merchandiseId: line.merchandiseId,
        });
      }
      carts.set(id, cart);
      return { cart, userErrors };
    },

    cartLinesAdd: (
      _: unknown,
      args: { cartId: string; lines: { merchandiseId: string; quantity?: number }[] },
    ) => {
      const cart = carts.get(args.cartId);
      const userErrors: { field: string[]; message: string }[] = [];
      if (!cart) {
        return {
          cart: null,
          userErrors: [{ field: ["cartId"], message: "Cart not found." }],
        };
      }
      for (const line of args.lines) {
        const variant = getVariant(line.merchandiseId);
        if (!variant) {
          userErrors.push({
            field: ["lines", "merchandiseId"],
            message: `Variant ${line.merchandiseId} not found.`,
          });
          continue;
        }
        const existing = cart.lines.find(
          (l) => l.merchandiseId === line.merchandiseId,
        );
        if (existing) {
          existing.quantity += line.quantity ?? 1;
        } else {
          cart.lines.push({
            id: newLineId(),
            quantity: line.quantity ?? 1,
            merchandiseId: line.merchandiseId,
          });
        }
      }
      cart.updatedAt = nowIso();
      return { cart, userErrors };
    },

    cartLinesUpdate: (
      _: unknown,
      args: {
        cartId: string;
        lines: { id: string; quantity?: number; merchandiseId?: string }[];
      },
    ) => {
      const cart = carts.get(args.cartId);
      const userErrors: { field: string[]; message: string }[] = [];
      if (!cart) {
        return {
          cart: null,
          userErrors: [{ field: ["cartId"], message: "Cart not found." }],
        };
      }
      for (const upd of args.lines) {
        const line = cart.lines.find((l) => l.id === upd.id);
        if (!line) {
          userErrors.push({
            field: ["lines", "id"],
            message: `Line ${upd.id} not found.`,
          });
          continue;
        }
        if (upd.merchandiseId && getVariant(upd.merchandiseId)) {
          line.merchandiseId = upd.merchandiseId;
        }
        if (typeof upd.quantity === "number") {
          line.quantity = upd.quantity;
        }
      }
      // Quantity 0 removes the line, matching Shopify's behavior.
      cart.lines = cart.lines.filter((l) => l.quantity > 0);
      cart.updatedAt = nowIso();
      return { cart, userErrors };
    },

    cartLinesRemove: (
      _: unknown,
      args: { cartId: string; lineIds: string[] },
    ) => {
      const cart = carts.get(args.cartId);
      if (!cart) {
        return {
          cart: null,
          userErrors: [{ field: ["cartId"], message: "Cart not found." }],
        };
      }
      const ids = new Set(args.lineIds);
      cart.lines = cart.lines.filter((l) => !ids.has(l.id));
      cart.updatedAt = nowIso();
      return { cart, userErrors: [] };
    },
  },
};

// Re-export so callers can use the helpers without reaching into ./data.
export { getProduct, getProductOfVariant };
