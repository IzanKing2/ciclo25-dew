import { Sala } from "./Sala";

export class Pelicula {
    static count: number = 1;

    id: number;
    titulo: string;
    duracion: number;
    idClasificacion: number;
    precio: number;
    sala: Sala;

    constructor(titulo: string, duracion: number, idClasificacion: number, precio: number, sala: Sala) {
        this.id = Pelicula.count++;
        this.titulo = titulo;
        this.duracion = duracion;
        this.idClasificacion = idClasificacion;
        this.precio = precio;
        this.sala = sala;
    }
}