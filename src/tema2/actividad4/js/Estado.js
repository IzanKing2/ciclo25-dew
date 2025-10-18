export class Estado {
    static count = 1;

    constructor(nombre) {
        this.id = Estado.count++;
        this.nombre = nombre;
    }

    static estado() {
        return [
            new Estado("Sano"),
            new Estado("En tratamiento"),
            new Estado("Crítico")
        ];
    }
}