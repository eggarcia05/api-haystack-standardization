import { esquemaInsertSensorData } from "../schemas/insertSensorData";
import { esquemaQueryEntidad } from "../schemas/queryEntidad";
import { esquemaQuerySensorData } from "../schemas/querySensorData";

export const index = {
  swagger: "2.0",
  info: {
    description:
      "Documentaciónd de Api de Estandarización. Tu puedes obtener más información en la el repositorio de [Github](https://github.com/eggarcia05/api-haystack-standardization)",
    version: "1.0.0",
    title: "Documentación Swagger API Estandarización ",
    termsOfService: "http://swagger.io/terms/",
    contact: { email: "eggarcia@espol.edu.ec" },
  },
  host: "localhost:8082",
  basePath: "/",
  tags: [
    {
      name: "Registros",
      description: "Operaciones para registrar en la base de datos",
    },
    {
      name: "Consultas",
      description: "Operaciones para obtener datos de la base de datos",
    },
  ],
  schemes: ["http"],
  paths: {
    "/v1/registrar-datos": {
      post: {
        tags: ["Registros"],
        summary: "Registrar lecturas de modulo IoT",
        description:
          "Mediante esta ruta se puede añadir un nueva lectura de uno o más sesnores de un modulo IoT",
        operationId: "createUser",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Created user object",
            required: true,
            schema: { $ref: "#/definitions/esquemaInsertSensorData" },
          },
        ],
        responses: {
          200: {
            description: "Registro Exitoso de Lectura",
            schema: { $ref: "#/definitions/insertarDatoApiSuccess" },
          },
          400: {
            description: "Solicitud equivocada",
            schema: {
              $ref: "#/definitions/insertarDatoApiError",
            },
          },
        },
      },
    },
    "/v1/obtener-entidades": {
      post: {
        tags: ["Consultas"],
        summary: "Obtener información de las Entidades Registradas",
        description:
          "Mediante esta ruta pueden obtenerse los sitios, equiposo o puntos registrados, si se desea filtrar por entidad padre, puede agregar un identificador de referencia ",
        operationId: "createUser",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Objeto de solicitud",
            required: true,
            schema: { $ref: "#/definitions/esquemaQueryEntidad" },
          },
        ],
        responses: {
          200: {
            description: "Consulta exitosa",
            schema: {
              $ref: "#/definitions/queryEntidadSuccess",
            },
          },
        },
      },
    },
    "/v1/obtener-datos": {
      post: {
        tags: ["Consultas"],
        externalDocs: {
          description: "Schema additional information",
          url: "http://swagger.io",
        },
        summary:
          "Obtener datos de serie de tiempo de los módulos/sensores registrados",
        description:
          "Mediante esta ruta se puedn obtenerse las lecturas de los puntos, puede filtrarse por entidad padre, etiqueta, rango de fechas ",
        operationId: "obtenerDatos",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Objeto de solicitud",
            required: true,
            schema: { $ref: "#/definitions/esquemaQuerySensorData" },
          },
        ],
        responses: {
          200: {
            description: "Consulta exitosa",
            schema: {
              $ref: "#/definitions/querySensorDataApiSucces",
            },
          },
        },
      },
    },
  },
  // securityDefinitions: {
  //   api_key: { type: "apiKey", name: "api_key", in: "header" },
  //   petstore_auth: {
  //     type: "oauth2",
  //     authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
  //     flow: "implicit",
  //     scopes: {
  //       "read:pets": "read your pets",
  //       "write:pets": "modify pets in your account",
  //     },
  //   },
  // },
  definitions: {
    insertarDatoApiError: {
      type: "object",
      properties: {
        errorMsg: {
          type: "array",
          items: {
            type: "object",
            properties: {
              instancePath: {
                type: "string",
              },
              schemaPath: {
                type: "string",
              },
              keyword: {
                type: "string",
              },
              params: {
                type: "object",
                properties: {
                  type: {
                    type: "array",
                    items: [
                      {
                        type: "string",
                      },
                      {
                        type: "string",
                      },
                      {
                        type: "string",
                      },
                    ],
                  },
                },
                required: ["type"],
              },
              message: {
                type: "string",
              },
            },
            required: [
              "instancePath",
              "schemaPath",
              "keyword",
              "params",
              "message",
            ],
          },
        },
      },
      required: ["errorMsg"],
    },
    insertarDatoApiSuccess: {
      type: "object",
      properties: {
        msg: {
          type: "object",
          properties: {
            "any-property": {
              type: "boolean",
            },
          },
          required: ["any-property"],
        },
      },
      required: ["msg"],
    },
    esquemaInsertSensorData: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        "[parameter_value: string]": {
          type: "string | number",
        },
      },
      patternProperties: {
        "^.*$": {
          anyOf: [{ type: "string" }, { type: "number" }, { type: "boolean" }],
        },
      },
      required: ["id"],
      additionalProperties: false,
    },
    esquemaQueryEntidad,
    queryEntidadSuccess: {
      type: "object",
      properties: {
        response: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              siteRef: {
                type: "string",
              },
              equipRef: {
                type: "string",
              },
              tags: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  air: {
                    type: "boolean",
                  },
                  dis: {
                    type: "string",
                  },
                  kind: {
                    type: "string",
                  },
                  unit: {
                    type: "string",
                  },
                  siteRef: {
                    type: "string",
                  },
                  equipRef: {
                    type: "string",
                  },
                  humidity: {
                    type: "boolean",
                  },
                },
              },
              __typename: {
                type: "string",
                enum: ["point"],
              },
            },
            required: ["id", "siteRef", "equipRef", "tags", "__typename"],
          },
        },
      },
      required: ["status", "response"],
    },
    esquemaQuerySensorData,
    querySensorDataApiSucces: {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
      properties: {
        response: {
          type: "array",
          items: {
            type: "object",
            properties: {
              point_id: {
                type: "string",
              },
              timestamp_registro: {
                type: "string",
              },
              registro: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  dis: {
                    type: "string",
                  },
                  elec: {
                    type: "boolean",
                  },
                  kind: {
                    type: "string",
                  },
                  unit: {
                    type: "string",
                  },
                  volt: {
                    type: "boolean",
                  },
                  value: {
                    anyOf: [{ type: "string" }, { type: "integer" }],
                  },
                  siteRef: {
                    type: "string",
                  },
                  equipRef: {
                    type: "string",
                  },
                },
              },
            },
            required: ["point_id", "timestamp_registro", "registro"],
          },
        },
      },
      required: ["response"],
    },
  },
  externalDocs: {
    description: "Github Repository",
    url: "https://github.com/eggarcia05/api-haystack-standardization",
  },
};
