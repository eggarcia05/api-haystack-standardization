import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";
import serverSocket from "./websocket";

const app = express();
require("dotenv").config();

// importing routes

// errors
app.use(function (err: any, req: Request, res: Response, next: any) {
  res.status(err.status).send({ error: err.body });
});

// settings
app.set("port", process.env.PORT || 8081);
app.set("portSocket", process.env.PORT_SOCKET || 8082);

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
