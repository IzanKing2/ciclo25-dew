export class Clasificacion {

    public static count: number = 1;

    public id: number;
    public nombre: string;

    constructor(nombre: string) {
        this.id = Clasificacion.count++;
        this.nombre = nombre;
    }
}