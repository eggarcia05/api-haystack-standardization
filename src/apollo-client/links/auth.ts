import { ApolloLink } from '@apollo/client/core/core.cjs';

const HASURA_SECRET = "perc";
export const setAuthorization = () => {
    return new ApolloLink(async (operation: any, forward: any) => {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-hasura-admin-secret": HASURA_SECRET ?? "",
          },
        }));
        return forward(operation);
    });
}