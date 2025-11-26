import { Product } from './Product.js';
import { Carrito } from './Carrito.js';

const productManager = new Product();
const carritoManager = new Carrito();
productManager.addProductToSessionStorage();
console.log('Productos guardados en SessionStorage checkealo en la pestaña Application del navegador');

// Mostramos todos los productos
productManager.paintAllProuducts(carritoManager);

const botonVaciar = document.getElementById('boton-vaciar');
if (botonVaciar) {
    botonVaciar.addEventListener('click', () => carritoManager.emptyCarrito());
}