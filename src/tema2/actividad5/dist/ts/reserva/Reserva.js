export class Reserva {
    constructor(nombre, pelicula, entradas, fechaYhora, idEstado) {
        this.id = Reserva.count++;
        this.nombre = nombre;
        this.pelicula = pelicula;
        this.entradas = entradas;
        this.fechaYhora = fechaYhora;
        this.descuento = 0;
        this.precio = 0;
        this.idEstado = idEstado; // 1: confirmada, 2: pendiente, 3: cancelada
    }
    /**
     * Confirma la reserva si hay suficientes butacas disponibles
     * @param sala Sala de cine
     * @returns true si la reserva se ha confirmado, false en caso contrario
     */
    confirmarReserva(sala) {
        if (sala.haySuficientesButacas(this.entradas)) {
            sala.ocuparButacas(this.entradas);
            this.idEstado = 1; // confirmada
            return true;
        }
        return false;
    }
    /**
     * Cancela la reserva si esta confirmada
     * @param sala Sala de cine
     */
    cancelarReserva(sala) {
        if (this.idEstado === 1) { // solo si esta confirmada
            sala.liberarButacas(this.entradas);
        }
        this.idEstado = 3; // cancelada
    }
    /**
     * Calcla el descuento de una película
     * @param pelicula
     */
    calcularDescuento(pelicula) {
        if (this.entradas > 5) {
            this.setDescuento = 0.1;
        }
        else if (pelicula.idClasificacion === 1) {
            this.setDescuento += 0.05; // 5% de descuento adicional por ser TP
        }
    }
    /**
     * Calcula el precio final aplicando el descuento
     * @returns precio: number
     */
    calcularPrecio() {
        this.precio = this.precio * this.entradas * (1 - this.descuento);
        this.setPrecio = this.precio;
    }
    get getDescuento() {
        return this.descuento;
    }
    set setDescuento(descuento) {
        if (descuento > 0) {
            this.descuento = descuento;
        }
    }
    get getPrecio() {
        return this.precio;
    }
    set setPrecio(precio) {
        if (precio > 0) {
            this.precio = precio;
        }
    }
}
Reserva.count = 1;
//# sourceMappingURL=Reserva.js.map