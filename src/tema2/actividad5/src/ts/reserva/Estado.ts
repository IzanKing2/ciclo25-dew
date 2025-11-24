export class Estado {
    static count: number = 1;

    id: number;
    nombre: string;

    constructor(nombre: string) {
        this.id = Estado.count++;
        this.nombre = nombre;
    }

    get getEstado() {
        return this.nombre;
    }

    set setEstado(nombre: string) {
        if (
            nombre === "confirmada" ||
            nombre === "pendiente" || 
            nombre === "cancelada"
        ) {
            this.nombre = nombre;
        }
    }
}