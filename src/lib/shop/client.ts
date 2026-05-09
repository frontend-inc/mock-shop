// Server-side GraphQL client for the in-memory mock storefront. Each theme
// has its own /api/{theme}/graphql route, but on the server we call yoga
// directly to avoid a self-loopback HTTP request — that round-trip would
// fail under host-based subdomain routing (the public host doesn't resolve
// from inside the server).

import { yogaFor } from "./yoga";
import type { ThemeSlug } from "./themes";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function storefront<T>(
  theme: ThemeSlug,
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  // The URL only matters to yoga's internal router — point it at the same
  // path the public route handler exposes.
  const req = new Request(`http://internal/api/${theme}/graphql`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const res = await yogaFor(theme).handle(req, {});
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
