import { yoga } from "@/lib/shop/yoga";

// Cart mutations write to in-process memory, so this route must always run
// dynamically — never let Next.js cache it.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  return yoga.handle(request, {});
}

export async function POST(request: Request) {
  return yoga.handle(request, {});
}

export async function OPTIONS(request: Request) {
  return yoga.handle(request, {});
}
