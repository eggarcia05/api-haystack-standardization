import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client/core/core.cjs";
import { setAuthorization } from "./links/auth";
import { uriLink } from "./links/uri";

const HASURA_URL = "http://200.126.14.233:8062/v1/graphql";
const HASURA_SECRET = "perc";

const links = () => new ApolloLink.from([setAuthorization(), uriLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: HASURA_URL,
  // credentials: "include",
  headers: {
    "x-hasura-admin-secret": HASURA_SECRET ?? "",
  },

  link: links(),
  // Provide some optional constructor fields
  name: "api-tesis",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
