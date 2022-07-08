import { Request, Response, NextFunction } from "express";
import { getEtiquetasDeEntidades } from "../controllers/etiquetas-point";
import { registrarValorSensadoPorPunto } from "../controllers/registrar-datos";

export const workflowRegistrarDatosDeSensor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bodyReq: SensorPayload = req.body;
  const keysBodyReq = Object.keys(bodyReq);

  for (let key of keysBodyReq) {
    const etiquetas = await getEtiquetasDeEntidades(bodyReq, key);
    const { status, body: pointData, msg } = etiquetas;

    if (status === 200) {
      const response = await registrarValorSensadoPorPunto(pointData, bodyReq);

      if (response.status !== 200) res.status(status).send({ msg });
    }
  }

  res.status(200).send({ msg: "Registro exitoso" });
};
