// models/ItemCart.js

class ItemCart {
    #product;
    #quantity;
    #addedAt;

    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
        this.#addedAt = new Date();
    }

    // 📖 GETTERS =============================
    get product() {
        return this.#product;
    }

    get quantity() {
        return this.#quantity;
    }

    get addedAt() {
        return this.#addedAt;
    }

    // ✍️ SETTERS =============================
    set quantity(value) {
        if (value < 1) {
            throw new Error('La cantidad debe ser mayor a 1');
        }
        this.#quantity = value;
    }

    set product(product) {
        if (!product || typeof product !== 'Object') {
            throw new Error('Se requiere un producto válido');
        }
        this.#product = product;
    }

    // 🎯 MÉTODOS DE NEGOCIO =============================
    getSubtotal() {
        return this.#product.price * this.#quantity;
    }

    increaseQuantity(quantity = 1) {
        const newQuantity = this.#quantity + quantity;

        if (!this.#product.hasStock(newQuantity)) {
            throw new Error(
                `No hay suficiente stock. Solo quedan ${this.#product.stock} unidades`
            );
        }
        this.#quantity = newQuantity;
    }
}