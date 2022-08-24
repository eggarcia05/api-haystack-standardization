import { esquemaInsertSensorData } from "../schemas/insertSensorData";
import { esquemaQueryEntidad } from "../schemas/queryEntidad";
import { esquemaQuerySensorData } from "../schemas/querySensorData";

export const index = {
  swagger: "2.0",
  info: {
    description:
      "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
    version: "1.0.6",
    title: "Swagger Petstore",
    termsOfService: "http://swagger.io/terms/",
    contact: { email: "apiteam@swagger.io" },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  host: "localhost:8081",
  basePath: "/v1",
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
        "^.*$": { type: ["string", "number", "boolean"] },
      },
      required: ["id"],
      additionalProperties: false,
    },
    esquemaQueryEntidad,
    esquemaQuerySensorData,
  },
  externalDocs: {
    description: "Github Repository",
    url: "http://swagger.io",
  },
};
