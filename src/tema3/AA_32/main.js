// Referencias a elementos del DOM
const nombreInput = document.getElementById("nombreInput");
const edadInput = document.getElementById("edadInput");
const paisInput = document.getElementById("paisInput");
const ciudadInput = document.getElementById("ciudadInput");
const btnAgregar = document.getElementById("btnAgregar");
const tbody = document.querySelector("tbody");
const chartPaises = document.getElementById("chartPaises");

filtrarCiudades(paisInput, ciudadInput);

// Agregamos persona a la tabla
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
        <td class="id">${idContador}</td>
        <td class="nombre">${nombre}</td>
        <td class="edad">${edad}</td>
        <td class="pais">${pais}</td>
        <td class="ciudad">${ciudad}</td>
        <td>
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
        </td>
    `;

    actulizarGrafico(); // Actualizamos el gráfico

    // Asignamos eventos a los botones
    const btnEliminar = fila.querySelector(".eliminar");
    btnEliminar.addEventListener("click", () => eliminarFila(fila)); // Asignamos el evento al botón eliminar

    const btnEditar = fila.querySelector(".editar");
    btnEditar.addEventListener("click", () => activarEdicion(fila)); // Asignamos el evento al botón editar

    // Incrementamos el contador
    idContador++;

    // Limpiamos los inputs
    nombreInput.value = "";
    edadInput.value = "";
    paisInput.value = "";
    ciudadInput.innerHTML = '<option value="">Seleccionar ciudad</option>';
});

/**
 * Método para mostrar ciudades en función del país
 */
function filtrarCiudades(paisInput, ciudadInput) {
    // Datos de países y ciudades
    const ciudadesPorPais = {
        "España": ["Madrid", "Barcelona", "Valencia", "Las Palmas"],
        "México": ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
        "Argentina": ["Buenos Aires", "Córdoba", "Mendoza", "San Luis"]
    };

    // Mostramos ciudades específicas
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
}

/**
 * Método para eliminar una fila de la tabla
 * @param {HTMLTableRowElement} fila Fila de la tabla
 */
function eliminarFila(fila) {
    // Obtenemos el ID para mostrarlo en el mensaje
    const id = fila.querySelector(".id").textContent;

    // Mostramos el mensaje de confirmación
    if (confirm(`¿Estás seguro de que quieres eliminar el registro con ID ${id}?`)) {
        fila.remove();

        actulizarGrafico(); // Actualizamos el gráfico
    }
}

/**
 * Método para activar la edición de una fila
 * @param {HTMLTableRowElement} fila Fila de la tabla
 */
function activarEdicion(fila) {
    // Guardamos valores actuales (por si cancela la edicion)
    const nombre = fila.querySelector(".nombre").textContent;
    const edad = fila.querySelector(".edad").textContent;
    const pais = fila.querySelector(".pais").textContent;
    const ciudad = fila.querySelector(".ciudad").textContent;

    // Guardamos los valores
    fila.dataset.original = JSON.stringify({
        nombre,
        edad,
        pais,
        ciudad
    });

    // Convertimos celdas en inputs
    fila.querySelector(".nombre").innerHTML = `<input class="nuevoNombre" type="text" value="${nombre}">`;
    fila.querySelector(".edad").innerHTML = `<input class="nuevoEdad" type="number" value="${edad}">`;
    fila.querySelector(".pais").innerHTML = `
        <select id="nuevoPais">
            <option value="">Selecciona país</option>
            <option value="España">España</option>
            <option value="México">México</option>
            <option value="Argentina">Argentina</option>
        </select>`;
    fila.querySelector(".ciudad").innerHTML = `
        <select id="nuevoCiudad">
            <option value="">Selecciona ciudad</option>
        </select>
    `;

    const nuevoPais = fila.querySelector('#nuevoPais');
    const nuevoCiudad = fila.querySelector('#nuevoCiudad');

    filtrarCiudades(nuevoPais, nuevoCiudad);

    // Cambiamos los botones
    const tdAcciones = fila.cells[5];
    tdAcciones.innerHTML = `
        <button class="actualizar">Actualizar</button>
        <button class="cancelar">Cancelar</button>
    `;

    // Asignamos eventos a los botones
    const actualizarBtn = tdAcciones.querySelector(".actualizar");
    const cancelarBtn = tdAcciones.querySelector(".cancelar");

    actualizarBtn.addEventListener("click", () => actualizarFila(fila));
    cancelarBtn.addEventListener("click", () => cancelarEdicion(fila));
}

/**
 * Método para actualizar una fila de la tabla
 * @param {HTMLTableRowElement} fila Fila de la tabla
 */
function actualizarFila(fila) {
    // Leemos los inputs
    const nuevoNombre = fila.querySelector(".nuevoNombre").value;
    const nuevoEdad = fila.querySelector(".nuevoEdad").value;
    const nuevoPais = fila.querySelector("#nuevoPais").value;
    const nuevoCiudad = fila.querySelector("#nuevoCiudad").value;

    // Actualizamos el contenido de las celdas
    fila.querySelector(".nombre").textContent = nuevoNombre;
    fila.querySelector(".edad").textContent = nuevoEdad;
    fila.querySelector(".pais").textContent = nuevoPais;
    fila.querySelector(".ciudad").textContent = nuevoCiudad;

    // Restaurar botones
    restaurarBotones(fila);

    // Actualizar gráfico
    actulizarGrafico();
}

/**
 * Método para cancelar la edición de una fila
 * @param {HTMLTableRowElement} fila Fila de la tabla
 */
function cancelarEdicion(fila) {
    // Recuperamos los datos guardados
    const original = JSON.parse(fila.dataset.original);

    // Restauramos los valores
    fila.querySelector(".nombre").textContent = original.nombre;
    fila.querySelector(".edad").textContent = original.edad;
    fila.querySelector(".pais").textContent = original.pais;
    fila.querySelector(".ciudad").textContent = original.ciudad;

    // Restaurar botones
    restaurarBotones(fila);
}

/**
 * Método para restaurar los botones de una fila
 * @param {HTMLTableRowElement} fila Fila de la tabla
 */
function restaurarBotones(fila) {
    const tdAcciones = fila.cells[5];
    tdAcciones.innerHTML = `
        <button class="editar">Editar</button>
        <button class="eliminar">Eliminar</button>
    `;

    // Volvemos a asignar los eventos
    const editarBtn = tdAcciones.querySelector(".editar");
    const eliminarBtn = tdAcciones.querySelector(".eliminar");

    editarBtn.addEventListener("click", () => activarEdicion(fila));
    eliminarBtn.addEventListener("click", () => eliminarFila(fila));
}

// Configuración inicial del gráfico
const chart = new Chart(chartPaises, {
    type: "bar", // Tipo de gráfico: Barras
    data: {
        labels: ["España", "México", "Argentina"], // Etiquetas del eje X
        datasets: [{
            label: "Cantidad de registros",
            data: [0, 0, 0], // Datos iniciales (vacíos)
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] // Colores para cada barra
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true } // Que el eje Y empiece en 0
        }
    }
});

// Función para actualizar el gráfico
function actulizarGrafico() {
    // 1. Contadores a cero
    let conteo = {
        "España": 0,
        "México": 0,
        "Argentina": 0
    };

    // 2. Recorremos todas las filas de la tabla
    const filas = tbody.querySelectorAll("tr");

    filas.forEach(fila => {
        // Celda de país: 3
        const pais = fila.querySelector(".pais").textContent;
        if (conteo[pais] !== undefined) {
            conteo[pais]++;
        }
    });

    // 3. Actualizamos el gráfico
    chart.data.datasets[0].data = [
        conteo["España"],
        conteo["México"],
        conteo["Argentina"]
    ];

    chart.update();
}
