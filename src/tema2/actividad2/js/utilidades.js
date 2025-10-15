/**
 *  Función para calcular el descuento según los parámetros solicitados:
 *   - < 12 años → 40% descuento.
 *   - 13 a 18 años → 15% descuento.
 *   - 65 años → 25% descuento.
 *   - Cumpleaños → 10% descuento adicional.
 * @param {*} cliente 
 * @param {*} orden 
 * @returns descuento
 */
function calcularDescuento(cliente, orden) {
    let descuento = 0;
    let fechaOrden = new Date(orden.fechaOrden); // Convertimos la fecha a formato 'Date'
    let edad = calcularEdad(cliente, fechaOrden); // Calculamos la edad del cliente
    
    // Selección de descuento según las condiciones
    switch (true) {
        case edad < 12: // < 12 años → 40% descuento.
            descuento = 0.4;
            break;
        case edad >= 13 && edad <= 18: // 13 a 18 años → 15% descuento.
            descuento = 0.15;
            break;
        case edad === 65: // 65 años → 25% descuento.
            descuento = 0.25;
            break;
        default: // Por defecto → descuento = 0
            descuento = 0;
    }

    // Cumpleaños → 10% descuento adicional.
    if (esCumpleanios(cliente, fechaOrden)) {
        descuento += 0.1;
    }
    return descuento;
}


/**
 *  Función para calcular la edad de un cliente según su fecha de nacimiento.
 * @param {*} cliente 
 * @param {*} fechaOrden
 * @returns edad
 */
function calcularEdad(cliente, fechaOrden) {
    // Fecha del orden
    let añoOrden = fechaOrden.getFullYear();
    let mesOrden = fechaOrden.getMonth();
    let diaOrden = fechaOrden.getDate();

    // Fecha de nacimiento
    let fechaNacimiento = new Date(cliente.fechaNacimiento);
    let añoNacimiento = fechaNacimiento.getFullYear();
    let mesNacimiento = fechaNacimiento.getMonth();
    let diaNacimiento = fechaNacimiento.getDate();

    let edad = añoOrden - añoNacimiento; // edad del cliente

    // Comprobamos si ya ha cumplido años
    if (mesOrden < mesNacimiento) {
        edad -= 1;
    } else if (
        (mesOrden === mesNacimiento) && (diaOrden < diaNacimiento)
    ) {
        edad -= 1;
    }

    return edad;
}


/**
 *  Método para comprobar si es el cumpleaños de un cliente a la hora de crear la orden.
 * @param {*} cliente 
 * @param {*} fechaOrden 
 * @returns true || false
 */
function esCumpleanios(cliente, fechaOrden) {
    // Fecha de nacimiento
    let fechaNacimiento = new Date(cliente.fechaNacimiento);
    let añoNacimiento = fechaNacimiento.getFullYear();
    let mesNacimiento = fechaNacimiento.getMonth();
    let diaNacimiento = fechaNacimiento.getDate();

    // Fecha de orden
    let añoOrden = fechaOrden.getFullYear();
    let mesOrden = fechaOrden.getMonth();
    let diaOrden = fechaOrden.getDate();

    if ( // Si ha cumplido años
        (añoOrden > añoNacimiento) &&
        (mesOrden === mesNacimiento) &&
        (diaOrden === diaNacimiento)
    ) {
        return true;
    }

    return false;
}


/**
 *  Función para calcular el precio final al aplicarle el descuento.
 * @param {*} cliente
 * @param {*} orden 
 * @returns precio final
 */
function calcularPrecioFinal(cliente, orden) {
    let precioFinal = 0;

    let precio = orden.precio; // Accedemos al precio

    // Aplicamos la formula dada: precioFinal = precio * (1 - descuento)
    let precioConDescuento = precio * (1 - calcularDescuento(cliente, orden));
    precioFinal += precioConDescuento;

    return precioFinal;
}


/**
 *  Función que selecciona un estado aleatoriamente
 * @param {*} estados 
 * @returns indice aleatorio de la lista de estados
 */
function elegirEstado(estados) {
    // Seleccionamos un estado aleatorio
    const index = Math.floor(Math.random()*estados.length);
    return estados[index];
}