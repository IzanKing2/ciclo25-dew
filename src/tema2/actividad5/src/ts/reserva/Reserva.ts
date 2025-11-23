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

    constructor(nombre: string, pelicula: Pelicula, entradas: number, fechaYhora: Date) {
        this.id = Reserva.count++;
        this.nombre = nombre;
        this.pelicula = pelicula;
        this.entradas = entradas;
        this.fechaYhora = fechaYhora;
        this.descuento = 0;
        this.precio = 0;
        this.idEstado = 2; // 1: confirmada, 2: pendiente, 3: cancelada
    }

    /**
     * Confirma la reserva si hay suficientes butacas disponibles
     * @returns true si la reserva se ha confirmado (o ya lo estaba), false en caso contrario
     */
    confirmarReserva(): boolean {
        // idempotencia: si ya estaba confirmada, devolvemos true sin volver a ocupar
        if (this.idEstado === 1) return true;

        // si está cancelada, no permitimos re-confirmar
        if (this.idEstado === 3) return false;

        const sala = this.pelicula.sala;
        if (!sala.haySuficientesButacas(this.entradas)) return false;

        sala.ocuparButacas(this.entradas);
        this.idEstado = 1; // confirmada
        return true;
    }

    /**
     * Cancela la reserva; solo libera butacas si estaba confirmada
     */
    cancelarReserva(): void {
        if (this.idEstado === 1) {
            this.pelicula.sala.liberarButacas(this.entradas);
        }
        this.idEstado = 3; // cancelada
    }

    /**
     * Calcla el descuento de una película
     */
    calcularDescuento(): void {
        if (this.entradas > 5) {
            this.descuento = 0.1;
        } else if (this.pelicula.idClasificacion === 1) {
            this.descuento += 0.05;
        }
    }

    /**
     * Calcula el precio final aplicando el descuento
     * @returns precio: number
     */
    calcularPrecio(): void {
        this.precio = this.pelicula.precio * this.entradas * (1 - this.descuento);
    }

    get getDescuento() {
        return this.descuento;
    }

    get getPrecio() {
        return this.precio;
    }
}