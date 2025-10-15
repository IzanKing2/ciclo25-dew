class Vehiculo {

    constructor (marca, modelo, anioFab, tipo) {
        this.marca = marca;
        this.modelo = modelo;
        this.anioFab = anioFab;
        this.tipo = tipo;
        this.servicios = []; // Lista de servicios asociados al vehículo
    }

    /**
     *  Agrega un servicio al vehículo
     * @param {*} servicio 
     */
    agregarServicio(servicio) {
        this.servicios.push(servicio);
    }

    
    /**
     *  Método para buscar los servicios en función del
     *  estado.
     * @param {*} estadoId 
     * @returns Servicio []
     */
    getServiciosPorEstado(estado) {
        let serviciosFilter = [];
        for (servicio of this.servicios) {
            if (servicio.estado.toLowerCase() === estado.toLowerCase()) {
                serviciosFilter.push(servicio);
            }
        }

        return serviciosFilter;
    }
}

export default Vehiculo;