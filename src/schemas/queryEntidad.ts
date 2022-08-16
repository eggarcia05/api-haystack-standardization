export const esquemaQueryEntidad = {
  type: "object",
  properties: {
    tipo: {
      type: "string",
      enum: ["point", "equip", "site"],
    },
    entidadRefId: {
      type: "string",
    },
  },
  required: ["tipo"],
};
