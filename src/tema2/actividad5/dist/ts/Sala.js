export class Sala {
    constructor(numero, capacidad) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.butacasDis = this.capacidad;
    }
    set setButacasDis(num) {
        if (num > 0) {
            this.butacasDis = num;
        }
    }
}
//# sourceMappingURL=Sala.js.map