import Ajv from "ajv";

const mayorIgual = (valor: number) => {};

const menorIgual = (valor: number) => {};

const mayor = (valor: number) => {};

const menor = (valor: number) => {};

const igualdad = (valor: number | string) => {
  if (typeof valor === "string") {
  } else {
  }
};

const condiciones = {
  ">=": mayorIgual,
  ">": mayor,
  "<=": menorIgual,
  "<": menor,
  "=": igualdad,
};

export const traducirQuery = (queryParams: QuerySensorData) => {
  const {
    pointsIds,
    sitesIds,
    equipsIds,
    intervaloTimestamp,
    filtroPorEtiquetas,
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

    // registro:
    //   !!etiquetas && etiquetas.length > 0
    //     ? incluirTodos
    //       ? {
    //           _has_keys_all: etiquetas?.map(
    //             (etiqueta) => etiqueta.nombreEtiqueta
    //           ),
    //         }
    //       : {
    //           _has_keys_any: etiquetas?.map(
    //             (etiqueta) => etiqueta.nombreEtiqueta
    //           ),
    //         }
    //     : {},
  };

  if (etiquetas && etiquetas.length > 0) {
    if (incluirTodos == true) {
      where["_and"] = [
        ...where["_and"],
        {
          _and: etiquetas?.map((etiqueta) => {
            if (etiqueta.nombreEtiqueta !== "value") {
              let valor: any = etiqueta.valor;
              if (etiqueta.valor) {
                valor = String(etiqueta.valor).toLowerCase();
                if (valor === "true") {
                  valor = true;
                } else if (valor === "false") {
                  valor = false;
                }
              } else {
                valor = true;
              }
              return {
                registro: {
                  _contains: { [etiqueta.nombreEtiqueta]: valor },
                },
              };
            }
            return {};
          }),
        },
      ];
    } else {
      where["_and"] = [
        ...where["_and"],
        {
          _or: etiquetas?.map((etiqueta) => {
            if (etiqueta.nombreEtiqueta !== "value") {
              let valor: any = etiqueta.valor;
              if (etiqueta.valor) {
                valor = String(etiqueta.valor).toLowerCase();
                if (valor === "true") {
                  valor = true;
                } else if (valor === "false") {
                  valor = false;
                }
              } else {
                valor = true;
              }
              return {
                registro: {
                  _contains: { [etiqueta.nombreEtiqueta]: valor },
                },
              };
            }
            return {};
          }),
        },
      ];
    }
  }

  return where;
};

const ajv = new Ajv({ allErrors: true });

// Ajv option allErrors is required
require("ajv-errors")(ajv /*, {singleError: true} */);

interface Result {
  valido: boolean;
  errorMsg: any;
}

export function validarJSON(objetoAValidar: any, schema: any): Result {
  const validate = ajv.compile(schema);

  const esValido = validate(objetoAValidar);

  const result: Result = {
    valido: esValido,
    errorMsg: validate.errors ?? "",
  };

  return result;
}
