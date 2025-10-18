export class Animal {
    constructor(nombre, especie, edad, estado, area) {
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.estado = estado;
        this.area = area;
        this.actividades = [];
    }

    agregarActividad(actividad) {
        this.actividades.push(actividad);
    }
}