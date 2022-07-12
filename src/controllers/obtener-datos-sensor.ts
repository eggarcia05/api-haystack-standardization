import { Request, Response, NextFunction } from "express";
import { fetchQuery } from "../servicios/query-apollo";
import { traducirQuery as traducirFiltroQuery } from "../utils/helper-functions";

export const obtenerDatosDeSensor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyRequest: QuerySensorData = req.body;
  const filtroGraph = traducirFiltroQuery(bodyRequest);

  const query = "GET_REGISTRO_SENSORES";
  const variables = {
    where: filtroGraph,
  };

  const { status, body } = await fetchQuery(query, variables);
  res.status(status).send({ msg: body });
};
