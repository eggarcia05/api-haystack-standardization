import { listaDeQueries } from "../modelos-graph/lista-queries";
import { getClient } from "../urql-client/hasura";

export const fetchQuery = async (
  query: string,
  variables: any
): Promise<any> => {
  try {
    const newClient = getClient();

    const { data, error } = await newClient
      .query(listaDeQueries[query], variables)
      .toPromise();

    if (error)
      return {
        status: 400,
        body: error,
      };

    return { status: 200, body: data };
    // return result;
  } catch (error) {
    return {
      status: 400,
      body: error,
    };
  }
};
