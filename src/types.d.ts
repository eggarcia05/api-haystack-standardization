interface NewSensorPayload {
  id: string;
  [x: string]: unknown;
}

interface QuerySensorData {
    pointId: string
    filters: Filter[]
    ordenarPor: OrderCondition
}

interface Filter {
    parametroAFiltrar: string
    condicicioDeFiltro: string
    valorAComparar: string|number|boolean
}

interface OrderCondition {
    orden: string
    parametroParaOrdenar: string
}
