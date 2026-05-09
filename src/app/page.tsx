import Link from "next/link";
import { listThemes } from "@/lib/shop/themes";

export default function Home() {
  const themes = listThemes();
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-zinc-500">
          Mock Shop
        </p>
        <h1 className="text-4xl font-semibold tracking-tight mt-1">
          Ten themed storefronts.
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Each storefront is an in-memory mock that speaks a Shopify-shaped
          Storefront API. Pick one to enter.
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
        {themes.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
              className="block bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-950 p-6 h-full"
            >
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                {t.slug}
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {t.shop.name}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {t.shop.tagline}
              </p>
              <p className="mt-4 text-xs text-zinc-500 line-clamp-3">
                {t.shop.designPOV}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
