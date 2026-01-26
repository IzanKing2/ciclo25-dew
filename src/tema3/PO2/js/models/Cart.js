class Cart {
    static count = 0;

    constructor(userId, items) {
        this.id = Cart.count++;
        this.userId = userId;
        this.items = items;
    }
}