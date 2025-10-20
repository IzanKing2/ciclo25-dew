export class Actividad {
    static count = 1;

    constructor(tipo, fecha, estado) {
        this.id = Actividad.count++;
        this.tipo = tipo;
        this.fecha = new Date(fecha);
        this.estado = estado;
    }
}