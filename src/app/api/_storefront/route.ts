// Fixed-path Storefront API handler.
//
// Subdomain routing rewrites the canonical Shopify path
// (https://<theme>.mockshop.dev/api/<version>/graphql.json) here. We resolve
// the theme from the Host header rather than from a dynamic route segment so
// the rewrite doesn't have to thread the slug through a [param] (Vercel's
// rewrite caching keeps the *original* URL's params, which would mis-route
// the request).

import { yogaFor } from "@/lib/shop/yoga";
import { isThemeSlug, type ThemeSlug } from "@/lib/shop/themes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HOST_RE = /^([a-z0-9-]+)\./i;

function themeFromRequest(request: Request): ThemeSlug | null {
  const host = request.headers.get("host") ?? "";
  const m = HOST_RE.exec(host);
  if (!m) return null;
  const slug = m[1].toLowerCase();
  return isThemeSlug(slug) ? slug : null;
}

async function handle(request: Request) {
  const slug = themeFromRequest(request);
  if (!slug) {
    return new Response("Storefront not found for host.", { status: 404 });
  }
  return yogaFor(slug).handle(request, {});
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}

export async function OPTIONS(request: Request) {
  return handle(request);
}
