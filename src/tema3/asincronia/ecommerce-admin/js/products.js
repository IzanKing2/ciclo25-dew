// products.js - Gestión de productos con POO

/**
 * Clase que representa una categoría
 */
class Category {
    constructor(id, name, description = '') {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    /**
     * Obtiene la información de la categoría
     * @returns {Object} - Objeto con la información de la categoría
     */
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        }
    }
}


/**
 * Clase que representa un producto
 */
class Product {
    constructor(id, name, description, price, categoryId, stock, image, featured = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = parseFloat(price);
        this.categoryId = categoryId;
        this.stock = parseInt(stock);
        this.image = image;
        this.featured = featured;
        this.createdAt = new Date();
    }

    /**
     * Verifica si el producto tiene stock disponible
     * @param {number} quantity - Cantidad a verificar
     * @returns {boolean} - True si hay stock disponible, false en caso contrario
     */
    hasStock(quantity = 1) {
        return this.stock >= quantity;
    }

    /**
     * Reduce el stock del producto
     * @param {number} quantity - Cantidad a reducir
     * @returns {boolean} - True si se reduce el stock, false en caso contrario
     */
    reduceStock(quantity = 1) {
        if (this.hasStock(quantity)) {
            this.stock -= quantity;
            return true;
        }
        return false;
    }

    /**
     * Aumenta el stock del producto
     * @param {number} quantity - Cantidad a aumentar
     */
    aumentarStock(quantity = 1) {
        this.stock += quantity;
    }

    /**
     * Verifica si el producto está disponible
     * @returns {boolean} - True si el producto está disponible, false en caso contrario
     */
    isAvailable() {
        return this.stock > 0;
    }

    /**
     * Obtiene el valor total del producto
     * @returns {number} - Valor total del producto
     */
    getTotalValue() {
        return this.price * this.stock;
    }

    /**
     * Obtiene información completa del producto
     * @returns {Object} - Objeto con la información del producto
     */
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            categoryId: this.categoryId,
            stock: this.stock,
            image: this.image,
            featured: this.featured,
            available: this.isAvailable(),
            totalValue: this.getTotalValue()
        };
    }
}


/**
 * Clase ProductManager - Gestiona el catálogo de productos
 */
class ProductManager {
    constructor() {
        this.products = []; // Array de productos
        this.categories = []; // Array de categorías
        this.nextProductId = 1;
        this.nextCategoryId = 1;
        this.initializeData();
    }

    /**
     * Inicializa categorías y productos de ejemplo
     */
    initializeData() {
        // Crear categorías
        this.addCategory('Electrónica', 'Dispositivos electrónicos y tecnología');
        this.addCategory('Accesorios', 'Accesorios y periféricos');
        this.addCategory('Almacenamiento', 'Dispositivos de almacenamiento');
        this.addCategory('Oficina', 'Equipos de oficina');

        // Crear productos
        const productsData = [
            {
                name: 'Laptop HP Pavilion',
                description: 'Laptop potente para trabajo y entretenimiento, procesador Intel i5, 8GB RAM, 256GB SSD',
                price: 899.99,
                categoryId: 1,
                stock: 15,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
                featured: true
            },
            {
                name: 'Smartphone Samsung Galaxy',
                description: 'Teléfono inteligente con cámara de alta resolución, pantalla AMOLED de 6.5 pulgadas',
                price: 699.99,
                categoryId: 1,
                stock: 25,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
                featured: true
            },
            {
                name: 'Auriculares Sony WH-1000XM4',
                description: 'Auriculares inalámbricos con cancelación de ruido premium, batería de larga duración',
                price: 349.99,
                categoryId: 2,
                stock: 30,
                image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop',
                featured: false
            },
            {
                name: 'Monitor LG UltraWide 29"',
                description: 'Monitor panorámico Full HD, ideal para multitarea y diseño, 75Hz',
                price: 299.99,
                categoryId: 1,
                stock: 12,
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
                featured: false
            },
            {
                name: 'Teclado Mecánico RGB',
                description: 'Teclado gaming con switches mecánicos, iluminación RGB personalizable',
                price: 129.99,
                categoryId: 2,
                stock: 40,
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
                featured: true
            },
            {
                name: 'Mouse Logitech MX Master 3',
                description: 'Mouse ergonómico inalámbrico de precisión, ideal para profesionales',
                price: 99.99,
                categoryId: 2,
                stock: 50,
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
                featured: false
            },
            {
                name: 'Tablet iPad Air',
                description: 'Tablet de alto rendimiento con chip M1, pantalla Liquid Retina de 10.9 pulgadas',
                price: 599.99,
                categoryId: 1,
                stock: 18,
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
                featured: true
            },
            {
                name: 'Cámara Web Logitech C920',
                description: 'Cámara Full HD 1080p para videollamadas profesionales y streaming',
                price: 79.99,
                categoryId: 2,
                stock: 35,
                image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop',
                featured: false
            },
            {
                name: 'Disco Duro Externo 2TB',
                description: 'Almacenamiento portátil USB 3.0, resistente y compacto',
                price: 79.99,
                categoryId: 3,
                stock: 45,
                image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop',
                featured: false
            },
            {
                name: 'Impresora HP LaserJet',
                description: 'Impresora láser monocromática, rápida y eficiente para oficina',
                price: 199.99,
                categoryId: 4,
                stock: 10,
                image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop',
                featured: false
            }
        ];

        productsData.forEach(data => {
            this.addProduct(data.name, data.description, data.price, data.categoryId,
                data.stock, data.image, data.featured);
        });
    }

    // ============== MÉTODOS PARA CATEGORÍAS =====================
    /**
     * Agrega una nueva categoría al sistema
     * @param {string} name - Nombre de la categoría
     * @param {string} description - Descripción de la categoría
     * @returns {Category} - Categoría agregada
     */
    addCategory(name, description) {
        const id = this.nextCategoryId++;
        const category = new Category(id, name, description);
        this.categories.push(category);
        return category;
    }

    /**
     * Obtiene todas las categorías
     * @returns {Category[]} - Array de categorías
     */
    getAllCategories() {
        return this.categories;
    }

    // ============== MÉTODOS PARA PRODUCTOS =====================
    /**
     * Agrega un nuevo producto al sistema
     * @param {string} name - Nombre del producto
     * @param {string} description - Descripción del producto
     * @param {number} price - Precio del producto
     * @param {number} categoryId - ID de la categoría
     * @param {number} stock - Stock disponible
     * @param {string} image - URL de la imagen
     * @param {boolean} featured - Producto destacado
     * @returns {Product} - Producto agregado
     */
    addProduct(name, description, price, categoryId, stock, image, featured = false) {
        const id = this.nextProductId++;
        const product = new Product(id, name, description, price, categoryId, stock, image, featured);
        this.products.push(product);
        return product;
    }

    /**
     * Obtiene todos los productos
     * @returns {Product[]} - Array de productos
     */
    getAllProducts() {
        return this.products;
    }
}

