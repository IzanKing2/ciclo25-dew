export class Clasificacion {

    static count: number = 1;

    id: number;
    nombre: string;

    constructor(nombre: string) {
        this.id = Clasificacion.count++;
        this.nombre = nombre;
    }
}