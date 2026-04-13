import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Role from "./models/Role.js";
import User from "./models/User.js";

const categories = [
    new Category('Ordenadores'),
    new Category('Periféricos'),
    new Category('Consolas')
];

const products = [
    new Product('PC 01', './img/pc/01.webp', categories[0].id, 1369.00),
    new Product('PC 02', './img/pc/02.webp', categories[0].id, 1619.00),
    new Product('PC 03', './img/pc/03.webp', categories[0].id, 1469.00),
    new Product('PC 04', './img/pc/04.webp', categories[0].id, 2469.00),
    new Product('Periférico 01', './img/perifericos/01.webp', categories[1].id, 260.00),
    new Product('Periférico 02', './img/perifericos/02.webp', categories[1].id, 86.00),
    new Product('Periférico 03', './img/perifericos/03.webp', categories[1].id, 112.00),
    new Product('Periférico 04', './img/perifericos/04.webp', categories[1].id, 62.00),
    new Product('Consola 01', './img/consolas/01.webp', categories[2].id, 499.00),
    new Product('Consola 02', './img/consolas/02.webp', categories[2].id, 569.00),
    new Product('Consola 03', './img/consolas/03.webp', categories[2].id, 426.00),
    new Product('Consola 04', './img/consolas/04.webp', categories[2].id, 388.00),
];

const roles = [
    new Role('User'),
    new Role('Admin')
];

const users = [
    new User('Admin', 'Administrador', 'admin@test.com', 'password', roles[1].id),
    new User('User', 'Usuario', 'user@test.com', 'password', roles[0].id, 'C/ Praga 42', 'Mastercard')
];

export { categories, products, roles, users }