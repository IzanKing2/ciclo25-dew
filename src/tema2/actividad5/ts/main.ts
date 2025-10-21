import { Clasificacion } from "./Clasificacion";
import { Pelicula } from "./Pelicula";
import { Sala } from "./Sala";


let peliculas: Array<Pelicula> = [];

// Clasificaciones por edad
let clasificaciones: Array<Clasificacion> = Clasificacion.clasificacion(); // 0:TP 1:+12 2:+16 3:+18

// Salas de cine
let salas: Array<Sala> = Sala.sala(); // 0:1 1:2 2:3

// Películas ---------------------------
let p1 = new Pelicula("El señor de los Anillos: Las dos torres", 179, clasificaciones[2].id, 7.28, salas[1].numero);

let p2 = new Pelicula("Interestelar", 186, clasificaciones[1].id, 7.28, salas[0].numero);

let p3 = new Pelicula("Superman", 172, clasificaciones[0].id, 7.28, salas[2].numero);

peliculas.push(p1, p2, p3);
// --------------------------------------