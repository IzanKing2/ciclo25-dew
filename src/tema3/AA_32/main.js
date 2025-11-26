// Datos de países y ciudades
const ciudadesPorPais = {
    "España": ["Madrid", "Barcelona", "Valencia", "Las Palmas"],
    "México": ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
    "Argentina": ["Buenos Aires", "Córdoba", "Mendoza", "San Luis"] 
};

// Referencias a elementos del DOM
const nombreInput = document.getElementById("nombreInput");
const edadInput = document.getElementById("edadInput");
const paisInput = document.getElementById("paisInput");
const ciudadInput = document.getElementById("ciudadInput");
const btnAgregar = document.getElementById("btnAgregar");
const tbody = document.querySelector("tbody");
const chartPaises = document.getElementById("chartPaises");


// 1. Mostrar ciudades específicas =========================
// Escucha cuando cambia el valor del select de países
paisInput.addEventListener("change", () => {
    const paisSeleccionado = paisInput.value;
    const ciudades = ciudadesPorPais[paisSeleccionado];
    
    // Limpiamos el select de ciudades
    ciudadInput.innerHTML = '<option value="">Selecciona ciudad</option>';

    // Creamos las opciónes por cada ciudad
    ciudades.forEach(ciudad => {
        const opcion = document.createElement("option");
        opcion.value = ciudad;
        opcion.textContent = ciudad;
        ciudadInput.appendChild(opcion); 
    });
});


// 2. Agregar persona a la tabla ==========================
let idContador = 1; // Contador de id para incremetar

btnAgregar.addEventListener("click", () => {
    // Leer valores
    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const pais = paisInput.value;
    const ciudad = ciudadInput.value;

    // Validar datos
    if (!nombre || !edad || !pais || !ciudad) {
        alert("Por favor, rellena todos los campos.")
        return; // Salimos de la función si falta algo
    }

    // Creamos la fila
    // insertRow() crea un <tr> y lo añade al final de la tabla
    const fila = tbody.insertRow();

    fila.innerHTML = `
        <td>${idContador}</td>
        <td>${nombre}</td>
        <td>${edad}</td>
        <td>${pais}</td>
        <td>${ciudad}</td>
        <td>
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
        </td>
    `;

    // Incrementamos el contador
    idContador++;

    // Limpiamos los inputs
    nombreInput.value = "";
    edadInput.value = "";
    paisInput.value = "";
    nombreInput.innerHTML = '<option value="">Seleccionar ciudad</option>';
});
