export class TipoActividad {

    static count = 1;

    constructor(nombre) {
        this.id = TipoActividad.count++;
        this.nombre = nombre;
    }

    static tipoActividad() {
        return [
            new TipoActividad("Alimentación"),
            new TipoActividad("Limpieza"),
            new TipoActividad("Atención médica"),
            new TipoActividad("Socialización")
        ];
    }
}