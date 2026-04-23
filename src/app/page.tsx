import Image from "next/image";
import Link from "next/link";
import { storefront, formatMoney } from "@/lib/shop/client";

type HomeData = {
  shop: { name: string; description: string };
  collections: {
    nodes: {
      handle: string;
      title: string;
      description: string;
      image: { url: string; altText: string | null } | null;
    }[];
  };
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
};

const HOME_QUERY = /* GraphQL */ `
  {
    shop {
      name
      description
    }
    collections(first: 4, sortKey: TITLE) {
      nodes {
        handle
        title
        description
        image {
          url
          altText
        }
      }
    }
    products(first: 8, sortKey: TITLE) {
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
`;

export default async function Home() {
  const data = await storefront<HomeData>(HOME_QUERY);
  return (
    <div className="space-y-16">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">
          {data.shop.name}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {data.shop.description}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-6">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.collections.nodes.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                {c.image ? (
                  <Image
                    src={c.image.url}
                    alt={c.image.altText ?? c.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="mt-3">
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-zinc-500 line-clamp-1">
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Featured products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {data.products.nodes.map((p) => (
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
      </section>
    </div>
  );
}
