// Tiny GraphQL client used by server components and route handlers to query
// the local mock storefront. Each theme has its own /api/{theme}/graphql
// endpoint, so the client takes a theme slug.

import { headers } from "next/headers";
import type { ThemeSlug } from "./themes";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function endpoint(theme: ThemeSlug): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}/api/${theme}/graphql`;
}

export async function storefront<T>(
  theme: ThemeSlug,
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const url = await endpoint(theme);
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("No data returned from storefront");
  return json.data;
}

export function formatMoney(amount: string, currencyCode: string): string {
  const n = Number(amount);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(n);
  } catch {
    return `${currencyCode} ${n.toFixed(2)}`;
  }
}
