import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";
import serverSocket from "./websocket";

import swaggerUi from "swagger-ui-express";
import { index } from "./swagger-docs/api-docs";

const app = express();
require("dotenv").config();

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(index));

// errors
app.use(function (err: any, req: Request, res: Response, next: any) {
  res.status(err.status).send({ error: err.body });
});

// settings
app.set("port", process.env.PORT || 8083);
// app.set("portSocket", process.env.PORT_SOCKET || 8083);

// middlewares
app.use(express.urlencoded({ extended: false }));

// routes
app.use(express.json());
app.use("/", routes);

//socket
serverSocket.listen(app.get("portSocket"), () => {
  console.log(`Socket Server on port ${app.get("portSocket")}`);
});

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Api Server on port ${app.get("port")}`);
});
