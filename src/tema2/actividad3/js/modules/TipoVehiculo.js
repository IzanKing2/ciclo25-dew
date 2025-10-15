class TipoVehiculo {

    static count = 1; // Contador estático para asignar IDs únicos

    constructor(nombre) {
        this.id = TipoVehiculo.count++;
        this.nombre = nombre;
    }


    /**
     *  Lista de tipos de vehículo predefinidos
     * @returns {TipoVehiculo[]}
     */
    static tipos() {
        return [
            new TipoVehiculo("Gasolina"),
            new TipoVehiculo("Diesel"),
            new TipoVehiculo("Eléctrico"),
            new TipoVehiculo("Híbrido")
        ];
    }
}

export default TipoVehiculo;