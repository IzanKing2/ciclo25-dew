import { Clasificacion } from "./ts/Clasificacion.js";
import { Pelicula } from "./ts/Pelicula.js";
import { Estado } from "./ts/reserva/Estado.js";
import { Reserva } from "./ts/reserva/Reserva.js";
import { Sala } from "./ts/Sala.js";


let peliculas: Array<Pelicula> = [];
let clasificaciones: Array<Clasificacion> = [];
let salas: Array<Sala> = [];
let estados: Array<Estado> = [];
let reservas: Array<Reserva> = [];

// Clasificaciones por edad ---------------------------------
const tp: Clasificacion = new Clasificacion("TP");
const masDoce: Clasificacion = new Clasificacion("+12");
const masDieciseis: Clasificacion = new Clasificacion("+16");
const masDieciocho: Clasificacion = new Clasificacion("+18");

clasificaciones.push(tp, masDoce, masDieciseis, masDieciocho);

// Salas de cine --------------------------------------------
const sala1: Sala = new Sala(1, 25);
const sala2: Sala = new Sala(2, 35);
const sala3: Sala = new Sala(3, 25);

salas.push(sala1, sala2, sala3);

// Películas ------------------------------------------------
const p1 = new Pelicula("El señor de los Anillos: Las dos torres", 179, masDieciseis.id, 7.28, sala2);
const p2 = new Pelicula("Interestelar", 186, masDoce.id, 7.28, sala1);
const p3 = new Pelicula("Superman", 172, tp.id, 7.28, sala3);

peliculas.push(p1, p2, p3);

for (let pelicula of peliculas) {
    console.log(pelicula);
}

// Estados de reserva ----------------------------------------
const estado1: Estado = new Estado("confirmada");
const estado3: Estado = new Estado("pendiente");
const estado2: Estado = new Estado("cancelada");

estados.push(estado1, estado2, estado3);

// Reservas --------------------------------------------------
const r1 = new Reserva("Juan", p1, 2, new Date());
if (r1.confirmarReserva()) {
    r1.calcularDescuento();
    r1.calcularPrecio();
    console.log("✅ Reserva confirmada");
    console.log(r1);
} else {
    console.log("❌ No se pudo confirmar su reserva");
}
console.log("Butacas disoponibles sala " + r1.pelicula.sala.numero + ": " + r1.pelicula.sala.getButacasDis);

r1.cancelarReserva();
console.log("✅ Reserva cancelada")
console.log("Butacas disoponibles sala " + r1.pelicula.sala.numero + ": " + r1.pelicula.sala.getButacasDis);

const r2 = new Reserva("Pedro", p2, 3, new Date());
const r3 = new Reserva("Maria", p3, 1, new Date());

reservas.push(r1, r2, r3);
