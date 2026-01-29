import Product from "./models/Product.js";
import Category from "./models/Category.js";


// CATEGORIAS
const CATEGORIES = [
    new Category(1, 'Acción'),
    new Category(2, 'Aventura'),
    new Category(3, 'Terror'),
    new Category(4, 'RPG')
];

let action = CATEGORIES.find(category => category.id === 1);
let adventure = CATEGORIES.find(category => category.id === 2);
let terror = CATEGORIES.find(category => category.id === 3);
let rpg = CATEGORIES.find(category => category.id === 4);

// PRODUCTOS
const PRODUCTS = [
    new Product(1, "Marvel's Spider-Man", null, 12.29, 10, [action], 'https://gaming-cdn.com/images/products/11907/616x353/marvel-s-spider-man-remastered-pc-juego-steam-cover.jpg?v=1697644479'),
    new Product(2, "Uncharted: Legacy of Thieves", null, 44.68, 4, [action, adventure], 'https://gaming-cdn.com/images/products/9551/616x353/uncharted-legacy-of-thieves-collection-playstation-5-juego-playstation-store-europe-cover.jpg?v=1730134622'),
    new Product(3, "The Last Of Us Part II Remastered ", null, 29.97, 2, [action, terror], 'https://gaming-cdn.com/images/products/6215/616x353/the-last-of-us-part-ii-remastered-pc-steam-cover.jpg?v=1750336184'),
    new Product(4, "The Witcher 3: Wild Hunt", null, 9.13, 14, [action, adventure, rpg], 'https://gaming-cdn.com/images/products/15233/616x353/the-witcher-3-wild-hunt-complete-edition-complete-edition-xbox-one-xbox-series-x-s-juego-microsoft-store-europe-cover.jpg?v=1739353046'),
    new Product(5, "God of War: Ragnarök", null, 27.99, 12, [action], 'https://gaming-cdn.com/images/products/16797/616x353/god-of-war-ragnarok-pc-steam-cover.jpg?v=1755004824'),
];