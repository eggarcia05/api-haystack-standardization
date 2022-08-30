import { listaDeMutations } from "../modelos-graph/lista-mutations";
import { getClient } from "../urql-client/hasura";

export const fetchMutation =async (mutate: string, variables: any): Promise<any> => {

  try {
    const newClient = getClient();
    delete variables.url;

    const { data, error } = await newClient
      .mutation(listaDeMutations[mutate], variables)
      .toPromise();

    if (error) {
      return {
        status: 400,
        error,
      };
    }

    return { status: 200, body: data };
    // return result;
  } catch (error) {
    return {
      status: 400,
      error,
    };
  }
}