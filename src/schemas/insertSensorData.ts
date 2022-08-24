export const esquemaInsertSensorData = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
  patternProperties: {
    "^.*$": { type: ["string", "number", "boolean"] },
  },
  required: ["id"],
  additionalProperties: true 
};


