import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client/core/core.cjs";

import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import fetch from "node-fetch";
import { setAuthorization } from "./links/auth";

const HASURA_URL = "http://200.126.14.233:8062/v1/graphql";

const HASURA_SECRET = "perc";

const httpLink = new HttpLink({
  uri: HASURA_URL, // use https for secure endpoint
  fetch
});

// Create a WebSocket link:

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = <any>getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  httpLink
  );
  
  const links = () => new ApolloLink.from([setAuthorization(), link]);
const cache = new InMemoryCache();

export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
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
