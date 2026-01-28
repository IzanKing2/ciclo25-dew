// models/Product.js

/**
 * Clase Product - Representa un producto del catálogo
 */
class Product {
    #id;
    #name;
    #price;
    #stock;
    #categoryId;

    constructor(
        id, name, description='', price, stock, 
        categoryId, imageUrl, featured=false) {
            this.#id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.stock = stock;
            this.#categoryId = categoryId;
            this.imageUrl = imageUrl;
            this.featured = featured;
    }

    // 📖 GETTERS =============================
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get price() {
        return this.#price;
    }

    get stock() {
        return this.#stock;
    }

    get categoryId() {
        return this.#categoryId;
    }

    // ✍️ SETTERS =============================
    set name(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El nombre del producto no puede estar vacio');
        }
        this.#name = value.trim()
    }

    set price(value) {
        if (value < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        this.#price = parseFloat(value);
    }

    set stock(value) {
        if (value < 0) {
            throw new Error('El stock no puede ser negativo');
        }
        this.#stock = parseInt(value);
    }

    // 🎯 MÉTODOS DE NEGOCIO =============================
    /**
     * Comprueba que hay una cantidad de un producto
     * @param {number} quantity - Cantidad a comprobar
     * @returns {boolean} - True si existe la cantidad especificada
     */
    hasStock(quantity = 1) {
        return this.#stock >= quantity;
    }

    /**
     * Reduce el stock de un producto
     * @param {number} quantity - Cantidad a reducir
     * @returns {boolean} - True si se redujo la cantidad, false si no
     */
    reduceStock(quantity = 1) {
        if (!this.hasStock(quantity)) {
            return false;
        }
        this.#stock -= quantity;
        return true;
    }

    /**
     * Incrementa el stock de un producto
     * @param {number} quantity - Cantidad a sumar al stock
     */
    increaseStock(quantity = 1) {
        this.#stock += quantity;
    }

    /**
     * Comprueba si un producto tiene stock
     * @returns {boolean} - True si hay stock, false si no hay
     */
    isAvailable() {
        return this.#stock > 0;
    }

    /**
     * Calcula el precio total de un producto
     * @returns {number} - Precio total de un producto
     */
    getTotalValue() {
        return this.#price * this.#stock;
    }

    /**
     * Convierte el objeto a un formato plano para JSON
     * @returns {Object} - Objeto que representa un producto
     */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.description,
            price: this.#price,
            stock: this.#stock,
            categoryId: this.#categoryId,
            imageUrl: this.imageUrl,
            featured: this.featured
        };
    }

    /**
     * Crea una instancia de Product a partir de un objeto plano
     * @param {Object} data - Objeto con las propiedades de un producto
     * @returns {Product} - Objeto producto
     */
    static fromJSON(data) {
        return new Product(
            data.id, 
            data.name, 
            data.description, 
            data.price, 
            data.stock, 
            data.categoryId,
            data.imageUrl, 
            data.featured
        );
    }
}


export default Product;