export class EstadoActividad {
    
    static count = 1;

    constructor(estado) {
        this.id = EstadoActividad.count++;
        this.estado = estado;
    }

    static estados() {
        return [
            new EstadoActividad("Pendiente"),
            new EstadoActividad("En progreso"),
            new EstadoActividad("Completada")
        ];
    }
}