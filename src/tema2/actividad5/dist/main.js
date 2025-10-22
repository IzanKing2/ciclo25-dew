import { Clasificacion } from "./ts/Clasificacion.js";
import { Pelicula } from "./ts/Pelicula.js";
import { Estado } from "./ts/reserva/Estado.js";
import { Reserva } from "./ts/reserva/Reserva.js";
import { Sala } from "./ts/Sala.js";
let peliculas = [];
let clasificaciones = [];
let salas = [];
let estados = [];
let reservas = [];
// Clasificaciones por edad ---------------------------------
const tp = new Clasificacion("TP");
const masDoce = new Clasificacion("+12");
const masDieciseis = new Clasificacion("+16");
const masDieciocho = new Clasificacion("+18");
clasificaciones.push(tp, masDoce, masDieciseis, masDieciocho);
// Salas de cine --------------------------------------------
const sala1 = new Sala(1, 25);
const sala2 = new Sala(2, 35);
const sala3 = new Sala(3, 25);
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
const estado1 = new Estado("confirmada");
const estado3 = new Estado("pendiente");
const estado2 = new Estado("cancelada");
estados.push(estado1, estado2, estado3);
// Reservas --------------------------------------------------
const r1 = new Reserva("Juan", p1, 2, new Date(), estado1.id);
if (r1.confirmarReserva(p1.sala)) {
    r1.calcularDescuento(p1);
    r1.calcularPrecio();
    console.log("✅ Reserva confirmada");
    console.log(r1);
}
else {
    console.log("❌ No se pudo confirmar su reserva");
}
const r2 = new Reserva("Pedro", p2, 3, new Date(), estado3.id);
const r3 = new Reserva("Maria", p3, 1, new Date(), estado2.id);
reservas.push(r1, r2, r3);
//# sourceMappingURL=main.js.map