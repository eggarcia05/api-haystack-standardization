import { client } from "../apollo-client/apolloClient";
import { listaDeMutations } from "../modelos-graph/lista-mutations";

export const fetchMutation =async (mutate: string, variables: any) => {
    
  try {
   const { data, error } = await client.mutate({
    mutation: listaDeMutations[mutate],
    variables,
  });

    if (error)
      return {
        status: 400,
        body: error,
          };
      
      console.log(data, error);
      

    return { status:200, body: data };
  } catch (error) {
      return {
        status: 400,
        body: error,
      };
  }
};
