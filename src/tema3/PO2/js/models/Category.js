export class Category {
    static count = 0;

    constructor(name) {
        this.id = Category.count++;
        this.name = name;
    }
}