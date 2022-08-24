import cors from "cors";
import { Request, Response, Router } from "express";
import { obtenerDatosDeSensor } from "../controllers/obtener-datos-sensor";
import { registrarDatosDeSensor } from "../controllers/nuevo-registro-sensor";
import { validarBodyRequest } from "../middlewares/validador-esquema";
import { obtenerEntidades } from "../controllers/obtener-lista-entidades";

const router = Router();
router.use(cors());

router.get("v1/", async (request: Request, response: Response) => {
  response.status(200).send({
    descripción: "API - Esstandarización de Sistemas IoT",
  });
});

router.post("v1/registrar-datos", validarBodyRequest, registrarDatosDeSensor);
router.post("v1/obtener-datos", validarBodyRequest, obtenerDatosDeSensor);

router.post("v1/obtener-entidades", validarBodyRequest, obtenerEntidades);

export default router;
