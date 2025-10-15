import Estado from './modules/Estado.js';
import TipoServicio from './modules/TipoServicio.js';
import Servicio from './modules/Servicio.js';
import TipoVehiculo from './modules/TipoVehiculo.js';
import Vehiculo from './modules/Vehiculo.js';


// Tipos de servicios
const tipoServ1 = new TipoServicio(1, "Cambio de aceite");
const tipoServ2 = new TipoServicio(2, "Revisión de frenos");
const tipoServ3 = new TipoServicio(3, "Alineación");

// Estados
const estado1 = new Estado(1, "Pendiente");
const estado2 = new Estado(2, "En progreso");
const estado3 = new Estado(3, "Completado");

// Tipo de vehículos
const tipoV1 = new TipoVehiculo(1, "Diesel");
const tipoV2 = new TipoVehiculo(2, "Gasolina");
const tipoV3 = new TipoVehiculo(3, "Eléctrico");

// Servicios
const servicio1 = new Servicio(tipoServ1, 120, "2025-10-02", estado1);
const servicio2 = new Servicio(tipoServ2, 200, "2025-05-12", estado2);
const servicio3 = new Servicio(tipoServ3, 150, "2025-09-22", estado3);

// Vehículos
const v1 = new Vehiculo("Hyundai", "Tucson", "2020-02-12", tipoV1);
v1.agregarServicio(servicio1);
const v2 = new Vehiculo("Dasia", "Sandero", "2012-11-23", tipoV2);
v2.agregarServicio(servicio2);
const v3 = new Vehiculo("Hyundai", "Ionic", "2024-01-02", tipoV3);
v3.agregarServicio(servicio3);
