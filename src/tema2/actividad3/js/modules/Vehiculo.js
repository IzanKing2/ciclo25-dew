class Vehiculo {
    constructor(marca, modelo, anioFab, TipoVehiculo) {
        this.marca = marca;
        this.modelo = modelo;
        this.anioFab = anioFab;
        this.TipoVehiculo = TipoVehiculo;
        this.servicios = [];
    }

    agregarServicio(servicio) {
        servicio.calcularDescuento(this.anioFab);
        servicio.calcularPrecioFinal();
        this.servicios.push(servicio);
    }

    obtenerServicios() {
        return this.servicios;
    }

    filtrarServiciosPorEstado(estado) {
        let serviciosFilter = [];
        for (let servicio of this.servicios) {
            if (estado === servicio.estado) {
                serviciosFilter.push(servicio);
            }
        }

        return serviciosFilter;
    }
}

export default Vehiculo;