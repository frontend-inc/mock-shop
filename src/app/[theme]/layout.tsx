import Link from "next/link";
import { notFound } from "next/navigation";
import { storefront } from "@/lib/shop/client";
import { getCartId } from "@/lib/shop/cart";
import { getTheme, isThemeSlug, type ThemeSlug } from "@/lib/shop/themes";

async function fetchCartQuantity(
  theme: ThemeSlug,
  cartId: string | null,
): Promise<number> {
  if (!cartId) return 0;
  try {
    const data = await storefront<{ cart: { totalQuantity: number } | null }>(
      theme,
      `query CartCount($id: ID!) { cart(id: $id) { totalQuantity } }`,
      { id: cartId },
    );
    return data.cart?.totalQuantity ?? 0;
  } catch {
    return 0;
  }
}

async function CartCount({ theme }: { theme: ThemeSlug }) {
  const qty = await fetchCartQuantity(theme, await getCartId(theme));
  return <span className="tabular-nums">{qty}</span>;
}

async function NavCollections({ theme }: { theme: ThemeSlug }) {
  const data = await storefront<{
    collections: { nodes: { handle: string; title: string }[] };
  }>(theme, `{ collections(first: 8) { nodes { handle title } } }`);
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
      {data.collections.nodes.map((c) => (
        <Link
          key={c.handle}
          href={`/${theme}/collections/${c.handle}`}
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}

export default async function ThemeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ theme: string }>;
}) {
  const { theme: slug } = await params;
  if (!isThemeSlug(slug)) notFound();
  const theme = getTheme(slug);

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between text-xs text-zinc-500">
          <Link href="/" className="hover:underline">
            ← All shops
          </Link>
          <span className="uppercase tracking-widest">{slug}</span>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
          <Link
            href={`/${slug}`}
            className="text-lg font-semibold tracking-tight"
          >
            {theme.shop.name}
          </Link>
          <div className="flex-1 hidden md:block">
            <NavCollections theme={slug} />
          </div>
          <Link
            href={`/${slug}/cart`}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Cart (<CartCount theme={slug} />)
          </Link>
        </div>
        <div className="md:hidden mx-auto max-w-6xl px-6 pb-4">
          <NavCollections theme={slug} />
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
        {children}
      </main>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500 flex flex-wrap gap-x-6 gap-y-2 justify-between">
          <span>{theme.shop.tagline}</span>
          <Link href={`/api/${slug}/graphql`} className="hover:underline">
            GraphiQL ↗
          </Link>
        </div>
      </footer>
    </div>
  );
}
