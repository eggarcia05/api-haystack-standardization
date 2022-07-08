# `Api-Odoo (Accountant)`

## Descripción

Api Oddo es un wrapper para hacer llamadas personalizadas al engine de Oddo.

## Workflow
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

- [Pago Factura Cliente](https://github.com/Grupo-Viteri/apiOdoo/blob/master/src/mock-data/datosPagoDeFactura.json)

> ## Rutas Api-Odoo

## Index

### Request

`GET /`

    http://localhost:8081/

### Response

    {
        "Project": "Cliente Api Odoo - Asimed",
        "Versions": "v 1.0.0"
    }

## Crear Factura

### Request

`POST /facturacion/crearFacturaCliente`

    http://localhost:8081/facturacion/crearFacturaCliente

### Response

    {
        "id": 146,
        "status": 200,
        "estado": "posted",
        "numeroFactura": "INV/2021/11/0021",
        "pagos": {
            "tiposPago": [
                {
                    "lineaPago": 2,
                    "idPago": 64
                }
            ]
        },
        "idCajaRegistradora": [
            27
        ]
    }

## Crear Pago De Factura

### Request

`POST /facturacion/crearPagoDeFactura`

    http://localhost:8081/facturacion/crearPagoDeFactura

### Response

    {
        "id": "141",
        "status": "posted",
        "numeroFactura": "INV/2021/11/0020",
        "pagos": {
            "tiposPago": [
                {
                    "lineaPago": 3,
                    "idPago": 71
                }
            ]
        },
        "idCajaRegistradora": [
            29
        ]
    }

## Datos Odoo

### Request

`GET /datosOdoo`

    http://localhost:8081/datosOdoo

### Response

    {
        "cuentasAnaliticas": [
            {
                "id": 12,
                "name": "Centro",
                "model": "account.analytic.account"
            },
            ...
        ],
        "diarios": [
            {
                "id": 1,
                "name": "Facturas de cliente",
                "model": "account.journal"
            },
            ...
        ],
        "plazoDePagos": [
            {
                "id": 1,
                "name": "Immediate Payment",
                "model": "account.payment.term"
            },
            ...
        ],
        "planDeCuentas": [
            {
                "id": 40,
                "name": "Bank and Cash - Banco",
                "model": "account.account"
            },
            ...
        ],
        "unidadDeMedida": [
            {
                "id": 5,
                "name": "Days",
                "model": "uom.uom"
            },
            ...
        ],
        "compania": [
            {
                "id": 1,
                "name": "My Company",
                "model": "res.company"
            },
            ...
        ]
    }

## Herramientas de Desarrollo

### Prettier

Usamos Prettier para tener un estilo de código consistente y sin errores de formato. Ejemplo: lineas vacias innecesarias.

ejecutar `npm run format`

### ESlint

Usamos ESlint para detectar posibles errores en código. Ejemplo: variable sin declarar

ejecutar `npm run lint`

### Apollo Client

## Contribución

## Tests

En desarrollo
