import { expect, test } from "vitest";
import { traducirQuery } from "../src/utils/helper-functions";
import { inputsQuery, outputsQuery } from "./mock/queries-mock";

test("traducir_query_sin_filtros_un_solo_sensor", () => {
  const inputTraducido = traducirQuery(inputsQuery.querySensorUniquePointInput);
  expect(JSON.stringify(inputTraducido)).eq(
    JSON.stringify(outputsQuery.querySensorUniquePointTraducidoOutput)
  );
});

test("traducir_query_sin_filtros_un_solo_sensor_con_limte", () => {
  const inputTraducido = traducirQuery(
    inputsQuery.querySensorUniquePointLimitInput
  );
  expect(JSON.stringify(inputTraducido)).eq(
    JSON.stringify(outputsQuery.querySensorUniquePointLimitTraducidoOutput)
  );
});

test("traducir_query_con_filtros_sin_sensor", () => {
  const inputTraducido = traducirQuery(
    inputsQuery.querySensorSinPointConFiltroInput
  );
  expect(JSON.stringify(inputTraducido)).eq(
    JSON.stringify(outputsQuery.querySensorSinPointConFiltroTraducidoOutnput)
  );
});

test("traducir_query_dentro_de_intervalo_con_sensor", () => {
  const inputTraducido = traducirQuery(
    inputsQuery.querySensorIntervaloConSensorInput
  );
  expect(JSON.stringify(inputTraducido)).eq(
    JSON.stringify(outputsQuery.querySensorIntervaloConSensorTraducidoOutput)
  );
});

test("traducir_query_incluyendo_todos_los_filtros", () => {
  const inputTraducido = traducirQuery(
    inputsQuery.querySensorIncluirTodoElFiltroInput
  );
  expect(JSON.stringify(inputTraducido)).eq(
    JSON.stringify(outputsQuery.querySensorIncluirTodoElFiltroTraducidoOutnput)
  );
});

