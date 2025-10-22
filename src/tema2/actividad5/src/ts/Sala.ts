export class Sala {

    numero: number;
    capacidad: number;
    butacasDis: number;

    constructor(numero: number, capacidad: number) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.butacasDis = this.capacidad;
    }

    butacasDisponibles(): boolean {
        return this.butacasDis > 0;
    }

    haySuficientesButacas(cantidad: number): boolean {
        return this.butacasDis >= cantidad;
    }

    ocuparButacas(cantidad: number) {
        if (this.haySuficientesButacas(cantidad)) {
            this.butacasDis -= cantidad;
        }
    }

    liberarButacas(cantidad: number): void {
        this.butacasDis += cantidad;
        if (this.capacidad < this.butacasDis) {
            this.butacasDis = this.capacidad;
        }
    }

    get getButacasDis() {
        return this.butacasDis;
    }

    set setButacasDis(num: number) {
        if (num >= 0 && num <= this.capacidad) {
            this.butacasDis = num;
        }
    }
}