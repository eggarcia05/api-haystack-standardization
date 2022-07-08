import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/routes";

const app = express();
require("dotenv").config();

// importing routes

// errors
app.use(function (err: any, req: Request, res: Response, next: any) {
  res.status(err.status).send({ error: err.body });
});

// settings
app.set("port", process.env.PORT || 8081);

// middlewares
app.use(express.urlencoded({ extended: false }));

// routes
app.use(express.json());
app.use("/", routes);

// starting the server
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});