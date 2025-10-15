class Servicio {

    constructor(tipo, precio, fecha, estado, anioFabV) {
        this.tipo = tipo;
        this.precio = precio;
        this.fecha = new Date(fecha); // Fecha del servicio
        this.estado = estado;
        this.anioFabV = anioFabV;
        this.descuento = this.calcularDescuento(); // Descuento basado en la antigüedad del vehículo
        this.precioFinal = this.precio * (1 - this.descuento); // Precio final después del descuento
    }


    /**
     *  Calcula el descuento basado en la antigüedad del vehículo
     * @returns {number}
     */
    calcularDescuento() {
        let antiguedad = this.calcularAntiguedad();

        if (antiguedad < 2) return 0.10;
        if (antiguedad >= 2 && antiguedad <= 5) return 0.05;
        if (antiguedad > 10) return 0.20;
        return 0;
    }


    /**
     *  Calcula la antigüedad del vehículo en años
     * @returns {number}
     */
    calcularAntiguedad() {
        let ddS = this.fecha.getDate();
        let mmS = this.fecha.getMonth();
        let aaS = this.fecha.getFullYear();

        // Año de fabricación del vehículo
        const anioFab = new Date(this.anioFabV);
        let ddV = anioFab.getDate();
        let mmV = anioFab.getMonth();
        let aaV = anioFab.getFullYear();

        let antiguedad = aaS - aaV;

        if (mmS < mmV || mmS === mmV && ddS < ddV) {
            antiguedad--;
        }

        return antiguedad;
    }
}

export default Servicio;