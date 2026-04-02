import { GraphQLClient } from "graphql-request";

let cachedClient: GraphQLClient | null | undefined;

function getHygraphEndpoint(): string | undefined {
  return (
    process.env.HYGRAPH_ENDPOINT || process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT
  );
}

export function isHygraphConfigured(): boolean {
  return Boolean(getHygraphEndpoint());
}

export function getHygraphClient(): GraphQLClient | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const endpoint = getHygraphEndpoint();
  const token = process.env.HYGRAPH_TOKEN;

  if (!endpoint) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = new GraphQLClient(endpoint, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return cachedClient;
}

export default getHygraphClient;
