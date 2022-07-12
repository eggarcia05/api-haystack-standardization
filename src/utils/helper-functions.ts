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
  const { pointsIds, intervaloTimestamp, filtroPorEtiquetas } = queryParams;
  const { timestampInicial, timestampFinal } = intervaloTimestamp ?? {};
  const {  incluirTodos, etiquetas } = filtroPorEtiquetas ?? {};
  console.log(JSON.stringify(pointsIds));

  const where = {
    _or:
      pointsIds && pointsIds.length > 0
        ? pointsIds.map((pointId) => {
            return { point_id: { _eq: pointId } };
          })
        : {},
    _and: [
      timestampInicial
        ? { timestamp_registro: { _gte: timestampInicial } }
        : {},
      timestampFinal ? { timestamp_registro: { _lte: timestampFinal } } : {},
    ],
    registro: incluirTodos
      ? { _has_keys_all: etiquetas?.map((etiqueta) => etiqueta.nombreEtiqueta) }
      : {
          _has_keys_any: etiquetas?.map((etiqueta) => etiqueta.nombreEtiqueta),
        },
  };
  console.log(JSON.stringify(where));

  return where;
};
