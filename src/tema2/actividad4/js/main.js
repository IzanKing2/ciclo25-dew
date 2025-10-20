import { Animal } from "./Animal.js";
import { Especie } from "./Especie.js";
import { Estado } from "./Estado.js";
import { Area } from "./Area.js";
import { TipoActividad } from "./Actividades/TipoActividad.js";
import { EstadoActividad } from "./Actividades/EstadoActividad.js";
import { Actividad } from "./Actividades/Actividad.js";


const animales = [];
const actividades = [];

// Actividades --------------------------------
// Tipo de actividades
const tipoActividades = TipoActividad.tipoActividad(); // 0:Alimentación 1:Limpieza 2:Atención médica 3:Socialización

// Estado de actividad
const estadosActividad = EstadoActividad.estados(); // 0:Pendiente 1:En progreso 2:Completada

// Actividades
const alimentacion = new Actividad(tipoActividades[0], "2025-02-13", estadosActividad[2]);
const limpieza = new Actividad(tipoActividades[1], "2025-10-17", estadosActividad[1]);
const atencionMedica = new Actividad(tipoActividades[2], "2025-11-02", estadosActividad[0]);
const socializacion = new Actividad(tipoActividades[3], "2025-10-04", estadosActividad[1]);

actividades.push(alimentacion, limpieza, atencionMedica, socializacion);

// --------------------------------------------
// Especies
const especies = Especie.especie(); // 0:Perro 1:Gato 2:Loro

// Áreas
const areas = Area.area(); // 0:Ala A 1:Ala B 2:Ala C

// Estados
const estados = Estado.estado(); // 0:Sano 1:En tratamiento 2:Crítico

// Animal -------------------------------------
const perro = new Animal("Doggy", especies[0].id, 6, estados[0].id, areas[0].id);
perro.agregarActividad(socializacion.id);
perro.agregarActividad(alimentacion.id);

const perro1 = new Animal("Milú", especies[0].id, 7, estados[0].id, areas[2].id);
perro1.agregarActividad(alimentacion.id);

const gato = new Animal("Cat", especies[1].id, 3, estados[1].id, areas[1].id);
gato.agregarActividad(limpieza.id);

const loro = new Animal("Paco", especies[2].id, 10, estados[2].id, areas[2].id);
loro.agregarActividad(atencionMedica.id);

animales.push(perro, perro1, gato, loro);
// -----------------------------------------------

// Mostramos por consola los animales
let sanos = 0;
let enTratamiento = 0;
let critico = 0;

// Contamos el número de animales sanos, en tratamiento y críticos
for (let animal of animales) {
    console.log(animal);
    switch(animal.estado) {
        case estados[0].id: // Sanos
            sanos++;
            break;
        case estados[1].id: // En tratamiento
            enTratamiento++;
            break;
        case estados[2].id: // Críticos
            critico++;
            break;
    }
}


var ctx = document.getElementById('estadoAnimales');

// Creamos el gráfico
var estadoAnimales = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sano', 'En tratamiento', 'Crítico'], // Estados
        datasets: [{
            label: 'Sanos', // Etiqueta del conjunto de datos
            data: [sanos, enTratamiento, critico], // Porcentaje
            backgroundColor: [
                'rgba(0, 218, 0, 1)',
                '#ffbf34ff',
                'rgba(250, 63, 63, 1)'
            ]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Asegura que el eje Y comience en 0
            }
        }
    }
});