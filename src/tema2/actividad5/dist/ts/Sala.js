export class Sala {
    constructor(numero, capacidad) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.butacasDis = this.capacidad;
    }
    butacasDisponibles() {
        return this.butacasDis > 0;
    }
    haySuficientesButacas(cantidad) {
        return this.butacasDis >= cantidad;
    }
    ocuparButacas(cantidad) {
        if (this.haySuficientesButacas(cantidad)) {
            this.butacasDis -= cantidad;
        }
    }
    liberarButacas(cantidad) {
        this.butacasDis += cantidad;
        if (this.capacidad < this.butacasDis) {
            this.butacasDis = this.capacidad;
        }
    }
    get getButacasDis() {
        return this.butacasDis;
    }
    set setButacasDis(num) {
        if (num >= 0 && num <= this.capacidad) {
            this.butacasDis = num;
        }
    }
}
//# sourceMappingURL=Sala.js.map