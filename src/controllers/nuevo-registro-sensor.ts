import { Request, Response, NextFunction } from "express";
import { fetchMutation } from "../servicios/mutation-apollo";
import { fetchQuery } from "../servicios/query-apollo";

export const registrarDatosDeSensor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, ...rest }: NewSensorPayload = req.body;
  const clavesEsperadas = Object.keys(rest);

  const result: any = {};

  for (let clave_esperada of clavesEsperadas) {
    let query: string = "point";
    let variables: any = {
      equipRef_id: id,
      clave_esperada,
    };

    const { status: statusQuery, body } = await fetchQuery(query, variables);
    const { point } = body ?? [];

    if (statusQuery === 200 && point.length > 0) {
      const { tags, id: pointId } = point?.[0] ?? {};
      tags["value"] = rest[clave_esperada];

      query = "insert_registros_sensores";
      variables = {
        point_id: pointId,
        registro: tags,
      };

      const { status: statusMutation, body: bodyMutationResult } =
        await fetchMutation(query, variables);
      result[clave_esperada] = !!bodyMutationResult;
    } else [(result[clave_esperada] = false)];
  }

  res.status(200).send({ msg: result });
};
