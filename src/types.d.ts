interface NewSensorPayload {
  id: string;
  [x: string]: unknown;
}

interface QuerySensorData {
  pointsIds: string[];
  equipsIds: string[];
  sitesIds: string[];
  intervaloTimestamp?: PeriodoTiempo;
  filtroPorEtiquetas?: FiltroEtiquetas;
  ordenarPor?: OrderCondition;
}

interface PeriodoTiempo {
  timestampInicial: string;
  timestampFinal: string;
}

interface CamposEtiqueta {
  nombreEtiqueta: string;
  condicicioDeFiltro?: string;
  valorAComparar?: string | number | boolean;
}
interface FiltroEtiquetas {
  etiquetas: CamposEtiqueta[];
  cumpleTodos: boolean;
}

interface OrderCondition {
  orden: string;
  parametroParaOrdenar: string;
}
