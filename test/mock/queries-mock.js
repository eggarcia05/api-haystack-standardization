const querySensorUniquePointInput = {
  pointsIds: ["c437e697-a19d-4d1a-98be-594b8dc5ac64"],
  filtroPorEtiquetas: {
    etiquetas: [],
  },
};

const querySensorUniquePointTraducidoOutput = {
  where: {
    _and: [
      { _or: [{ point_id: { _eq: "c437e697-a19d-4d1a-98be-594b8dc5ac64" } }] },
      { _and: [{}, {}] },
    ],
  },
};

const querySensorUniquePointLimitInput = {
  pointsIds: ["c437e697-a19d-4d1a-98be-594b8dc5ac64"],
  filtroPorEtiquetas: {
    etiquetas: [],
  },
  limite: 10,
};

const querySensorUniquePointLimitTraducidoOutput = {
  where: {
    _and: [
      { _or: [{ point_id: { _eq: "c437e697-a19d-4d1a-98be-594b8dc5ac64" } }] },
      { _and: [{}, {}] },
    ],
  },
  limit: 10,
};

const querySensorSinPointConFiltroInput = {
  pointsIds: [],
  filtroPorEtiquetas: {
    etiquetas: [
      {
        nombreEtiqueta: "equipRef",
        valor: "dd85475c-a5ef-4a15-b00f-206e408528b2",
      },
      {
        nombreEtiqueta: "humidity",
        condicion: "=",
        valor: true,
      },
    ],
  },
  limite: 10,
};

const querySensorSinPointConFiltroTraducidoOutnput = {
  where: {
    _and: [
      { _or: {} },
      { _and: [{}, {}] },
      {
        _or: [
          {
            registro: {
              _contains: { equipRef: "dd85475c-a5ef-4a15-b00f-206e408528b2" },
            },
          },
          { registro: { _contains: { humidity: true } } },
        ],
      },
    ],
  },
  limit: 10,
};

const querySensorIncluirTodoElFiltroInput = {
  pointsIds: [],
  filtroPorEtiquetas: {
    etiquetas: [
      {
        nombreEtiqueta: "equipRef",
        valor: "dd85475c-a5ef-4a15-b00f-206e408528b2",
      },
      {
        nombreEtiqueta: "humidity",
      },
    ],
    incluirTodos: true,
  },
  limite: 10,
};

const querySensorIncluirTodoElFiltroTraducidoOutnput = {
  where: {
    _and: [
      { _or: {} },
      { _and: [{}, {}] },
      {
        _and: [
          {
            registro: {
              _contains: { equipRef: "dd85475c-a5ef-4a15-b00f-206e408528b2" },
            },
          },
          { registro: { _contains: { humidity: true } } },
        ],
      },
    ],
  },
  limit: 10,
};

const querySensorIntervaloConSensorInput = {
  pointsIds: ["c437e697-a19d-4d1a-98be-594b8dc5ac64"],
  intervaloTimestamp: {
    timestampInicial: "2022-08-07",
    timestampFinal: "2022-08-09",
  },
  filtroPorEtiquetas: {
    etiquetas: [],
  },
};

const querySensorIntervaloConSensorTraducidoOutput = {
  where: {
    _and: [
      { _or: [{ point_id: { _eq: "c437e697-a19d-4d1a-98be-594b8dc5ac64" } }] },
      {
        _and: [
          { timestamp_registro: { _gte: "2022-08-07" } },
          { timestamp_registro: { _lte: "2022-08-09" } },
        ],
      },
    ],
  },
};

export const inputsQuery = {
  querySensorUniquePointInput,
  querySensorUniquePointLimitInput,
  querySensorSinPointConFiltroInput,
  querySensorIntervaloConSensorInput,
  querySensorIncluirTodoElFiltroInput,
};

export const outputsQuery = {
  querySensorUniquePointTraducidoOutput,
  querySensorUniquePointLimitTraducidoOutput,
  querySensorSinPointConFiltroTraducidoOutnput,
  querySensorIntervaloConSensorTraducidoOutput,
  querySensorIncluirTodoElFiltroTraducidoOutnput,
};
