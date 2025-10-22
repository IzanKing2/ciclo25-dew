import { Pelicula } from "../Pelicula";
import { Sala } from "../Sala";
export declare class Reserva {
    static count: number;
    id: number;
    nombre: string;
    pelicula: Pelicula;
    entradas: number;
    fechaYhora: Date;
    precio: number;
    descuento: number;
    idEstado: number;
    constructor(nombre: string, pelicula: Pelicula, entradas: number, fechaYhora: Date, idEstado: number);
    /**
     * Confirma la reserva si hay suficientes butacas disponibles
     * @param sala Sala de cine
     * @returns true si la reserva se ha confirmado, false en caso contrario
     */
    confirmarReserva(sala: Sala): boolean;
    /**
     * Cancela la reserva si esta confirmada
     * @param sala Sala de cine
     */
    cancelarReserva(sala: Sala): void;
    /**
     * Calcla el descuento de una película
     * @param pelicula
     */
    calcularDescuento(pelicula: Pelicula): void;
    /**
     * Calcula el precio final aplicando el descuento
     * @returns precio: number
     */
    calcularPrecio(): void;
    get getDescuento(): number;
    set setDescuento(descuento: number);
    get getPrecio(): number;
    set setPrecio(precio: number);
}
//# sourceMappingURL=Reserva.d.ts.map