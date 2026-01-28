class Rol {
    static count = 0;

    constructor(name, description) {
        this.id = Rol.count++;
        this.name = name;
        this.description = description;
    }

    /**
     * 
     * @returns {Array[Rol]} - 
     */
    createRols() {
        return [
            new Rol('Admin', 'Administrador'),
            new Rol('User', 'Usuario')
        ]
    }
}