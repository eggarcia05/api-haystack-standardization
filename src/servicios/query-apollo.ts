import { client } from "../apollo-client/apolloClient";
import { listaDeQueries } from "../modelos-graph/lista-queries";

export const fetchQuery = async (query: string, variables: any) => {
  try {
    const { data, error } = await client.query({
      query: listaDeQueries[query],
      variables,
    });

    if (error)
      return {
        status: 400,
        body: error,
      };

    return { status: 200, body: data };
  } catch (error) {
    console.log("🚀 ~ file: query-apollo.ts ~ line 19 ~ fetchQuery ~ error)", error)
    return {
      status: 400,
      body: error,
    };
  }
};
