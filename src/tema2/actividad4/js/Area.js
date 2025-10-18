export class Area {

    static count = 1;

    constructor(nombre) {
        this.id = Area.count++;
        this.nombre = nombre;
    }

    static area() {
        return [
            new Area("Ala A"),
            new Area("Ala B"),
            new Area("Ala C")
        ];
    }
}