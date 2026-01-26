import { Role } from './models/Role.js';
import { User } from './models/User.js';
import { Category } from './models/Category.js';
import { Product } from './models/Product.js';


// ========= Datos MOC de prueba =========
// ====== Roles ======
export const ROLES = [
    new Role("Admin"),
    new Role("User")
];

// ====== Usuarios ======
const adminRole = ROLES.find(role => role.name === "Admin");
const userRole = ROLES.find(role => role.name === "User");

export const USERS = [
    new User("admin", "admin123", adminRole),
    new User("user", "user123", userRole)
];

// ====== Categorías ======
export const CATEGORIES = [
    new Category("Acción"),
    new Category("Aventura"),
    new Category("Terror"),
    new Category("Puzles"),
    new Category("RPG"),
];

// ====== Productos ======
const cat1 = CATEGORIES.find(cat => cat.name === "Acción");
const cat2 = CATEGORIES.find(cat => cat.name === "Aventura");
const cat3 = CATEGORIES.find(cat => cat.name === "Terror");
const cat4 = CATEGORIES.find(cat => cat.name === "Puzles");
const cat5 = CATEGORIES.find(cat => cat.name === "RPG");

export const PRODUCTS = [
    new Product(
        "The Last of Us Remake",
        "Vive la emotiva historia de Ellie y Joel en un viaje post-apocalíptico remasterizado con gráficos de última generación.",
        45.82,
        [cat1, cat3],
        10,
        "https://placehold.co/600x400/222/fff?text=The+Last+of+Us"
    ),
    new Product(
        "Marvel's Spider-Man",
        "Balancéate por Nueva York con Peter Parker y enfrenta a villanos icónicos en esta aventura de acción trepidante.",
        22.99,
        [cat1],
        10,
        "https://placehold.co/600x400/c0392b/fff?text=Spider-Man"
    ),
    new Product(
        "The Legend of Zelda: Breath of the Wild",
        "Explora el vasto reino de Hyrule, descubre santuarios y derrota a Ganon en este mundo abierto revolucionario.",
        45.82,
        [cat2],
        10,
        "https://placehold.co/600x400/27ae60/fff?text=Zelda+BOTW"
    ),
    new Product(
        "The Witcher 3: Wild Hunt",
        "Conviértete en Geralt de Rivia, un cazador de monstruos a sueldo, en busca de la niña de la profecía en un mundo devastado por la guerra.",
        45.82,
        [cat1, cat2, cat5],
        10,
        "https://placehold.co/600x400/8e44ad/fff?text=The+Witcher+3"
    ),
    new Product(
        "Uncharted 4: A Thief's End",
        "Acompaña a Nathan Drake en su última y más personal aventura viajando por el mundo para cazar tesoros piratas perdidos.",
        12.99,
        [cat1, cat2, cat4],
        10,
        "https://placehold.co/600x400/d35400/fff?text=Uncharted+4"
    ),
    new Product(
        "God of War Ragnarök",
        "Kratos y Atreus deben explorar los Nueve Reinos en busca de respuestas mientras se preparan para la batalla profetizada.",
        59.99,
        [cat1, cat2],
        15,
        "https://placehold.co/600x400/34495e/fff?text=God+of+War"
    ),
    new Product(
        "Resident Evil 4 Remake",
        "Sobrevive al horror en una aldea española aislada mientras intentas rescatar a la hija del presidente de una secta siniestra.",
        39.99,
        [cat1, cat3],
        5,
        "https://placehold.co/600x400/2c3e50/fff?text=Resident+Evil+4"
    ),
    new Product(
        "Elden Ring",
        "Levántate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden y convertirte en el Señor del Círculo.",
        49.99,
        [cat1, cat5],
        8,
        "https://placehold.co/600x400/f39c12/000?text=Elden+Ring"
    ),
    new Product(
        "Portal 2",
        "Usa tu pistola de portales y resuelve rompecabezas desafiantes con la ayuda (o no) de GLaDOS en los laboratorios de Aperture Science.",
        9.99,
        [cat4, cat2],
        20,
        "https://placehold.co/600x400/2980b9/fff?text=Portal+2"
    ),
    new Product(
        "Final Fantasy VII Rebirth",
        "El viaje continúa fuera de Midgar. Cloud y sus amigos persiguen a Sephiroth por todo el planeta en esta reimaginación épica.",
        69.99,
        [cat5, cat1],
        12,
        "https://placehold.co/600x400/16a085/fff?text=FF+VII+Rebirth"
    ),
    new Product(
        "Cyberpunk 2077",
        "Lucha por sobrevivir en Night City, una megalópolis obsesionada con el poder, el glamur y las modificaciones corporales.",
        29.99,
        [cat1, cat5],
        50,
        "https://placehold.co/600x400/f1c40f/000?text=Cyberpunk+2077"
    ),
    new Product(
        "Hollow Knight",
        "Forja tu propio camino en Hallownest, un vasto reino de insectos y héroes en ruinas, en esta aventura de acción clásica en 2D.",
        14.99,
        [cat1, cat2],
        100,
        "https://placehold.co/600x400/7f8c8d/fff?text=Hollow+Knight"
    )
];