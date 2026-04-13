class Product {
    static countId = 0;

    constructor (title, image_url=null, category_id, price, quantity) {
        this.id = Product.countId++;
        this.title = title;
        this.image_url = image_url;
        this.category_id = category_id;
        this.price = price;
        this.quantity = quantity;
    }
}

export default Product;