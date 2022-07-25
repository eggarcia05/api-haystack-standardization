import { Request, Response, NextFunction } from "express";
import { fetchQuery } from "../servicios/query-apollo";
import {
  filtrarPorEtiquetaValue,
  separarEtiquetaValue,
  traducirQuery as traducirFiltroQuery,
} from "../utils/helper-functions";

export const obtenerDatosDeSensor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyRequest: QuerySensorData = req.body;

  const valueFilter = separarEtiquetaValue(bodyRequest);
  const where = traducirFiltroQuery(bodyRequest);

  const query = "GET_REGISTRO_SENSORES";
  const variables = {
    where,
  };

  const { status, body } = await fetchQuery(query, variables);
  const { registros_sensores } = body;

  let newResultadoFiltradoPorValor = [];

  if (valueFilter) {
    for (let registro of registros_sensores) {
      if (
        filtrarPorEtiquetaValue(
          registro,
          String(valueFilter.condicion),
          valueFilter.valor
        )
      )
        newResultadoFiltradoPorValor.push(registro);
    }
  } else {
    newResultadoFiltradoPorValor = registros_sensores;
  }

  res.status(status).send({ result: newResultadoFiltradoPorValor });
};
