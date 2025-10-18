export class Actividad {
    constructor(tipo, fecha, estado) {
        this.tipo = tipo;
        this.fecha = new Date(fecha);
        this.estado = estado;
    }
}