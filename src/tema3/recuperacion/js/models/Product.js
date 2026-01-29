// models/Product.js

class Product {
    constructor(
        id, name, description='', price, stock,
        categories = [], imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.categories = categories;
        this.imageUrl = imageUrl;
    }
}


export default Product;