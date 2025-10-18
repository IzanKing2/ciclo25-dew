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

// Animal
const perro = new Animal("Doggy", especies[0], 6, estados[0], areas[0]);
perro.agregarActividad(socializacion);
perro.agregarActividad(alimentacion);

const gato = new Animal("Cat", especies[1], 3, estados[1], areas[1]);
gato.agregarActividad(limpieza);

const loro = new Animal("Paco", especies[2], 10, estados[2], areas[2]);
loro.agregarActividad(atencionMedica);

animales.push(perro, gato, loro);


// Mostramos por consola los animales
for (let animal of animales) {
    console.log(animal);
}

/**
var ctx = document.getElementById('estadoAnimales');

// Creamos el gráfico
var estadoAnimales = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Sano', 'En tratamiento', 'Crítico'], // Estados
        datasets: [{
            label: 'Sanos', // Etiqueta del conjunto de datos
            data: [0, 0.5, 1.0], // Porcentaje
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
*/