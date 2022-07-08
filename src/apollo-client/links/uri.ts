import { HttpLink } from "@apollo/client/core/core.cjs";
import fetch from "node-fetch";

const HASURA_URL = "http://200.126.14.233:8062/v1/graphql";

export const uriLink = new HttpLink({
  uri: HASURA_URL,
  fetch,
});
