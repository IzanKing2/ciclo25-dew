import CartItem from "./CartItem.js";

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            const newItem = new CartItem(product, 1);
            this.items.push(newItem);
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    removeProductById(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    updateItemQuantity(index, newQuantity) {
        if (index >= 0 && index < this.items.length) {
            this.items[index].setQuantity(newQuantity);
        }
    }

    clear() {
        this.items = [];
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getProductCount() {
        return this.items.length;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
    }

    getTotalFormatted() {
        return this.getTotal().toFixed(2);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    findItemByProductId(productId) {
        return this.items.find(item => item.id === productId);
    }

    getItems() {
        return this.items;
    }

    toJSON() {
        return this.items.map(item => item.toJSON());
    }

    /**
     * Carga items desde un array (usado al recuperar de localStorage)
     * @param {Array} itemsData - Array de datos de items
     */
    loadFromJSON(itemsData) {
        this.items = itemsData.map(data => CartItem.fromJSON(data));
    }

    /**
     * Obtiene un resumen del carrito para mostrar al usuario
     * @returns {Object} - Objeto con información resumida
     */
    getSummary() {
        return {
            totalItems: this.getTotalItems(),
            productCount: this.getProductCount(),
            total: this.getTotal(),
            totalFormatted: this.getTotalFormatted(),
            isEmpty: this.isEmpty()
        };
    }
}

export default Cart;