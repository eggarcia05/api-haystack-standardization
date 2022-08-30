import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "@urql/core";
import fetch from "node-fetch";

export const getClient = () => {
  const gqlClient = createClient({
    url: process.env.HASURA_URL || "",
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
    fetch,
    fetchOptions: () => {
      return {
        headers: { "x-hasura-admin-secret": process.env.HASURA_SECRET || "" },
        // headers: { Authorization: authorization }
      };
    },
  });

  return gqlClient;
};
