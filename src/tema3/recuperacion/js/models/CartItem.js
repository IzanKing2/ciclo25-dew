class CartItem {
    constructor(product, quantity = 1) {
        this.id = product.id;
        this.title = product.title;
        this.image_url = product.image_url;
        this.category_id = product.category_id;
        this.price = product.price;
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.price * this.quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    setQuantity(newQuantity) {
        if (newQuantity >= 1) {
            this.quantity = newQuantity;
        }
    }

    /**
     * Convierte el CartItem a un objeto plano para localStorage
     * @returns {Object} - Objeto plano con las propiedades del CartItem
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            image_url: this.image_url,
            category_id: this.category_id,
            price: this.price,
            quantity: this.quantity
        };
    }

    /**
     * Crea un CartItem desde un objeto plano (útil al cargar desde localStorage)
     * @param {Object} data - Datos del item
     * @returns {CartItem} - Nueva instancia de CartItem
     */
    static fromJSON(data) {
        const item = new CartItem({
            id: data.id,
            title: data.title,
            image_url: data.image_url,
            category_id: data.category_id,
            price: data.price
        }, data.quantity);
        return item;
    }
}

export default CartItem;