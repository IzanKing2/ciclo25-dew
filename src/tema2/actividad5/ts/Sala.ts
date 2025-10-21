export class Sala {

    public numero: number;
    public capacidad: number;
    public butacasDis: number;

    constructor(numero: number, capacidad: number) {
        this.numero = numero;
        this.capacidad = capacidad;
        this.butacasDis = this.capacidad;
    }

    static sala(): Array<Sala> {
        return [
            new Sala(1, 25),
            new Sala(2, 35),
            new Sala(3, 25)
        ];
    }

    set setButacasDis(num: number) {
        if (num > 0) {
            this.butacasDis = num;
        }
    }
}