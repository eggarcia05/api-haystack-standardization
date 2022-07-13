import { fetchQuery } from "../servicios/query-apollo";

export const getRealtimeSensorData = async (pointId: string, limit: number) => {

  const query = "GET_REGISTRO_SENSORES";
  const variables = {
    where: pointId
      ? {
          point_id: { _eq: pointId },
        }
      : {},
    limit,
  };

  const { body } = await fetchQuery(query, variables);
  const data = body?.registros_sensores ?? [];

  return data;
};
