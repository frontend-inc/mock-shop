import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { storefront, formatMoney } from "@/lib/shop/client";
import { addToCart } from "@/lib/shop/cart";
import { isThemeSlug, type ThemeSlug } from "@/lib/shop/themes";

type ProductData = {
  product: {
    handle: string;
    title: string;
    descriptionHtml: string;
    vendor: string;
    productType: string;
    tags: string[];
    availableForSale: boolean;
    featuredImage: { url: string; altText: string | null } | null;
    images: { nodes: { url: string; altText: string | null }[] };
    options: { name: string; values: string[] }[];
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
      maxVariantPrice: { amount: string; currencyCode: string };
    };
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
        selectedOptions: { name: string; value: string }[];
      }[];
    };
    collections: { nodes: { handle: string; title: string }[] };
  } | null;
};

const QUERY = /* GraphQL */ `
  query Product($handle: String!) {
    product(handle: $handle) {
      handle
      title
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      featuredImage {
        url
        altText
      }
      images(first: 8) {
        nodes {
          url
          altText
        }
      }
      options {
        name
        values
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
      collections(first: 5) {
        nodes {
          handle
          title
        }
      }
    }
  }
`;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ theme: string; handle: string }>;
}) {
  const { theme, handle } = await params;
  if (!isThemeSlug(theme)) notFound();
  const data = await storefront<ProductData>(theme, QUERY, { handle });
  const p = data.product;
  if (!p) notFound();

  const min = formatMoney(
    p.priceRange.minVariantPrice.amount,
    p.priceRange.minVariantPrice.currencyCode,
  );
  const max = formatMoney(
    p.priceRange.maxVariantPrice.amount,
    p.priceRange.maxVariantPrice.currencyCode,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-3">
        {p.featuredImage ? (
          <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={p.featuredImage.url}
              alt={p.featuredImage.altText ?? p.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
        {p.images.nodes.length > 1 ? (
          <div className="grid grid-cols-4 gap-3">
            {p.images.nodes.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? p.title}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-8">
        <header>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            {p.vendor} · {p.productType}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">
            {p.title}
          </h1>
          <p className="mt-2 text-lg tabular-nums">
            {min === max ? min : `${min} – ${max}`}
          </p>
          {p.collections.nodes.length > 0 ? (
            <p className="mt-3 text-xs text-zinc-500">
              In:{" "}
              {p.collections.nodes.map((c, i) => (
                <span key={c.handle}>
                  <Link
                    href={`/${theme}/collections/${c.handle}`}
                    className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    {c.title}
                  </Link>
                  {i < p.collections.nodes.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          ) : null}
        </header>

        <div
          className="prose prose-sm dark:prose-invert text-zinc-700 dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
        />

        <section className="space-y-3">
          <h2 className="text-sm font-medium">Variants</h2>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-md">
            {p.variants.nodes.map((v) => (
              <VariantRow key={v.id} theme={theme} v={v} />
            ))}
          </ul>
        </section>

        {p.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function VariantRow({
  theme,
  v,
}: {
  theme: ThemeSlug;
  v: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
    compareAtPrice: { amount: string; currencyCode: string } | null;
    selectedOptions: { name: string; value: string }[];
  };
}) {
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{v.title}</p>
        <p className="text-xs text-zinc-500">
          {v.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm tabular-nums">
          {formatMoney(v.price.amount, v.price.currencyCode)}
        </span>
        {v.compareAtPrice ? (
          <span className="text-xs text-zinc-400 line-through tabular-nums">
            {formatMoney(
              v.compareAtPrice.amount,
              v.compareAtPrice.currencyCode,
            )}
          </span>
        ) : null}
        <form
          action={async () => {
            "use server";
            await addToCart(theme, v.id, 1);
          }}
        >
          <button
            type="submit"
            disabled={!v.availableForSale}
            className="text-xs font-medium rounded-full px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {v.availableForSale ? "Add" : "Sold out"}
          </button>
        </form>
      </div>
    </li>
  );
}
