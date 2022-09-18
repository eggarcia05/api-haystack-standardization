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

> ## Rutas Api

## Index

`GET /v1`

    http://localhost:8081/v1

<details>
  <summary>Response</summary>

```json
{
    "descripción":"API - Esstandarización de Sistemas IoT"
}
```

</details>

</br>

## Obtener Lectura de sensores

`POST /v1/obtener-datos`

    http://localhost:8082/v1/obtener-datos

<details>
  <summary>Request Body</summary>

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

</br>

### Detalle

</br>

<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>pointsIds</td>
        <td>Int[]</td>
        <td>Lista de IDs de puntos (sensores o actuadores) de los cuales se desea obtener los datos. Es Requerido si intervaloTimestamp o filtroPorEtiquetas no existe.</td>
    </tr>
    <tr>
        <td>intervaloTimestamp</td>
        <td> <a href="#intervalotimestamp">IntervaloTimestamp</a></td>
        <td>Permite filtrar las lecturas por rango de tiempo. Es Requerido solo si poinsIds y filtroPorEtiqueta no están definidos</td>
    </tr>
    <tr>
        <td>filtroPorEtiquetas</td>
        <td><a href="#filtroPorEtiquetas">FiltroPorEtiquetas</div></td>
        <td>Permite definir un arreglo con las etiquetas por las que se desea filtrar la búsqueda. Es Requerido si pointsIds y intervaloTimestamp no están definidos</td>
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

---

<br>

#### <div id="intervalotimestamp">**Tipo: IntervaloTimestamp**</div>

<br>
<table>
    <tr>
        <td>Parámetro</td>
        <td>Tipo</td>
        <td>Descripción</td>
    </tr>
    <tr>
        <td>timestampInicial</td>
        <td>String</td>
        <td>Filtro de fecha de inicio con el formato "YYYY-MM-DD". Requerido solo sí timestampFinal no se se define timestampFinal.</td>
    </tr>
    <tr>
        <td>timestampFinal</td>
        <td>String</td>
        <td>Filtro de fecha de final con el formato "YYYY-MM-DD". Requerido solo sí timestampInicial no se se define timestampFinal.</td>
    </tr>
</table>


---


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

---


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
        <td>Este puede ser cualquier etiqueta o parametro por el que desee ordenar los datos. Requerido.</td>
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
        <td>Nombre de la etiqueta sobre la que realizará un filtro. Ej: value, siteRef, equipRef, etc. Requerido</td>
    </tr>
    <tr>
        <td>condicion</td>
        <td>String</td>
        <td>Condición a evaluar solo admite los valores de: &lt;, &lt;=, &gt;, &gt;=, =. Si no se especifíca por defecto toma el valor de =.</td>
    </tr>
    <tr>
        <td>valor</td>
        <td>Numeric | String | Boolean</td>
        <td>Valor que debe cumplir la condición de filtro. Requerido</td>
    </tr>
</table>
</br>

<details>
  <summary>Response</summary>

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

</br>

## Obtener Entidades

### Request

`POST /v1/obtener-entidades`

    http://localhost:8082/v1/obtener-entidades

<details>
  <summary>Response</summary>

```json
{
    "status": 200,
    "response": [
        {
            "id": "dd85475c-a5ef-4a15-b00f-206e408528b2",
            "dis": "Modulo de medición de datos ambientales",
            "siteRef": "lab_sistemas_telematicos",
            "points": [
                {
                    "id": "c437e697-a19d-4d1a-98be-594b8dc5ac64",
                    "__typename": "point"
                },
                {
                    "id": "27803f1a-5bfd-4a3c-8d1e-b1e4faf3aa7f",
                    "__typename": "point"
                },
                {
                    "id": "c83c8acd-f058-4402-b267-2f9aaab30204",
                    "__typename": "point"
                },
                {
                    "id": "rm4mini",
                    "__typename": "point"
                }
            ],
            "__typename": "equip"
        },
        {
            "id": "shellyem-B9E151",
            "dis": "Medidor de consumo eléctrico",
            "siteRef": "lab_sistemas_telematicos",
            "points": [
                {
                    "id": "73928686-16ea-4163-8fce-ce1de21a9243",
                    "__typename": "point"
                },
                {
                    "id": "7f977aec-492e-4a0f-b62b-fd2234864d3f",
                    "__typename": "point"
                },
                {
                    "id": "36d39ebd-519d-40d2-8839-609b7133edf3",
                    "__typename": "point"
                },
                {
                    "id": "c9b088bd-6ed4-4963-a8f8-8b44a0fbe139",
                    "__typename": "point"
                },
                {
                    "id": "1625a3e1-a79c-45da-8a62-9ae1e27d2d51",
                    "__typename": "point"
                }
            ],
            "__typename": "equip"
        }
    ]
}
```

</details>

## Insertar Lectura

### Request

`POST /v1/registrar-datos`

    http://localhost:8081/v1/registrar-datos

<details>
  <summary>Response</summary>

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
