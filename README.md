# `API DE ESTANDARIZACIÖN`

## Descripción

Api de Estandarización para facilitar el consumo de datos de equipos IoT.

<!-- ## Workflow
<p align="center">
  <img src="static/workflow-api-odoo.drawio.svg" alt="odoo accounting workflow"/>
</p>

## Directorio

    src
    |__ config /            /* Archivos de configuración */
    |__ controllers /       /* Funciones para manipular las peticiones HTTP*/
    |__ mock-data /         /* Json de ejemplo de las estructura de datos */
    |__ routes /            /* Rutas del Api */
    |__ schemas /           /* Schemas de validaciones de las estructura de datos */
    |__ utils /             /* Funciones que se reutilizan */
    |____ bin /
    |__ index.ts            /* Archvio index del api*/

## Instalación

1. Descargar el repositorio
2. ejecutar `npm install`
3. ejecutar `npm start`

> ## JSON-Schema

- [Factura Cliente](https://github.com/Grupo-Viteri/apiOdoo/blob/master/src/mock-data/datosFacturaEjemploPostman.json)

- [Pago Factura Cliente](https://github.com/Grupo-Viteri/apiOdoo/blob/master/src/mock-data/datosPagoDeFactura.json) -->

## Rutas Api

## Index

`GET /v1`

    http://localhost:8081/v1

<details>
  <summary>Response Ejemplo</summary>

```json
{
    "descripción":"API - Esstandarización de Sistemas IoT"
}
```

</details>


## Obtener Lectura de sensores

`POST /v1/obtener-datos`

    http://localhost:8082/v1/obtener-datos

<details>
  <summary>Request Ejemplo</summary>

```json
{
  "pointsIds": [
    "string"
  ],
  "intervaloTimestamp": {
    "timestampInicial": "string",
    "timestampFinal": "string"
  },
  "filtroPorEtiquetas": {
    "etiquetas": [
      {
        "nombreEtiqueta": "string",
        "condicion": ">",
        "valor": "string"
      }
    ],
    "incluirTodos": true
  },
  "ordenarPor": {
    "orden": "asc",
    "parametro": "string"
  },
  "limite": 0
}
```

</details>


### Estructura de Body

</br>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>pointsIds</td>
        <td>string[]</td>
        <td>Lista de IDs de puntos (sensores o actuadores) de los cuales se desea obtener los datos. Es <strong>Requerido</strong> si intervaloTimestamp o filtroPorEtiquetas no existe.</td>
    </tr>
    <tr>
        <td>intervaloTimestamp</td>
        <td> <a href="#intervalotimestamp">IntervaloTimestamp</a></td>
        <td>Permite filtrar las lecturas por rango de tiempo. Es <strong>Requerido</strong> solo si poinsIds y filtroPorEtiqueta no están definidos</td>
    </tr>
    <tr>
        <td>filtroPorEtiquetas</td>
        <td><a href="#filtroPorEtiquetas">FiltroPorEtiquetas</div></td>
        <td>Permite definir un arreglo con las etiquetas por las que se desea filtrar la búsqueda. Es <strong>Requerido</strong> si pointsIds y intervaloTimestamp no están definidos</td>
    </tr>
    <tr>
        <td>ordenarPor</td>
        <td><a href="#ordenarPor">OrdenarPor</a></td>
        <td>Permite ordenar el resultado en función a una etiqueta o parámetro en específico</td>
    </tr>
    <tr>
        <td>limite</td>
        <td>Int</td>
        <td>Permite truncar el número de lecturas obtenidas</td>
    </tr>
</table>


#### <div id="intervalotimestamp">**Tipo: IntervaloTimestamp**</div>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>timestampInicial</td>
        <td>String</td>
        <td>Filtro de fecha de inicio con el formato "YYYY-MM-DD". <strong>Requerido</strong> solo sí timestampFinal no se se define timestampFinal.</td>
    </tr>
    <tr>
        <td>timestampFinal</td>
        <td>String</td>
        <td>Filtro de fecha de final con el formato "YYYY-MM-DD". <strong>Requerido</strong> solo sí timestampInicial no se se define timestampFinal.</td>
    </tr>
</table>



#### <div id="filtroPorEtiquetas">**Tipo: FiltroPorEtiquetas**</div>


<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>etiquetas</td>
        <td><a href="#etiquetas">Etiquetas[]</a></td>
        <td>Arreglo de etiquetas a filtrar</td>
    </tr>
     <tr>
        <td>incluirTodos</td>
        <td>Boolean</td>
        <td>Si es true el filtro es verdadero cuando todos las condiciones del arreglo etiquetas se cumple, caso contrario, bastará con que una de las condiciones se cumpla. Si no se especifica toma el valor de false.</td>
    </tr>
</table>


#### <div id="ordenarPor">**Tipo: OrdenarPor**</div>
<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>orden</td>
        <td>String</td>
        <td>Puede ser tomar el valor de asc para orden ascendente o desc para orden descendente. Si no se especifica toma el valor asc por defecto</td>
    </tr>
    <tr>
        <td>parametro</td>
        <td>String</td>
        <td>Este puede ser cualquier etiqueta o parametro por el que desee ordenar los datos. <strong>Requerido</strong>.</td>
    </tr>
</table>

#### <div id="etiquetas">**Tipo: Etiquetas**</div>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>nombreEtiqueta</td>
        <td>String</td>
        <td>Nombre de la etiqueta sobre la que realizará un filtro. Ej: value, siteRef, equipRef, etc. <strong>Requerido</strong></td>
    </tr>
    <tr>
        <td>condicion</td>
        <td>String</td>
        <td>Condición a evaluar solo admite los valores de: &lt;, &lt;=, &gt;, &gt;=, =. Si no se especifíca por defecto toma el valor de =.</td>
    </tr>
    <tr>
        <td>valor</td>
        <td>Numeric | String | Boolean</td>
        <td>Valor que debe cumplir la condición de filtro. <strong>Requerido</strong></td>
    </tr>
</table>
</br>

<details>
  <summary>Response Ejemplo</summary>

```json
{
    "response": [
        {
            "point_id": "27803f1a-5bfd-4a3c-8d1e-b1e4faf3aa7f",
            "timestamp_registro": "2022-07-08T10:52:18.685",
            "registro": {
                "id": "27803f1a-5bfd-4a3c-8d1e-b1e4faf3aa7f",
                "air": true,
                "dis": "Temperatura",
                "kind": "number",
                "unit": "°C",
                "value": 26.55,
                "siteRef": "lab_sistemas_telematicos",
                "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
                "temperature": true
            },
            "point": {
                "dis": "Temperatura",
                "equip": {
                    "id": "dd85475c-a5ef-4a15-b00f-206e408528b2",
                    "dis": "Modulo de medición de datos ambientales",
                    "site": {
                        "id": "lab_sistemas_telematicos",
                        "dis": "Laboratorio de Sistemas Telemáticos",
                        "__typename": "site"
                    },
                    "__typename": "equip"
                },
                "__typename": "point"
            },
            "__typename": "registros_sensores"
        }
    ]
}
```

</details>


## Obtener Entidades


`POST /v1/obtener-entidades`

    http://localhost:8082/v1/obtener-entidades

<details>
  <summary>Request Ejemplo</summary>

```json
{
  "tipo": "point",
  "entidadRefId": "dd85475c-a5ef-4a15-b00f-206e408528b2"
}
```

</details>

### Estructura de Body

</br>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>tipo</td>
        <td>String</td>
        <td>Define el tipo de entidad que desea obtener en la consulta. Puede tomar los valores de equip, point, site. <strong>Requerido</strong></td>
    </tr>
    <tr>
        <td>entidadRefId</td>
        <td> String</a></td>
        <td>Si necesita obtener solo las entidades hijas que están contenidas en una entidad padre en específica, en este parámetro podrá especificar el id de la entidad padre</td>
    </tr>
</table>


<details>
  <summary>Response Ejemplo</summary>

```json
{
    "status": 200,
    "response": [
        {
            "id": "c437e697-a19d-4d1a-98be-594b8dc5ac64",
            "siteRef": "lab_sistemas_telematicos",
            "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
            "tags": {
                "id": "c437e697-a19d-4d1a-98be-594b8dc5ac64",
                "air": true,
                "dis": "Humedad",
                "kind": "number",
                "unit": "%RH",
                "siteRef": "lab_sistemas_telematicos",
                "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
                "humidity": true
            },
            "__typename": "point"
        },
        {
            "id": "27803f1a-5bfd-4a3c-8d1e-b1e4faf3aa7f",
            "siteRef": "lab_sistemas_telematicos",
            "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
            "tags": {
                "id": "27803f1a-5bfd-4a3c-8d1e-b1e4faf3aa7f",
                "air": true,
                "dis": "Temperatura",
                "kind": "number",
                "unit": "°C",
                "siteRef": "lab_sistemas_telematicos",
                "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
                "temperature": true
            },
            "__typename": "point"
        },
        {
            "id": "c83c8acd-f058-4402-b267-2f9aaab30204",
            "siteRef": "lab_sistemas_telematicos",
            "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
            "tags": {
                "id": "c83c8acd-f058-4402-b267-2f9aaab30204",
                "air": true,
                "dis": "Concentración de CO2",
                "kind": "number",
                "unit": "ppm",
                "siteRef": "lab_sistemas_telematicos",
                "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
                "airQuality": true,
                "clave_esperada": "a"
            },
            "__typename": "point"
        },
        {
            "id": "rm4mini",
            "siteRef": "lab_sistemas_telematicos",
            "equipRef": "dd85475c-a5ef-4a15-b00f-206e408528b2",
            "tags": {
                "id": "rm4mini",
                "dis": "Actuador de Acondicionador de aire",
                "run": true,
                "kind": "string",
                "temp": true,
                "unit": "",
                "siteRef": "lab_sistemas_telematicos",
                "actuator": true
            },
            "__typename": "point"
        }
    ]
}
```

</details>


## Insertar Lectura


`POST /v1/registrar-datos`

    http://localhost:8081/v1/registrar-datos

<details>
  <summary>Request Ejemplo</summary>

```json
{
    "id": "shellyem-B9E151",
    "total": "66363.5",
    "power": "146.45",
    "voltage": "210"
}
```

</details>

### Estructura de Body

</br>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>id</td>
        <td>String</td>
        <td>identificador del punto que registrará la lectura. <strong>Requerido</strong></td>
    </tr>
    <tr>
        <td>[parametro_lectura]</td>
        <td> String</a></td>
        <td>La llave de este parametro dependerá del sensor que envíe la lectura, y puede ser más de uno. Cada uno de los parámetros enviados por cada sensor deberán ser específicados en el <a href="https://github.com/eggarcia05/iot-module-registration-interface">SRMIoT</a> <strong>Requerido</strong></td>
    </tr>
</table>


<details>
  <summary>Response Ejemplo</summary>

```json
{
    "msg": {
        "total": true,
        "power": true,
        "voltage": true
    }
}
```

</details>

</br>

## Tests 🧾

Para la ejecución de pruebas ejecute por medio de la línea de comandos:  

```bash
npm run test
```
