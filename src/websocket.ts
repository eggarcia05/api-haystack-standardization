import express, { Request, Response, NextFunction } from "express";
import * as http from "http";
import * as socketio from "socket.io";
import { getRealtimeSensorData } from "./controllers/suscripcion";
import { fetchQuery } from "./servicios/query-apollo";

const app = express();

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const server = http.createServer(app);
const io = new socketio.Server(server);

io.on("connection", async (socket) => {
  //   socket.on("", async () => {
  //     const data = await getRealtimeSensorData();
  //     socket.emit("suscriptionResult", data);
  //     await timeout(6000);
  //   });
  console.log("Un cliente se ha conectado: ");
  const periodTime: number = <any>socket.handshake.query?.periodTime ?? 5000;
  const limit: number = Number(<any>socket.handshake.query?.limit ?? 5);
  const pointId: string = <any>socket.handshake.query?.pointId ?? undefined;
  console.log(<any>socket.handshake.query);

  while (true) {
    const query = "GET_REGISTRO_SENSORES";
    const variables = {
      where: pointId
        ? {
            point_id: { _eq: pointId },
          }
        : {},
      limit,
    };

    const { body } = await fetchQuery(query, variables);
    const data = body?.registros_sensores ?? [];
    socket.emit("suscriptionResult", data);
    await timeout(Number(periodTime));
  }
});

export default server;
