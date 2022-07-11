import { gql } from "@apollo/client/core/core.cjs";
import { client } from "../apollo-client/apolloClient";

const DATA_REALTIME = gql`
  query realTimeData {
    registros_sensores(limit: 10, order_by: { timestamp_registro: desc }) {
      id
      timestamp_registro
      registro
    }
  }
`;

export const getRealtimeSensorData = async (
) => {


  const { data, error } = await client.query({
    query: DATA_REALTIME,
  });

  if (error)
    return {
      status: 400,
      msg: error,
    };

  const allData = data?.registros_sensores ?? [];
  if (allData) return { status: 200, result: allData };

  return {
    status: 404,
    msg: "La entidad solicitada no existe",
  };
};
