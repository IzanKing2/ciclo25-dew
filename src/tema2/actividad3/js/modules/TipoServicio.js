class TipoServicio {

    static count = 1; // Contador estático para asignar IDs únicos

    constructor(nombre) {
        this.id = TipoServicio.count++;
        this.nombre = nombre;
    }

    
    /**
     *  Lista de tipos de servicio predefinidos
     * @returns {TipoServicio[]}
     */
    static tipos() {
        return [
            new TipoServicio("Cambio de aceite"),
            new TipoServicio("Revisión de frenos"),
            new TipoServicio("Alineación")
        ];
    }
}

export default TipoServicio;