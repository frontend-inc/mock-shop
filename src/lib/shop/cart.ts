"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { storefront } from "./client";
import type { ThemeSlug } from "./themes";

const cartCookieName = (theme: ThemeSlug) => `mock_shop_cart_${theme}`;

type CartIdPayload = {
  cart: { id: string } | null;
  userErrors: { message: string }[];
};

async function readCartId(theme: ThemeSlug): Promise<string | null> {
  const c = await cookies();
  return c.get(cartCookieName(theme))?.value ?? null;
}

async function writeCartId(theme: ThemeSlug, id: string) {
  const c = await cookies();
  c.set(cartCookieName(theme), id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export async function getCartId(theme: ThemeSlug): Promise<string | null> {
  return readCartId(theme);
}

async function ensureCart(
  theme: ThemeSlug,
  initialVariantId?: string,
  qty = 1,
): Promise<string> {
  const existing = await readCartId(theme);
  if (existing) return existing;
  const data = await storefront<{ cartCreate: CartIdPayload }>(
    theme,
    `mutation Create($input: CartInput) {
      cartCreate(input: $input) { cart { id } userErrors { message } }
    }`,
    {
      input: initialVariantId
        ? { lines: [{ merchandiseId: initialVariantId, quantity: qty }] }
        : {},
    },
  );
  const id = data.cartCreate.cart?.id;
  if (!id) {
    const msg =
      data.cartCreate.userErrors[0]?.message ?? "Failed to create cart";
    throw new Error(msg);
  }
  await writeCartId(theme, id);
  return id;
}

export async function addToCart(
  theme: ThemeSlug,
  merchandiseId: string,
  quantity = 1,
) {
  const existing = await readCartId(theme);
  if (!existing) {
    await ensureCart(theme, merchandiseId, quantity);
  } else {
    await storefront(
      theme,
      `mutation Add($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { id } userErrors { message }
        }
      }`,
      { cartId: existing, lines: [{ merchandiseId, quantity }] },
    );
  }
  revalidatePath(`/${theme}/cart`);
  revalidatePath(`/${theme}`, "layout");
}

export async function updateCartLine(
  theme: ThemeSlug,
  lineId: string,
  quantity: number,
) {
  const cartId = await readCartId(theme);
  if (!cartId) return;
  await storefront(
    theme,
    `mutation Update($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id } userErrors { message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  revalidatePath(`/${theme}/cart`);
  revalidatePath(`/${theme}`, "layout");
}

export async function removeCartLine(theme: ThemeSlug, lineId: string) {
  const cartId = await readCartId(theme);
  if (!cartId) return;
  await storefront(
    theme,
    `mutation Remove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id } userErrors { message }
      }
    }`,
    { cartId, lineIds: [lineId] },
  );
  revalidatePath(`/${theme}/cart`);
  revalidatePath(`/${theme}`, "layout");
}

export async function clearCartCookie(theme: ThemeSlug) {
  const c = await cookies();
  c.delete(cartCookieName(theme));
  revalidatePath(`/${theme}/cart`);
  revalidatePath(`/${theme}`, "layout");
}
