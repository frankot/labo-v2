import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_ENDPOINT is not defined');
}

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default hygraphClient;
