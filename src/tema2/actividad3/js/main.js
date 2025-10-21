import Estado from "./modules/Estado.js";
import Servicio from "./modules/Servicio.js";
import TipoServicio from "./modules/TipoServicio.js";
import TipoVehiculo from "./modules/TipoVehiculo.js";
import Vehiculo from "./modules/Vehiculo.js";


// Tipos de Vehículo ------------------------------------
const tiposVehiculo = TipoVehiculo.tipos(); // 0:Gasolina 1:Diesel 2:Eléctrico 3:Híbrido

// Estados ---------------------------------------------
const estados = Estado.estados(); // 0:Pendiente 1:En progreso 2:Completado

// Tipos de Servicio -----------------------------------
const tiposServicios = TipoServicio.tipos();// 0:Cambio de aceite 1:Revisión de frenos 2:Alineación

// Vehículos ----------------------------------
const vehiculos = []; // Lista de vehículos

const v1 = new Vehiculo(
    "Hyundai",
    "Tucson",
    "2020-03-12",
    tiposVehiculo[1].id
);
vehiculos.push(v1);

const v2 = new Vehiculo(
    "Dasia",
    "Sandero",
    "2012-06-02",
    tiposVehiculo[0].id
);
vehiculos.push(v2);

const v3 = new Vehiculo(
    "Hyundai",
    "Ionic",
    "2024-01-22",
    tiposVehiculo[3].id
);
vehiculos.push(v3);


// Servicios ----------------------------------
const servicios = []; // Lista de servicios

const servicio1 = new Servicio(
    tiposServicios[0].id,
    100,
    new Date(),
    estados[0].id,
    v1.anioFab
);
servicios.push(servicio1);

const servicio2 = new Servicio(
    tiposServicios[1].id,
    180,
    new Date(),
    estados[1].id,
    v2.anioFab
);
servicios.push(servicio2);

const servicio3 = new Servicio(
    tiposServicios[2].id,
    120,
    "2025-02-12",
    estados[2].id,
    v3.anioFab
);
servicios.push(servicio3);

// Agrego los servicios a los vehículos
v1.agregarServicio(servicio1.id);
v2.agregarServicio(servicio2.id);
v3.agregarServicio(servicio3.id);

// Muestro los vehículos y los servicios en consola
for (let vehiculo of vehiculos) {
    console.log(vehiculo);
}

for (let servicio of servicios) {
    console.log(servicio);
}