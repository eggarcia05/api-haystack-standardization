import Ajv from "ajv";
const ajv = new Ajv({
  allowMatchingProperties: true,
});

export const filtrarPorEtiquetaValue = (
  data: any,
  filtro: string,
  valor: any
) => {
  const { registro } = data;
  const { value } = registro;

  if (filtro === ">=") return value >= Number(valor);
  else if (filtro === ">") return value > Number(valor);
  else if (filtro === "<") return value < Number(valor);
  else if (filtro === "<=") return value <= Number(valor);
  else if (filtro === "=") return value === Number(valor);
};

export const separarEtiquetaValue = (bodyRequest: any) => {
  const { filtroPorEtiquetas } = bodyRequest;
  const { etiquetas } = filtroPorEtiquetas ?? [];
  const nuevosTagsDeFiltro: any = [];
  let valueFilter: any;
  etiquetas?.map((etiqueta: any) => {
    if (etiqueta.nombreEtiqueta !== "value") nuevosTagsDeFiltro.push(etiqueta);
    else valueFilter = etiqueta;
  });

  bodyRequest["filtroPorEtiquetas"] = bodyRequest["filtroPorEtiquetas"] ?? {};
  bodyRequest["filtroPorEtiquetas"]["etiquetas"] = nuevosTagsDeFiltro;
  return valueFilter;
};

export function validarJSON(objetoAValidar: any, schema: any): Result {
  const validate = ajv.compile(schema);
  const esValido = validate(objetoAValidar);

  const result: Result = {
    valido: esValido,
    errorMsg: validate.errors ?? "",
  };

  return result;
}

export const traducirQuery = (queryParams: QuerySensorData) => {
  const {
    pointsIds,
    intervaloTimestamp,
    filtroPorEtiquetas,
    ordenarPor,
    limite: limit,
  } = queryParams;
  const { timestampInicial, timestampFinal } = intervaloTimestamp ?? {};
  const { incluirTodos, etiquetas } = filtroPorEtiquetas ?? {};

  let where: any = {
    _and: [
      {
        _or:
          pointsIds && pointsIds.length > 0
            ? pointsIds.map((pointId) => {
                return { point_id: { _eq: pointId } };
              })
            : {},
      },
      {
        _and: [
          timestampInicial
            ? { timestamp_registro: { _gte: timestampInicial } }
            : {},
          timestampFinal
            ? { timestamp_registro: { _lte: timestampFinal } }
            : {},
        ],
      },
    ],
  };

  if (etiquetas && etiquetas.length > 0) {
    if (incluirTodos == true) {
      where["_and"] = [
        ...where["_and"],
        {
          _and: etiquetas?.map((etiqueta) => {
            let valor: any = true;
            if (etiqueta.valor) {
              valor = String(etiqueta.valor);
              if (valor.toLowerCase() === "true") {
                valor = true;
              } else if (valor.toLowerCase() === "false") {
                valor = false;
              }
            }

            return {
              registro: {
                _contains: { [etiqueta.nombreEtiqueta]: valor },
              },
            };
          }),
        },
      ];
    } else {
      where["_and"] = [
        ...where["_and"],
        {
          _or: etiquetas?.map((etiqueta) => {
            let valor: any = etiqueta.valor;
            if (etiqueta.valor) {
              valor = String(etiqueta.valor);
              if (valor.toLowerCase() === "true") {
                valor = true;
              } else if (valor.toLowerCase() === "false") {
                valor = false;
              }
            } else {
              valor = etiqueta.valor;
            }

            return {
              registro: {
                _contains: { [etiqueta.nombreEtiqueta]: valor },
              },
            };
          }),
        },
      ];
    }
  }

  // if (etiquetas?.length)
  const queryTraducido = { where, order_by: ordenarPor, limit };

  return queryTraducido;
};

export const wheresObj: any = {
  pointWhere: (refId: string) => {
    return {
      where: {
        _or: [{ siteRef: { _eq: refId } }, { equipRef: { _eq: refId } }],
      },
    };
  },
  equipWhere: (refId: string) => {
    return {
      where: {
        _or: [{ siteRef: { _eq: refId } }],
      },
    };
  },
  siteWhere: (refId?: string) => {
    return {};
  },
};
