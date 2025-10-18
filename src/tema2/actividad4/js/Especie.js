export class Especie {

    static count = 1;

    constructor(nombre) {
        this.id = Especie.count++;
        this.nombre = nombre;
    }

    static especie() {
        return [
            new Especie("Perro"),
            new Especie("Gato"),
            new Especie("Loro")
        ];
    }
}