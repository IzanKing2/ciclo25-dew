export declare class Sala {
    numero: number;
    capacidad: number;
    butacasDis: number;
    constructor(numero: number, capacidad: number);
    butacasDisponibles(): boolean;
    haySuficientesButacas(cantidad: number): boolean;
    ocuparButacas(cantidad: number): void;
    liberarButacas(cantidad: number): void;
    get getButacasDis(): number;
    set setButacasDis(num: number);
}
//# sourceMappingURL=Sala.d.ts.map