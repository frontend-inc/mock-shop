import Image from "next/image";
import Link from "next/link";
import { storefront, formatMoney } from "@/lib/shop/client";
import {
  getCartId,
  removeCartLine,
  updateCartLine,
  clearCartCookie,
} from "@/lib/shop/cart";

type CartData = {
  cart: {
    id: string;
    totalQuantity: number;
    cost: {
      subtotalAmount: { amount: string; currencyCode: string };
      totalAmount: { amount: string; currencyCode: string };
    };
    lines: {
      nodes: {
        id: string;
        quantity: number;
        cost: {
          totalAmount: { amount: string; currencyCode: string };
        };
        merchandise: {
          id: string;
          title: string;
          image: { url: string; altText: string | null } | null;
          price: { amount: string; currencyCode: string };
          product: { handle: string; title: string };
        };
      }[];
    };
    checkoutUrl: string;
  } | null;
};

const CART_QUERY = /* GraphQL */ `
  query Cart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        nodes {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              product {
                handle
                title
              }
            }
          }
        }
      }
      checkoutUrl
    }
  }
`;

export default async function CartPage() {
  const cartId = await getCartId();
  const data = cartId
    ? await storefront<CartData>(CART_QUERY, { id: cartId })
    : { cart: null };
  const cart = data.cart;

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <div className="py-16 text-center space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="text-zinc-500">
          Add something from the{" "}
          <Link href="/" className="underline underline-offset-2">
            shop
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Cart</h1>
          <form
            action={async () => {
              "use server";
              await clearCartCookie();
            }}
          >
            <button
              type="submit"
              className="text-xs text-zinc-500 hover:underline"
            >
              Clear cart
            </button>
          </form>
        </div>
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {cart.lines.nodes.map((line) => (
            <li key={line.id} className="flex gap-4 py-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
                {line.merchandise.image ? (
                  <Image
                    src={line.merchandise.image.url}
                    alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                    fill
                    sizes="5rem"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${line.merchandise.product.handle}`}
                  className="text-sm font-medium hover:underline"
                >
                  {line.merchandise.product.title}
                </Link>
                <p className="text-xs text-zinc-500">{line.merchandise.title}</p>
                <p className="text-xs text-zinc-500 mt-1 tabular-nums">
                  {formatMoney(
                    line.merchandise.price.amount,
                    line.merchandise.price.currencyCode,
                  )}{" "}
                  each
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-sm tabular-nums">
                  {formatMoney(
                    line.cost.totalAmount.amount,
                    line.cost.totalAmount.currencyCode,
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <form
                    action={async () => {
                      "use server";
                      await updateCartLine(line.id, line.quantity - 1);
                    }}
                  >
                    <button
                      type="submit"
                      className="h-7 w-7 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                  </form>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {line.quantity}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await updateCartLine(line.id, line.quantity + 1);
                    }}
                  >
                    <button
                      type="submit"
                      className="h-7 w-7 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await removeCartLine(line.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs text-zinc-500 hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="space-y-4 lg:sticky lg:top-10 self-start">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Subtotal</span>
            <span className="tabular-nums">
              {formatMoney(
                cart.cost.subtotalAmount.amount,
                cart.cost.subtotalAmount.currencyCode,
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Items</span>
            <span className="tabular-nums">{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between text-base font-medium border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span>Total</span>
            <span className="tabular-nums">
              {formatMoney(
                cart.cost.totalAmount.amount,
                cart.cost.totalAmount.currencyCode,
              )}
            </span>
          </div>
          <a
            href={cart.checkoutUrl}
            className="block w-full text-center rounded-full px-5 py-3 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Checkout
          </a>
          <p className="text-xs text-zinc-500 text-center">
            Mock checkout — no real payment.
          </p>
        </div>
        <p className="text-xs text-zinc-500">
          Cart id: <code className="break-all">{cart.id}</code>
        </p>
      </aside>
    </div>
  );
}
