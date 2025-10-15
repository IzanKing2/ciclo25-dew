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
}

export default Vehiculo;