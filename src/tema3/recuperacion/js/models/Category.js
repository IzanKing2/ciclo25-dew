class Category {
    static countId = 0;

    constructor (name) {
        this.id = Category.countId++;
        this.name = name;
    }
}

export default Category;