export class Clasificacion {

    public static count: number = 1;

    public id: number;
    public nombre: string;

    constructor(nombre: string) {
        this.id = Clasificacion.count++;
        this.nombre = nombre;
    }

    public static clasificacion(): Array<Clasificacion> {
        return [
            new Clasificacion("TP"),
            new Clasificacion("+12"),
            new Clasificacion("+16"),
            new Clasificacion("+18")
        ];
    }
}