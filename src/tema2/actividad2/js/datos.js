// JSON en formato cadena (string) y conversión a objeto
const clientesJSON = `
[
    {
        "id": 1,
        "nombre": "José Manuel Acosta",
        "fechaNacimiento": "1985-03-15",
        "direcciones": [
            {
                "pais": "España",
                "ciudad": "Teror",
                "direccionElegida": true
            },
            {
                "pais": "España",
                "ciudad": "Barcelona",
                "direccionElegida": false
            }
        ],
        "ordenes": [
            {
                "producto": "Laptop",
                "fechaOrden": "2025-01-10",
                "precio": 1000,
                "descuento": 0.15,
                "precioFinal": 850,
                "estado": "Entregado"
            },
            {
                "producto": "Mause",
                "fechaOrden": "2025-01-20",
                "precio": 50,
                "descuento": 0.10,
                "precioFinal": 45,
                "estado": "Pendiente"
            }
        ]
    },
    {
        "id": 2,
        "nombre": "Diego Lázaro Cádiz Torres",
        "fechaNacimiento": "2004-12-25",
        "direcciones": [
            {
                "pais": "España",
                "ciudad": "Agüimes",
                "direccionElegida": true
            },
            {
                "pais": "España",
                "ciudad": "Barcelona",
                "direccionElegida": false
            }
        ],
        "ordenes": [
            {
                "producto": "Laptop",
                "fechaOrden": "2025-12-25",
                "precio": 1100,
                "descuento": 0.15,
                "precioFinal": 850,
                "estado": "Entregado"
            },
            {
                "producto": "SSD",
                "fechaOrden": "2025-01-20",
                "precio": 80,
                "descuento": 0.10,
                "precioFinal": 45,
                "estado": "Pendiente"
            }
        ]
    },
    {
        "id": 3,
        "nombre": "Naia Celis Afonso",
        "fechaNacimiento": "2007-04-12",
        "direcciones": [
            {
                "pais": "España",
                "ciudad": "Agüimes",
                "direccionElegida": true
            },
            {
                "pais": "España",
                "ciudad": "Barcelona",
                "direccionElegida": false
            }
        ],
        "ordenes": [
            {
                "producto": "Tablet",
                "fechaOrden": "2025-04-12",
                "precio": 900,
                "descuento": 0.15,
                "precioFinal": 850,
                "estado": "Entregado"
            }
        ]
    }
]
`;

// Convertimos el JSON a un objeto de JavaScript
const clientes = JSON.parse(clientesJSON);