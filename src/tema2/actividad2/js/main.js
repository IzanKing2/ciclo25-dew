// Los ficheros datos.js y utilidades.js deben cargarse antes

let clientesList = new Array(); // Lista de clientes
let preciosFinalesList = new Array(); // Lista de precios

const estados = ["Pendiente", "Enviado", "Entregado"]; // Tipos de estado

// Recorremos cada uno de los clientes
for (const cliente of clientes) {
    let precioFinal = 0;

    // Añadimos el cliente a la lista
    clientesList.push(cliente.nombre);
    console.log("✅ Cliente añadido: " + cliente.nombre);

    // Recorremos cada orden del cliente
    for (const orden of cliente.ordenes) {
        const descuento = calcularDescuento(cliente, orden); // Calculamos el descuento
        orden.descuento = descuento; // Modificamos el descuento en el JSON
        console.log("✅ Descuento calculado: " + descuento*100 + "%");

        // Calculamos el precio final
        precioFinal += calcularPrecioFinal(cliente, orden);
        orden.precioFinal = precioFinal; // Lo modificamos en el JSON

        // Modificamos el estado
        orden.estado = elegirEstado(estados);
    }

    // Añadimos el precio final a la lista de precios
    preciosFinalesList.push(precioFinal);
    console.log("✅ Precio final añadido: " + precioFinal + "€");

    console.log("————————————————————————————————————————")
}

// Crear el gráfico de barras
var ctx = document.getElementById('clientesChart');

var clientesChart = new Chart(ctx, {
    type: 'bar', // Tipo barra vertical
    data: {
        labels: clientesList, // Lista de clientes
        datasets: [{
            label: 'Compras',
            data: preciosFinalesList, // Lista de precios finales
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Asegura que el eje Y comience en 0
            }
        }
    }
});
