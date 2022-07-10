import { gql } from "@apollo/client/core/core.cjs";
import { client } from "../apollo-client/apolloClient";

const insert_registros_sensores = gql`
  mutation registrarValorPunto($point_id: String, $registro: jsonb) {
    insert_registros_sensores(
      objects: { point_id: $point_id, registro: $registro }
    ) {
      affected_rows
    }
  }
`;

export const registrarValorSensadoPorPunto = async (
  pointData: any,
  bodyReq: NewSensorPayload
) => {
  const { tags, clave_esperada, id } = pointData;
  tags["value"] = bodyReq[clave_esperada];

  const variables = {
    point_id: id,
    registro: tags,
  };

  const { data, error } = await client.mutate({
    mutation: insert_registros_sensores,
    variables,
  });

  if (error)
    return {
      status: 400,
      msg: error,
    };

  const filasAfectadas = data?.insert_registros_sensores?.affected_rows ?? null;

  if (filasAfectadas) return { status: 200, msg: "Registro exitoso" };

  return {
    status: 404,
    msg: "Error durante el registro",
  };
};
