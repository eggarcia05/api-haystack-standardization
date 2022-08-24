import express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import { getRealtimeSensorData } from "./controllers/suscripcion";

const app = express();

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const serverSocket = http.createServer(app);
const io = new socketio.Server(serverSocket, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  const periodTime: number = <any>socket.handshake.query?.periodTime ?? 15000;
  const limit: number = Number(<any>socket.handshake.query?.limit ?? 5);
  const pointId: string = <any>socket.handshake.query?.pointId ?? undefined;

  if (!!!pointId) {
    socket.emit("error_msg", "pointId es un parámetro query requerido");
  }

  while (!!pointId) {
    const data = await getRealtimeSensorData(pointId, limit);
    socket.emit("realtime_data", data);
    await timeout(Number(periodTime));
  }
});

export default serverSocket;
