import cors from "cors";
import { Request, Response, Router } from "express";
import { obtenerDatosDeSensor } from "../controllers/obtener-datos-sensor";
import { workflowRegistrarDatosDeSensor } from "../routes-handlers/nuevo-registro-handle";
const router = Router();

router.use(cors());

router.get("/", async (request: Request, response: Response) => {
  response.send({
    Project: "Standardize IoT Data API - ESPOL",
    Versions: "v 1.0.0",
  });
});

router.post("/registrar-datos", workflowRegistrarDatosDeSensor);
router.post("/obtener-datos", obtenerDatosDeSensor);

export default router;
