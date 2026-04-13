import Cart from "./models/Cart.js";

const STORAGE_KEYS = {
    CART: 'izanshop_cart',
    PRODUCTS: 'izanshop_products'
};

function saveCart(cart) {
    try {
        const cartData = cart.toJSON();
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));
        return true;
    } catch (error) {
        console.error('Error guardando el carrito:', error);
        return false;
    }
}

function getCart() {
    try {
        const cartData = localStorage.getItem(STORAGE_KEYS.CART);
        const cart = new Cart();
        
        if (cartData) {
            const items = JSON.parse(cartData);
            cart.loadFromJSON(items);
        }
        
        return cart;
    } catch (error) {
        console.error('Error obteniendo el carrito:', error);
        return new Cart();
    }
}

function clearCart() {
    try {
        localStorage.removeItem(STORAGE_KEYS.CART);
        return true;
    } catch (error) {
        console.error('Error limpiando el carrito:', error);
        return false;
    }
}

/**
 * Guarda los productos modificados (para el CRUD simulado)
 * @param {Array} products - Array de productos
 */
function saveProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return true;
    } catch (error) {
        console.error('Error guardando productos:', error);
        return false;
    }
}

/**
 * Obtiene los productos desde localStorage
 * @returns {Array|null} - Array de productos o null si no hay datos guardados
 */
function getProducts() {
    try {
        const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        return products ? JSON.parse(products) : null;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        return null;
    }
}

export { saveCart, getCart, clearCart, saveProducts, getProducts, STORAGE_KEYS };