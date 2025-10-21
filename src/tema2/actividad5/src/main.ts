import { Clasificacion } from "./ts/Clasificacion.js";
import { Pelicula } from "./Pelicula.js";
import { Sala } from "./Sala.js";


let peliculas: Array<Pelicula> = [];

// Clasificaciones por edad
const tp: Clasificacion = new Clasificacion("TP");
const masDoce: Clasificacion = new Clasificacion("+12");
const masDieciseis: Clasificacion = new Clasificacion("+16");
const masDieciocho: Clasificacion = new Clasificacion("+18");

// Salas de cine
const sala1: Sala = new Sala(1, 25);
const sala2: Sala = new Sala(2, 35);
const sala3: Sala = new Sala(3, 25);

// Películas ---------------------------
const p1 = new Pelicula("El señor de los Anillos: Las dos torres", 179, masDieciseis.id, 7.28, sala2.numero);

const p2 = new Pelicula("Interestelar", 186, masDoce.id, 7.28, sala1.numero);

const p3 = new Pelicula("Superman", 172, tp.id, 7.28, sala3.numero);

peliculas.push(p1, p2, p3);

for (let pelicula of peliculas) {
    console.log(pelicula);
}
// --------------------------------------