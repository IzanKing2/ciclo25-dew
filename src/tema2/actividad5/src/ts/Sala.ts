export class Sala {

    public numero: number;
    public capacidad: number;
    public butacasDis: number;

    constructor(numero: number, capacidad: number) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.butacasDis = this.capacidad;
    }

    set setButacasDis(num: number) {
        if (num > 0) {
            this.butacasDis = num;
        }
    }
}