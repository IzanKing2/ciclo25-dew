export class Pelicula {
    public static count: number = 1;

    public titulo: string;
    public duracion: number;
    public idClasificacion: number;
    public precio: number;
    public numSala: number;

    constructor(titulo: string, duracion: number, idClasificacion: number, precio: number, numSala: number) {
        this.titulo = titulo;
        this.duracion = duracion;
        this.idClasificacion = idClasificacion;
        this.precio = precio;
        this.numSala = numSala;
    }
}