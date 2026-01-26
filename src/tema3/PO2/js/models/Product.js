export class Product {
    static count = 0;

    constructor(name, description, price, category, stock, imageUrl, featured = false) {
        this.id = Product.count++;
        this.name = name;
        this.description = description;
        this.price = parseFloat(price);
        this.category = category;
        this.stock = parseInt(stock);
        this.imageUrl = imageUrl;
        this.featured = featured;
        this.createdAt = new Date();
    }

    /**
     * Verifica si hay stock disponible de un producto
     * @param {number} quantity - Cantidad a verificar
     * @returns {boolean} - True si hay stock disponible, false en caso contrario
     */
    hasStock(quantity = 1) {
        return this.stock >= quantity;
    }

    /**
     * Reduce el stock disponible
     * @param {number} quantity - Cantidad a reducir
     * @returns {boolean} - True si se redujo el stock, false si no se pudo
     */
    reduceStock(quantity = 1) {
        if (this.hasStock(quantity)) {
            this.stock -= quantity;
            return true;
        }
        return false;
    }

    /**
     * Aumenta el stock de un producto
     * @param {number} quantity - Cantidad a sumar al stock
     */
    aumentarStock(quantity = 1) {
        this.stock += quantity;
    }

    /**
     * Comprueba si el producto está disponible
     * @returns {boolean} - True si está disponible, false si no
     */
    isAvailable() {
        return this.stock > 0;
    }

    /**
     * Obtiene el valor total del producto
     * @returns {number} - Valor total del producto
     */
    getTotalValue() {
        return this.price * this.stock;
    }
}