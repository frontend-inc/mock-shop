import { notFound } from "next/navigation";
import { yogaFor } from "@/lib/shop/yoga";
import { isThemeSlug } from "@/lib/shop/themes";

// Cart mutations write to in-process memory, so this route must always run
// dynamically — never let Next.js cache it.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ctx = { params: Promise<{ theme: string }> };

async function handle(request: Request, ctx: Ctx) {
  const { theme } = await ctx.params;
  if (!isThemeSlug(theme)) notFound();
  return yogaFor(theme).handle(request, {});
}

export async function GET(request: Request, ctx: Ctx) {
  return handle(request, ctx);
}

export async function POST(request: Request, ctx: Ctx) {
  return handle(request, ctx);
}

export async function OPTIONS(request: Request, ctx: Ctx) {
  return handle(request, ctx);
}
