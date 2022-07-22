import { esquemaQuerySensorData } from "../schemas/querySensorData";
import { validarJSON } from "../utils/helper-functions";

const esquemas: any = {
  "/obtener-datos": esquemaQuerySensorData,
};

export const validarBodyRequest = async (
  req: any,
  res: any,
  next: any
): Promise<any> => {
  const bodyObject = req.body;
    const { valido, errorMsg } = validarJSON(bodyObject, esquemas[req.path]);
    
  if (!valido) {
    return res.status(400).send({ errorMsg });
  }
  next();
};
