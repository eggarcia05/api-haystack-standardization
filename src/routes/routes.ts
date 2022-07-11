import cors from "cors";
import { Request, Response, Router } from "express";
import { obtenerDatosDeSensor } from "../controllers/obtener-datos-sensor";
import { workflowRegistrarDatosDeSensor } from "../routes-handlers/nuevo-registro-handle";
const router = Router();

router.use(cors());
// app.get("/", (_req, res) => {
//   res.send({ uptime: process.uptime() });
// });
router.get("/", async (request: Request, response: Response) => {
   response.send({ uptime: process.uptime() });

});

router.post("/registrar-datos", workflowRegistrarDatosDeSensor);
router.post("/obtener-datos", obtenerDatosDeSensor);

export default router;
