import { Request, Response, NextFunction } from "express";
import { fetchQuery } from "../servicios/query-urql";
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
  const {where, order_by, limit} = traducirFiltroQuery(bodyRequest);

  const query = "GET_REGISTRO_SENSORES";
  const variables = {
    where, order_by, limit
  };

  

  const { status, body } = await fetchQuery(query, variables);
  const { registros_sensores } = body;
  console.log(query, variables);
  console.log(body);


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
