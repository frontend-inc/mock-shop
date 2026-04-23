import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
  // Yoga returns the standard Web Response, which Next.js route handlers can
  // pass through directly.
  fetchAPI: { Response: globalThis.Response, Request: globalThis.Request },
});
