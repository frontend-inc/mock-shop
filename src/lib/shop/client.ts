// Tiny GraphQL client used by server components and route handlers to query
// the local mock storefront. Server-rendered pages call straight into the
// in-memory schema via /api/graphql.

import { headers } from "next/headers";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

async function endpoint(): Promise<string> {
  // We are server-rendering, so build an absolute URL from the incoming
  // request headers. For the demo it's always our own /api/graphql.
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}/api/graphql`;
}

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const url = await endpoint();
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
