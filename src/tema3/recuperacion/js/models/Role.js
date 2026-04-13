class Role {
    static countId = 0;

    constructor(name) {
        this.id = Role.countId++;
        this.name = name;
    }
}

export default Role;