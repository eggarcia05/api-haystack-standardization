import { Request, Response } from "express";
import { fetchQuery } from "../servicios/query-urql";
import { wheresObj } from "../utils/helper-functions";

export const obtenerEntidades = async (req: Request, res: Response) => {
  const bodyRequest: any = req.body;

  const entidad = bodyRequest.tipo;
  const refId = bodyRequest.entidadRefId;

  let variables: any = {};

  if (refId) variables = wheresObj[`${entidad}Where`](refId);

  const { status, body } = await fetchQuery(entidad, variables);
  const response = body?.[entidad] ?? [];

  res.send({ status, response });
};
