// models/Cart.js

/**
 * Clase Carrito - Representa un carrito vinculado a un usuario o nó
 */
class Cart {
    #id;
    #userId;
    #items; // Arrays de IDs d productos

    constructor(id, userId = null, items = []) {
        this.#id = id;
        this.#userId = userId;
        this.#items = items;
    }

    // 📖 GETTERS =============================
    get id() {
        return this.#id;
    }
    get userId() {
        return this.#userId;
    }
    get items() {
        return [...this.#items];
    }

    // 🎯 MÉTODOS DE NEGOCIO =============================
    /**
     * Añade un item al carrito
     * @param {number} itemId - ID de un producto
     * @returns {boolean} - True si se añadió el producto, false en caso contrario
     */
    addItem(itemId) {
        if (!itemId) {
            return false;
        }

        if (this.#items.includes(itemId)) {
            return false;
        }

        this.#items.push(itemId);
        return true;
    }

    /**
     * Elimina un item del carrito
     * @param {number} itemId - ID del producto
     * @returns {boolean} - True si se eliminó el item, false en caso contrario
     */
    removeItem(itemId) {
        if (!itemId || !this.#items.includes(itemId)) {
            return false;
        }

        this.#items = this.#items.filter(id => id !== itemId);
        return true;
    }

    /**
     * Convierte el objeto a un formato plano para JSON
     * @returns {Object} - Objeto que representa un Carrito
     */
    toJSON() {
        return {
            id: this.#id,
            userId: this.#userId,
            items: this.#items
        }
    }

    /**
     * Crea una instancia de Carrito a partir de un objeto plano
     * @param {Object} data - Objeto con las propiedades de un carrito
     * @returns {Cart} - Objeto que representa un carrito
     */
    static fromJSON(data) {
        return new Cart(data.id, data.userId, data.items);
    }
}


export default Cart;