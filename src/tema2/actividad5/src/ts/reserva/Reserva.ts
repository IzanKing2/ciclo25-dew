import { Pelicula } from "../Pelicula";
import { Sala } from "../Sala";

export class Reserva {
    static count: number = 1;

    id: number;
    nombre: string;
    pelicula: Pelicula;
    entradas: number;
    fechaYhora: Date;
    precio: number;
    descuento: number;
    idEstado: number;

    constructor(nombre: string, pelicula: Pelicula, entradas: number, fechaYhora: Date, idEstado: number) {
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
    confirmarReserva(sala: Sala): boolean {
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
    cancelarReserva(sala: Sala): void {
        if (this.idEstado === 1) { // solo si esta confirmada
            sala.liberarButacas(this.entradas);
        }
        this.idEstado = 3; // cancelada
    }

    /**
     * Calcla el descuento de una película
     * @param pelicula 
     */
    calcularDescuento(pelicula: Pelicula): void {
        if (this.entradas > 5) {
            this.setDescuento = 0.1;
        } else if (pelicula.idClasificacion === 1) {
            this.setDescuento += 0.05; // 5% de descuento adicional por ser TP
        }
    }

    /**
     * Calcula el precio final aplicando el descuento
     * @returns precio: number
     */
    calcularPrecio(): void {
        this.precio = this.precio * this.entradas * (1 - this.descuento);
        this.setPrecio = this.precio;
    }

    get getDescuento() {
        return this.descuento;
    }

    set setDescuento(descuento: number) {
        if (descuento > 0) {
            this.descuento = descuento;
        }
    }

    get getPrecio() {
        return this.precio;
    }

    set setPrecio(precio: number) {
        if (precio > 0) {
            this.precio = precio;
        }
    }
}