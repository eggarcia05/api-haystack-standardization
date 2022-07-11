import express, { Request, Response, NextFunction } from "express";
import * as http from "http";
import * as socketio from "socket.io";

const app = express();

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var messages = [
  {
    author: "Carlos",
    text: "Hola! que tal?",
  },
  {
    author: "Pepe",
    text: "Muy bien! y tu??",
  },
  {
    author: "Paco",
    text: "Genial!",
  },
];

app.get("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  for (let message of messages) {
    socket.emit("messages", message);
    await timeout(6000);
  }
});



export default server;