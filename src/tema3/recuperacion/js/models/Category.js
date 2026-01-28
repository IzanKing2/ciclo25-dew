// model/Category.js

/**
 * Clase Categoría - Representa una categoría
 */
class Category {
    #id;
    #name;
    #description;

    constructor(id, name, description = '') {
        this.#id = id;
        this.name = name;
        this.description = description;
    }

    // 📖 GETTERS =============================
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    // ✍️ SETTERS =============================
    set name(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('El nombre de la categoría no puede estar vacío');
        }
        this.#name = value.trim();
    }

    set description(value) {
        this.#description = value;
    }

    // 🎯 MÉTODOS DE NEGOCIO =============================
    /**
     * Convierte el objeto a un formato plano para JSON
     * @returns {Object} - Objeto que representa una Categoría
     */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description
        };
    }

    /**
     * Crea una instancia de Category a partir de un objeto plano
     * @param {Object} data - Objeto con las propiedades de la categoría
     * @returns {Category} - Objeto que representa una categoría
     */
    static fromJSON(data) {
        return new Category(data.id, data.name, data.description);
    }
}


export default Category;