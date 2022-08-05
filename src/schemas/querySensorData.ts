const pointsIds = {
  type: "array",
  minItems: 0,
  items: {
    type: "string",
  },
};

const equipsIds = {
  type: "array",
  minItems: 0,
  items: {
    type: "string",
  },
};

const sitesIds = {
  type: "array",
  minItems: 0,
  items: {
    type: "string",
  },
};

const intervaloTimestamp = {
  type: "object",
  properties: {
    timestampInicial: {
      type: "string",
    },
    timestampFinal: {
      type: "string",
    },
  },
  anyOf: [{ required: ["timestampInicial"] }, { required: ["timestampFinal"] }],
};

const etiquetas = {
  type: "array",
  minItems: 0,
  items: {
    type: "object",
    properties: {
      nombreEtiqueta: {
        type: "string",
      },
      condicion: {
        type: "string",
        enum: [">", ">=", "<", "<=", "="],
      },
      valor: {
        type: ["number", "string", "boolean"],
      },
    },
    required: ["nombreEtiqueta"],
  },
};

const filtroPorEtiquetas = {
  type: "object",
  properties: {
    etiquetas,
    incluirTodos: {
      type: "boolean",
    },
  },
  required: ["etiquetas"],
};

const ordenarPor = {
  type: "object",
  properties: {
    orden: {
      type: "string",
      enum: ["asc" , "desc"],
    },
    parametro: {
      type: "string",
    },
  },
};

export const esquemaQuerySensorData = {
  type: "object",
  properties: {
    pointsIds,
    intervaloTimestamp,
    filtroPorEtiquetas,
    ordenarPor,
  },
  additionalProperties: false,
  anyOf: [{ required: ["pointsIds"] }, { required: ["filtroPorEtiquetas"] }],
};
