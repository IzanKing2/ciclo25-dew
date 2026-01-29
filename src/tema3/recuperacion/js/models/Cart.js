// models/Cart.js

class Cart {
    constructor(id, user=null, items = []) {
        this.id = id;
        this.user = user;
        this.items = items;
    }
}


export default Cart;