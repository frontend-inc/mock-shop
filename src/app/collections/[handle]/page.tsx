import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { storefront, formatMoney } from "@/lib/shop/client";

type CollectionData = {
  collection: {
    handle: string;
    title: string;
    description: string;
    image: { url: string; altText: string | null } | null;
    products: {
      nodes: {
        handle: string;
        title: string;
        featuredImage: { url: string; altText: string | null } | null;
        priceRange: {
          minVariantPrice: { amount: string; currencyCode: string };
        };
      }[];
    };
  } | null;
};

const QUERY = /* GraphQL */ `
  query Collection($handle: String!) {
    collection(handle: $handle) {
      handle
      title
      description
      image {
        url
        altText
      }
      products(first: 24, sortKey: TITLE) {
        nodes {
          handle
          title
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const data = await storefront<CollectionData>(QUERY, { handle });
  if (!data.collection) notFound();
  const c = data.collection;

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Collection
          </p>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">
            {c.title}
          </h1>
          <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
            {c.description}
          </p>
        </div>
        {c.image ? (
          <div className="relative w-full sm:w-72 aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={c.image.url}
              alt={c.image.altText ?? c.title}
              fill
              sizes="(min-width: 640px) 18rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </header>

      {c.products.nodes.length === 0 ? (
        <p className="text-zinc-500">No products in this collection.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {c.products.nodes.map((p) => (
            <Link
              key={p.handle}
              href={`/products/${p.handle}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
                {p.featuredImage ? (
                  <Image
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText ?? p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium truncate">{p.title}</p>
                <p className="text-sm text-zinc-500 tabular-nums">
                  {formatMoney(
                    p.priceRange.minVariantPrice.amount,
                    p.priceRange.minVariantPrice.currencyCode,
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
