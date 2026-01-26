export class Role {
    static count = 0;

    constructor(name) {
        this.id = Role.count++;
        this.name = name;
    }
}