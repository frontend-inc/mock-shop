import {
  cartTotal,
  newCartId,
  newLineId,
  nowIso,
  priceRange,
  type Cart,
  type CartLine,
  type Collection,
  type Image,
  type Product,
  type ProductVariant,
  type ShopStore,
} from "./store";

export type Ctx = { store: ShopStore };

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
  store: ShopStore,
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
          Number(priceRange(store, a).min.amount) -
          Number(priceRange(store, b).min.amount),
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
    shop: (_: unknown, __: unknown, ctx: Ctx) => ({
      name: ctx.store.meta.name,
      description: ctx.store.meta.description,
      primaryDomain: {
        host: `${ctx.store.slug}.mock-shop.local`,
        url: `https://${ctx.store.slug}.mock-shop.local`,
      },
      paymentSettings: { currencyCode: "USD", countryCode: "US" },
    }),
    product: (
      _: unknown,
      args: { id?: string; handle?: string },
      ctx: Ctx,
    ) => {
      const { products, productByHandle } = ctx.store;
      if (args.id) return products[args.id] ?? null;
      if (args.handle)
        return products[productByHandle[args.handle] ?? ""] ?? null;
      return null;
    },
    productByHandle: (_: unknown, args: { handle: string }, ctx: Ctx) =>
      ctx.store.products[ctx.store.productByHandle[args.handle] ?? ""] ?? null,
    products: (
      _: unknown,
      args: {
        first?: number;
        sortKey?: string;
        reverse?: boolean;
        query?: string;
      },
      ctx: Ctx,
    ) => {
      const all = sortProducts(
        ctx.store,
        searchProducts(Object.values(ctx.store.products), args.query),
        args.sortKey,
        args.reverse,
      );
      return toConnection(all, args.first);
    },
    collection: (
      _: unknown,
      args: { id?: string; handle?: string },
      ctx: Ctx,
    ) => {
      const { collections, collectionByHandle } = ctx.store;
      if (args.id) return collections[args.id] ?? null;
      if (args.handle)
        return collections[collectionByHandle[args.handle] ?? ""] ?? null;
      return null;
    },
    collectionByHandle: (_: unknown, args: { handle: string }, ctx: Ctx) =>
      ctx.store.collections[ctx.store.collectionByHandle[args.handle] ?? ""] ??
      null,
    collections: (
      _: unknown,
      args: { first?: number; sortKey?: string; reverse?: boolean },
      ctx: Ctx,
    ) => {
      const all = sortCollections(
        Object.values(ctx.store.collections),
        args.sortKey,
        args.reverse,
      );
      return toConnection(all, args.first);
    },
    cart: (_: unknown, args: { id: string }, ctx: Ctx) =>
      ctx.store.carts.get(args.id) ?? null,
    node: (_: unknown, args: { id: string }, ctx: Ctx) => {
      const s = ctx.store;
      return (
        s.products[args.id] ??
        s.variants[args.id] ??
        s.collections[args.id] ??
        s.carts.get(args.id) ??
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
    featuredImage: (p: Product, _: unknown, ctx: Ctx) =>
      ctx.store.images[p.featuredImageId] ?? null,
    images: (p: Product, args: { first?: number }, ctx: Ctx) =>
      toConnection(
        p.imageIds.map((id) => ctx.store.images[id]).filter(Boolean) as Image[],
        args.first,
      ),
    options: (p: Product, _: unknown, ctx: Ctx) =>
      p.optionIds.map((id) => ctx.store.productOptions[id]).filter(Boolean),
    priceRange: (p: Product, _: unknown, ctx: Ctx) => {
      const r = priceRange(ctx.store, p);
      return { minVariantPrice: r.min, maxVariantPrice: r.max };
    },
    variants: (p: Product, args: { first?: number }, ctx: Ctx) =>
      toConnection(
        p.variantIds
          .map((id) => ctx.store.variants[id])
          .filter(Boolean) as ProductVariant[],
        args.first,
      ),
    collections: (p: Product, args: { first?: number }, ctx: Ctx) =>
      toConnection(
        p.collectionIds
          .map((id) => ctx.store.collections[id])
          .filter(Boolean) as Collection[],
        args.first,
      ),
  },

  ProductVariant: {
    product: (v: ProductVariant, _: unknown, ctx: Ctx) =>
      ctx.store.products[v.productId] ?? null,
  },

  Collection: {
    image: (c: Collection, _: unknown, ctx: Ctx) =>
      c.imageId ? (ctx.store.images[c.imageId] ?? null) : null,
    products: (
      c: Collection,
      args: { first?: number; sortKey?: string; reverse?: boolean },
      ctx: Ctx,
    ) => {
      const list = c.productIds
        .map((id) => ctx.store.products[id])
        .filter(Boolean) as Product[];
      return toConnection(
        sortProducts(ctx.store, list, args.sortKey, args.reverse),
        args.first,
      );
    },
  },

  Cart: {
    totalQuantity: (c: Cart, _: unknown, ctx: Ctx) =>
      cartTotal(ctx.store, c).quantity,
    cost: (c: Cart, _: unknown, ctx: Ctx) => {
      const t = cartTotal(ctx.store, c);
      return { subtotalAmount: t.subtotal, totalAmount: t.total };
    },
    lines: (c: Cart, args: { first?: number }) =>
      toConnection(c.lines as (CartLine & { id: string })[], args.first),
    checkoutUrl: (c: Cart, _: unknown, ctx: Ctx) =>
      `https://${ctx.store.slug}.mock-shop.local/checkout/${encodeURIComponent(c.id)}`,
  },

  CartLine: {
    merchandise: (l: CartLine, _: unknown, ctx: Ctx) =>
      ctx.store.variants[l.merchandiseId] ?? null,
    cost: (l: CartLine, _: unknown, ctx: Ctx) => {
      const v = ctx.store.variants[l.merchandiseId];
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
      args: {
        input?: {
          lines?: { merchandiseId: string; quantity?: number }[];
          note?: string;
          buyerIdentity?: { countryCode?: string };
        };
      },
      ctx: Ctx,
    ) => {
      const userErrors: { field: string[]; message: string }[] = [];
      const id = newCartId(ctx.store.slug);
      const cart: Cart = {
        id,
        lines: [],
        createdAt: nowIso(),
        updatedAt: nowIso(),
        note: args.input?.note ?? null,
        buyerIdentity: {
          countryCode: args.input?.buyerIdentity?.countryCode ?? "US",
        },
      };
      for (const line of args.input?.lines ?? []) {
        if (!ctx.store.variants[line.merchandiseId]) {
          userErrors.push({
            field: ["lines", "merchandiseId"],
            message: `Variant ${line.merchandiseId} not found.`,
          });
          continue;
        }
        cart.lines.push({
          id: newLineId(ctx.store.slug),
          quantity: line.quantity ?? 1,
          merchandiseId: line.merchandiseId,
        });
      }
      ctx.store.carts.set(id, cart);
      return { cart, userErrors };
    },

    cartLinesAdd: (
      _: unknown,
      args: {
        cartId: string;
        lines: { merchandiseId: string; quantity?: number }[];
      },
      ctx: Ctx,
    ) => {
      const cart = ctx.store.carts.get(args.cartId);
      const userErrors: { field: string[]; message: string }[] = [];
      if (!cart) {
        return {
          cart: null,
          userErrors: [{ field: ["cartId"], message: "Cart not found." }],
        };
      }
      for (const line of args.lines) {
        const variant = ctx.store.variants[line.merchandiseId];
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
        if (existing) existing.quantity += line.quantity ?? 1;
        else
          cart.lines.push({
            id: newLineId(ctx.store.slug),
            quantity: line.quantity ?? 1,
            merchandiseId: line.merchandiseId,
          });
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
      ctx: Ctx,
    ) => {
      const cart = ctx.store.carts.get(args.cartId);
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
        if (upd.merchandiseId && ctx.store.variants[upd.merchandiseId]) {
          line.merchandiseId = upd.merchandiseId;
        }
        if (typeof upd.quantity === "number") line.quantity = upd.quantity;
      }
      cart.lines = cart.lines.filter((l) => l.quantity > 0);
      cart.updatedAt = nowIso();
      return { cart, userErrors };
    },

    cartLinesRemove: (
      _: unknown,
      args: { cartId: string; lineIds: string[] },
      ctx: Ctx,
    ) => {
      const cart = ctx.store.carts.get(args.cartId);
      if (!cart)
        return {
          cart: null,
          userErrors: [{ field: ["cartId"], message: "Cart not found." }],
        };
      cart.lines = cart.lines.filter((l) => !args.lineIds.includes(l.id));
      cart.updatedAt = nowIso();
      return { cart, userErrors: [] };
    },
  },
};
