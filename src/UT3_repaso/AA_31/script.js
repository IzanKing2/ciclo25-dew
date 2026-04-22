function mostrarFormulario() {
    const title = document.createElement('h2');
    title.textContent = 'Formulario';
    document.body.appendChild(title);

    // Formulario
    const formulario = document.createElement('form');
    formulario.id = 'formulario';
    

    // ================ Código del producto ================
    const productoCodLabel = document.createElement('label');
    productoCodLabel.className = 'label-field';
    productoCodLabel.textContent = `Código de producto: `;

    const productoCod = document.createElement('input');
    productoCod.className = 'input-field';
    productoCod.type = 'text';

    formulario.appendChild(productoCodLabel);
    formulario.appendChild(productoCod);

    // ================ Nombre del producto ================
    const nombreProdLabel = document.createElement('label');
    nombreProdLabel.className = 'label-field';
    nombreProdLabel.textContent = `Nombre del producto: `;

    const nombreProd = document.createElement('input');
    nombreProd.className = 'input-field';
    productoCod.type = 'text';

    formulario.appendChild(nombreProdLabel);
    formulario.appendChild(nombreProd);

    // ================ Precio ================
    const precioLabel = document.createElement('label');
    precioLabel.className = 'label-field';
    precioLabel.textContent = `Precio: `;

    const precio = document.createElement('input');
    precio.className = 'input-field';
    precio.type = 'number';

    formulario.appendChild(precioLabel);
    formulario.appendChild(precio);

    // ================ Categoría ================
    const opciones = ["Electrónica", "Ropa", "Alimentos"];

    const categoriaLabel = document.createElement('label');
    categoriaLabel.className = 'label-field';
    categoriaLabel.textContent = `Categoría: `;

    const select = document.createElement('select'); // Elemento 'select'
    
    // Recorro el array y creo las opciones
    opciones.forEach(function(opcion) {
        const option = document.createElement("option");
        option.value = opcion; // valor del option
        option.textContent = opcion; // texto visible
        select.appendChild(option);
    });

    formulario.appendChild(categoriaLabel);
    formulario.appendChild(select);

    // ================ Disponibilidad ================
    const disponibilidadContainer = document.createElement('div');
    disponibilidadContainer.className = 'disponibilidad-container';

    const disponibleLabel = document.createElement('label');
    disponibleLabel.className = 'label-field';
    disponibleLabel.textContent = `Disponibilidad: `;
    formulario.appendChild(disponibleLabel);

    const radioContainer = document.createElement('div');
    radioContainer.className = 'radio-container';

    const disponibleOption = document.createElement('input');
    disponibleOption.type = 'radio';
    disponibleOption.name = 'disponibilidad';
    disponibleOption.value = 'true';
    disponibleOption.id = 'disponible';
    
    const disponibleOptionLabel = document.createElement('label');
    disponibleOptionLabel.textContent = `Si`;
    disponibleOptionLabel.htmlFor = 'disponible';

    const noDisponibleOption = document.createElement('input');
    noDisponibleOption.type = 'radio';
    noDisponibleOption.name = 'disponibilidad';
    noDisponibleOption.value = 'false';
    noDisponibleOption.id = 'noDisponible';

    const noDisponibleOptionLabel = document.createElement('label');
    noDisponibleOptionLabel.textContent = `No`;
    noDisponibleOptionLabel.htmlFor = 'noDisponible';

    radioContainer.appendChild(disponibleOption);
    radioContainer.appendChild(disponibleOptionLabel);
    radioContainer.appendChild(noDisponibleOption);
    radioContainer.appendChild(noDisponibleOptionLabel);

    formulario.appendChild(radioContainer);

    // ================ Agregar Producto ================
    const agregar = document.createElement('button');
    agregar.type = 'submit';
    agregar.textContent = 'Agregar Producto';

    formulario.appendChild(agregar);

    document.body.appendChild(formulario);
}


/**
 * Método para mostrar la tabla con los parámetros
 * solicitados.
 */
function mostrarTabla() {
    const title = document.createElement('h2');
    title.textContent = 'Tabla de Productos';
    document.body.appendChild(title);

    const columns = ["ID", "NOMBRE", "PRECIO", "CATEGORÍA", "DISPONIBILIDAD", "ACCIÓN"];
    const data = [
        [1, "Auriculares", 60.99, "Electrónica", "Disponible"],
        [2, "Camiseta", 25.99, "Ropa", "Disponible"],
        [3, "Pan Integral", 12.85, "Alimentos", "No disponible"]
    ];

    const tablaContainer = document.createElement('div');
    tablaContainer.className ='tablaContainer';

    // Crear el elemento tabla
    const table = document.createElement('table');

    // -------------------------------
    // Crear encabezado de la tabla
    // -------------------------------
    const thead = document.createElement('thead');
    const filaEncabezado = document.createElement('tr');

    columns.forEach(function(columna) {
        const th = document.createElement('th');
        th.textContent = columna;
        filaEncabezado.appendChild(th);
    });

    thead.appendChild(filaEncabezado);
    table.appendChild(thead);

    // -------------------------------
    // Crear cuerpo de la tabla
    // -------------------------------
    const tbody = document.createElement("tbody");

    data.forEach(function(filaDatos) {
        const fila = document.createElement('tr');

        filaDatos.forEach(function(celdaDato) {
            const td = document.createElement('td');
            td.textContent = celdaDato;
            fila.appendChild(td);
        });

        const tdAccion = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        tdAccion.appendChild(botonEliminar);
        fila.appendChild(tdAccion);

        tbody.appendChild(fila);
    });

    table.appendChild(tbody);
    tablaContainer.appendChild(table);

    document.body.appendChild(tablaContainer);
}