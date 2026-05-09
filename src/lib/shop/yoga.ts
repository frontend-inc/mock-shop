import { createSchema, createYoga, type YogaServerInstance } from "graphql-yoga";
import { resolvers, type Ctx } from "./resolvers";
import { typeDefs } from "./schema";
import { getStore } from "./store";
import type { ThemeSlug } from "./themes";

const schema = createSchema({ typeDefs, resolvers });

// One yoga instance per theme. Built lazily and cached so each request
// resolves through the right per-theme store.
const handlers: Partial<Record<ThemeSlug, YogaServerInstance<Ctx, object>>> =
  {};

export function yogaFor(slug: ThemeSlug): YogaServerInstance<Ctx, object> {
  const cached = handlers[slug];
  if (cached) return cached;
  const yoga = createYoga<Ctx>({
    schema,
    graphqlEndpoint: `/api/${slug}/graphql`,
    context: () => ({ store: getStore(slug) }),
    fetchAPI: { Response: globalThis.Response, Request: globalThis.Request },
  });
  handlers[slug] = yoga;
  return yoga;
}
