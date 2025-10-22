export class Pelicula {
    constructor(titulo, duracion, idClasificacion, precio, sala) {
        this.id = Pelicula.count++;
        this.titulo = titulo;
        this.duracion = duracion;
        this.idClasificacion = idClasificacion;
        this.precio = precio;
        this.sala = sala;
    }
}
Pelicula.count = 1;
//# sourceMappingURL=Pelicula.js.map