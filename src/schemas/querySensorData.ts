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
      },
      valor: {
        type: ["number", "string"],
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
    },
    parametro: {
      type: "string",
    },
  },
};

export const esquemaQuerySensorData = {
  type: "object",
  oneOf: [
    {
      properties: {
        pointsIds,
        intervaloTimestamp,
        filtroPorEtiquetas,
        ordenarPor,
      },
      required: ["pointsIds"],
    },
    {
      properties: {
        sitesIds,
        intervaloTimestamp,
        filtroPorEtiquetas,
        ordenarPor,
      },
      required: ["sitesIds"],
    },
    {
      properties: {
        equipsIds,
        intervaloTimestamp,
        filtroPorEtiquetas,
        ordenarPor,
      },
      required: ["equipsIds"],
    },
  ],
  errorMessage:
    "Only one of entities Ids: sitesIds or pointsIds or equipsIds is allowed",
};
