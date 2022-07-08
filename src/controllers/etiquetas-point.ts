import { gql } from "@apollo/client/core/core.cjs";
import { client } from "../apollo-client/apolloClient";

const point = gql`
  query point($id: String, $clave_esperada: String) {
    point(
      where: {
        equipRef: { _eq: $id }
        clave_esperada: { _eq: $clave_esperada }
      }
    ) {
      id
      tags
      clave_esperada
    }
  }
`;

export const getEtiquetasDeEntidades = async (body: SensorPayload, clave_esperada:string) => {
  const { id } = body;
  const variables = {
    id,
    clave_esperada
  };

  const { data, error } = await client.query({
    query: point,
    variables,
  });

  if (error)
    return {
      status: 400,
      msg: error,
    };
  

  const entidadPoint = data?.point?.[0] ?? null;
  if (entidadPoint) return { status: 200, body: entidadPoint };

  return {
    status: 404,
    msg: "La entidad solicitada no existe",
  };
};
