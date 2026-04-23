"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { storefront } from "./client";

const CART_COOKIE = "mock_shop_cart";

type CartIdPayload = { cart: { id: string } | null; userErrors: { message: string }[] };

async function readCartId(): Promise<string | null> {
  const c = await cookies();
  return c.get(CART_COOKIE)?.value ?? null;
}

async function writeCartId(id: string) {
  const c = await cookies();
  c.set(CART_COOKIE, id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export async function getCartId(): Promise<string | null> {
  return readCartId();
}

async function ensureCart(initialVariantId?: string, qty = 1): Promise<string> {
  const existing = await readCartId();
  if (existing) return existing;
  const data = await storefront<{ cartCreate: CartIdPayload }>(
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
    const msg = data.cartCreate.userErrors[0]?.message ?? "Failed to create cart";
    throw new Error(msg);
  }
  await writeCartId(id);
  return id;
}

export async function addToCart(merchandiseId: string, quantity = 1) {
  const existing = await readCartId();
  if (!existing) {
    await ensureCart(merchandiseId, quantity);
  } else {
    await storefront(
      `mutation Add($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { id } userErrors { message }
        }
      }`,
      { cartId: existing, lines: [{ merchandiseId, quantity }] },
    );
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function updateCartLine(lineId: string, quantity: number) {
  const cartId = await readCartId();
  if (!cartId) return;
  await storefront(
    `mutation Update($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { id } userErrors { message }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeCartLine(lineId: string) {
  const cartId = await readCartId();
  if (!cartId) return;
  await storefront(
    `mutation Remove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { id } userErrors { message }
      }
    }`,
    { cartId, lineIds: [lineId] },
  );
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function clearCartCookie() {
  const c = await cookies();
  c.delete(CART_COOKIE);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
