import cors from "cors";
import { Request, Response, Router } from "express";
import { obtenerDatosDeSensor } from "../controllers/obtener-datos-sensor";
import { registrarDatosDeSensor } from "../controllers/nuevo-registro-sensor";
const router = Router();

router.use(cors());

router.get("/", async (request: Request, response: Response) => {
  response.status(200).send({
    descripción: "API - Esstandarización de Sistemas IoT",
  });
});

router.post("/registrar-datos", registrarDatosDeSensor);
router.post("/obtener-datos", obtenerDatosDeSensor);

export default router;
