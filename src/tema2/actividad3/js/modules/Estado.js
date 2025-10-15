class Estado {
    
    static count = 1; // Contador estático para asignar IDs únicos

    constructor(nombre) {
        this.id = Estado.count++;
        this.nombre = nombre;
    }

    /**
     *  Lista de estados predefinidos
     * @returns {Estado[]}
     */
    static estados() {
        return [
            new Estado("Pendiente"),
            new Estado("En progreso"),
            new Estado("Completado")
        ];
    }
}


export default Estado;