const producto = {
    nombre: 'DOOM: The Dark Edges',
    precioBase: 56.69,
    descuento: 0.10
};

const precioFinal = calcularPrecioFinal(producto);


function calcularPrecioFinal(producto) {
    if (producto.precioBase <= 0) {
        throw new Error('Precio inválido');
    } else if (producto.descuento < 0 || producto.descuento > 100) {
        throw new Error('Descuento inválido');
    }

    return producto.precioBase - (producto.precioBase * producto.descuento / 100);
}

