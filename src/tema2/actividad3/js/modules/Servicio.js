import Vehiculo from './Vehiculo.js';

class Servicio {
    constructor(TipoServicio, precio, fecha, Estado) {
        this.TipoServicio = TipoServicio;
        this.precio = precio;
        this.fecha = fecha;
        this.descuento = 0;
        this.precioFinal = 0;
        this.Estado = Estado;
    }

    calcularDescuento(anioFabV) {
        let antiguedad = this.calcularAntiguedad(anioFabV);

        switch(true) {
            case antiguedad < 2:
                this.descuento = 0.1;
                break;
            case antiguedad >= 2 && antiguedad <= 5:
                this.descuento = 0.05;
                break;
            case antiguedad > 10:
                this.descuento = 0.2;
                break;
            default:
                this.descuento = 0;
                break;
        }
    }

    calcularAntiguedad(anioFabV) {
        // Fecha del Vehículo
        let dateV = new Date(anioFabV);
        let ddV = dateV.getDate();
        let mmV = dateV.getMonth();
        let aaV = dateV.getFullYear();

        // Fechas del Servicio
        let dateS = new Date(this.fecha);
        let ddS = dateS.getDate();
        let mmS = dateS.getMonth();
        let aaS = dateS.getFullYear();

        let antiguedad = aaS - aaV;

        if (mmS < mmV) {
            antiguedad--;
        } else if (mmS == mmV && ddS < ddV) {
            antiguedad--;
        }

        return antiguedad;
    }

    calcularPrecioFinal() {
        this.precioFinal = this.precio * (1 - this.descuento);
    }
}

export default Servicio;