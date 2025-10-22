export class Estado {
    constructor(nombre) {
        this.id = Estado.count++;
        this.nombre = nombre;
    }
    get getEstado() {
        return this.nombre;
    }
    set setEstado(nombre) {
        if (nombre === "confirmada" ||
            nombre === "pendiente" ||
            nombre === "cancelada") {
            this.nombre = nombre;
        }
    }
}
Estado.count = 1;
//# sourceMappingURL=Estado.js.map