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
    "/registrar-datos": {
      post: {
        tags: ["Registros"],
        summary: "Registrar lecturas de modulo IoT",
        description:
          "Mediante esta ruta se puede añadir un nueva lectura de uno o más sesnores de un modulo IoT",
        operationId: "createUser",
        consumes: ["application/json"],
        produces: ["application/json", "application/xml"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Created user object",
            required: true,
            schema: { $ref: "#/definitions/User" },
          },
        ],
        responses: { default: { description: "successful operation" } },
      },
    },
    "/obtener-entidades": {
      post: {
        tags: ["Consultas"],
        summary: "Registrar lecturas de modulo IoT",
        description:
          "Mediante esta ruta se puede añadir un nueva lectura de uno o más sesnores de un modulo IoT",
        operationId: "createUser",
        consumes: ["application/json"],
        produces: ["application/json", "application/xml"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Created user object",
            required: true,
            schema: { $ref: "#/definitions/User" },
          },
        ],
        responses: { default: { description: "successful operation" } },
      },
    },
    "/obtener-datos": {
      post: {
        tags: ["Consultas"],
        summary: "Registrar lecturas de modulo IoT",
        description:
          "Mediante esta ruta se puede añadir un nueva lectura de uno o más sesnores de un modulo IoT",
        operationId: "createUser",
        consumes: ["application/json"],
        produces: ["application/json", "application/xml"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Created user object",
            required: true,
            schema: { $ref: "#/definitions/User" },
          },
        ],
        responses: { default: { description: "successful operation" } },
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
    ApiResponse: {
      type: "object",
      properties: {
        code: { type: "integer", format: "int32" },
        type: { type: "string" },
        message: { type: "string" },
      },
    },
    Category: {
      type: "object",
      properties: {
        id: { type: "integer", format: "int64" },
        name: { type: "string" },
      },
      xml: { name: "Category" },
    },
    Pet: {
      type: "object",
      required: ["name", "photoUrls"],
      properties: {
        id: { type: "integer", format: "int64" },
        category: { $ref: "#/definitions/Category" },
        name: { type: "string", example: "doggie" },
        photoUrls: {
          type: "array",
          xml: { wrapped: true },
          items: { type: "string", xml: { name: "photoUrl" } },
        },
        tags: {
          type: "array",
          xml: { wrapped: true },
          items: { xml: { name: "tag" }, $ref: "#/definitions/Tag" },
        },
        status: {
          type: "string",
          description: "pet status in the store",
          enum: ["available", "pending", "sold"],
        },
      },
      xml: { name: "Pet" },
    },
    Tag: {
      type: "object",
      properties: {
        id: { type: "integer", format: "int64" },
        name: { type: "string" },
      },
      xml: { name: "Tag" },
    },
    Order: {
      type: "object",
      properties: {
        id: { type: "integer", format: "int64" },
        petId: { type: "integer", format: "int64" },
        quantity: { type: "integer", format: "int32" },
        shipDate: { type: "string", format: "date-time" },
        status: {
          type: "string",
          description: "Order Status",
          enum: ["placed", "approved", "delivered"],
        },
        complete: { type: "boolean" },
      },
      xml: { name: "Order" },
    },
    User: {
      type: "object",
      properties: {
        id: { type: "integer", format: "int64" },
        username: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        phone: { type: "string" },
        userStatus: {
          type: "integer",
          format: "int32",
          description: "User Status",
        },
      },
      xml: { name: "User" },
    },
  },
  externalDocs: {
    description: "Github Repository",
    url: "http://swagger.io",
  },
};
