import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { storefront } from "@/lib/shop/client";
import { getCartId } from "@/lib/shop/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mock Shop",
  description:
    "An in-memory storefront mock that speaks the Shopify Storefront API.",
};

async function fetchCartQuantity(cartId: string | null): Promise<number> {
  if (!cartId) return 0;
  try {
    const data = await storefront<{ cart: { totalQuantity: number } | null }>(
      `query CartCount($id: ID!) { cart(id: $id) { totalQuantity } }`,
      { id: cartId },
    );
    return data.cart?.totalQuantity ?? 0;
  } catch {
    return 0;
  }
}

async function CartCount() {
  const qty = await fetchCartQuantity(await getCartId());
  return <span className="tabular-nums">{qty}</span>;
}

async function NavCollections() {
  const data = await storefront<{
    collections: { nodes: { handle: string; title: string }[] };
  }>(`{ collections(first: 8) { nodes { handle title } } }`);
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
      {data.collections.nodes.map((c) => (
        <Link
          key={c.handle}
          href={`/collections/${c.handle}`}
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 font-sans">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Mock Shop
            </Link>
            <div className="flex-1 hidden md:block">
              <NavCollections />
            </div>
            <Link
              href="/cart"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Cart (<CartCount />)
            </Link>
          </div>
          <div className="md:hidden mx-auto max-w-6xl px-6 pb-4">
            <NavCollections />
          </div>
        </header>
        <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-10">
          <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500 flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <span>
              In-memory mock storefront. Cart resets when the server restarts.
            </span>
            <Link href="/api/graphql" className="hover:underline">
              GraphiQL ↗
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
