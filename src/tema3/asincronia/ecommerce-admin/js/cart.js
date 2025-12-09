// cart.js - Sistema de carrito de compras con POO y asincronía

/**
 * Clase que representa un item individual en el carrito
 * Contiene un producto y la cantidad seleccionada
 */
class CartItem {
    /**
     * Constructor del item del carrito
     * @param {Object} product - Producto a agregar (objeto de la clase Product)
     * @param {number} quantity - Cantidad del producto
     */
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = parseInt(quantity);
        this.addedAt = new Date();
    }

    /**
     * Calcula el subtotal de este item
     * @returns {number} - Precio * cantidad
     */
    getSubtotal() {
        return this.product.price * this.quantity;
    }

    /**
     * Aumenta la cantidad del item
     * @param {number} amount - Cantidad a aumentar
     */
    increaseQuantity(amount = 1) {
        this.quantity += parseInt(amount);
    }

    /**
     * Disminuye la cantidad del item
     * @param {number} amount - Cantidad a disminuir
     * @returns {boolean} - True si la cantidad sigue siendo válida
     */
    decreaseQuantity(amount = 1) {
        this.quantity -= parseInt(amount);
        return this.quantity > 0;
    }

    /**
     * Obtiene información del item para serialización
     * @returns {Object} - Objeto con la información del item
     */
    getInfo() {
        return {
            productId: this.product.id,
            productName: this.product.name,
            productPrice: this.product.price,
            productImage: this.product.image,
            quantity: this.quantity,
            subtotal: this.getSubtotal(),
            addedAt: this.addedAt
        };
    }

    /**
     * Crea un CartItem desde datos serializados
     * @param {Object} data - Datos serializados del item
     * @param {Object} product - Producto correspondiente
     * @returns {CartItem} - Nueva instancia de CartItem
     */
    static fromData(data, product) {
        const item = new CartItem(product, data.quantity);
        item.addedAt = new Date(data.addedAt);
        return item;
    }
}

/**
 * Clase que gestiona el carrito de compras completo
 * Incluye métodos asíncronos para simular operaciones de red
 */
class ShoppingCart {
    // Clave para localStorage
    static CART_KEY = 'shopping_cart';
    // Delay simulado para operaciones de red (en ms)
    static NETWORK_DELAY = 500;

    constructor() {
        this.items = [];
        this.isLoading = false;
    }

    /**
     * Simula un delay de red usando Promises
     * @param {number} ms - Milisegundos de delay
     * @returns {Promise} - Promesa que se resuelve después del delay
     */
    async simulateNetworkDelay(ms = ShoppingCart.NETWORK_DELAY) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Carga el carrito desde localStorage de forma asíncrona
     * @param {ProductManager} productManager - Instancia del gestor de productos
     * @returns {Promise<boolean>} - True si se cargó correctamente
     */
    async loadFromStorage(productManager) {
        try {
            this.isLoading = true;

            // Simular delay de carga
            await this.simulateNetworkDelay(300);

            const savedCart = localStorage.getItem(ShoppingCart.CART_KEY);

            if (savedCart) {
                const cartData = JSON.parse(savedCart);
                this.items = [];

                // Reconstruir los items del carrito
                for (const itemData of cartData) {
                    // Buscar el producto en el ProductManager
                    const product = productManager.getAllProducts()
                        .find(p => p.id === itemData.productId);

                    if (product) {
                        const cartItem = CartItem.fromData(itemData, product);
                        this.items.push(cartItem);
                    }
                }
            }

            this.isLoading = false;
            return true;
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            this.isLoading = false;
            return false;
        }
    }

    /**
     * Guarda el carrito en localStorage
     */
    saveToStorage() {
        try {
            const cartData = this.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                addedAt: item.addedAt.toISOString()
            }));
            localStorage.setItem(ShoppingCart.CART_KEY, JSON.stringify(cartData));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    }

    /**
     * Agrega un producto al carrito de forma asíncrona
     * @param {Object} product - Producto a agregar
     * @param {number} quantity - Cantidad a agregar
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async addItem(product, quantity = 1) {
        try {
            this.isLoading = true;

            // Simular delay de red
            await this.simulateNetworkDelay();

            // Verificar si el producto ya está en el carrito
            const existingItem = this.items.find(item => item.product.id === product.id);

            if (existingItem) {
                // Verificar stock disponible
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > product.stock) {
                    this.isLoading = false;
                    return {
                        success: false,
                        message: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`
                    };
                }
                existingItem.increaseQuantity(quantity);
            } else {
                // Verificar stock para nuevo item
                if (quantity > product.stock) {
                    this.isLoading = false;
                    return {
                        success: false,
                        message: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`
                    };
                }
                const newItem = new CartItem(product, quantity);
                this.items.push(newItem);
            }

            // Guardar en localStorage
            this.saveToStorage();

            this.isLoading = false;
            return {
                success: true,
                message: `${product.name} agregado al carrito`
            };
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            this.isLoading = false;
            return {
                success: false,
                message: 'Error al agregar el producto al carrito'
            };
        }
    }

    /**
     * Elimina un producto del carrito de forma asíncrona
     * @param {number} productId - ID del producto a eliminar
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async removeItem(productId) {
        try {
            this.isLoading = true;

            // Simular delay de red
            await this.simulateNetworkDelay();

            const index = this.items.findIndex(item => item.product.id === productId);

            if (index === -1) {
                this.isLoading = false;
                return {
                    success: false,
                    message: 'Producto no encontrado en el carrito'
                };
            }

            const removedItem = this.items.splice(index, 1)[0];

            // Guardar en localStorage
            this.saveToStorage();

            this.isLoading = false;
            return {
                success: true,
                message: `${removedItem.product.name} eliminado del carrito`
            };
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            this.isLoading = false;
            return {
                success: false,
                message: 'Error al eliminar el producto del carrito'
            };
        }
    }

    /**
     * Actualiza la cantidad de un producto de forma asíncrona
     * @param {number} productId - ID del producto
     * @param {number} newQuantity - Nueva cantidad
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async updateQuantity(productId, newQuantity) {
        try {
            this.isLoading = true;

            // Simular delay de red
            await this.simulateNetworkDelay(300);

            const item = this.items.find(item => item.product.id === productId);

            if (!item) {
                this.isLoading = false;
                return {
                    success: false,
                    message: 'Producto no encontrado en el carrito'
                };
            }

            // Validar cantidad
            if (newQuantity <= 0) {
                // Si la cantidad es 0 o menos, eliminar el item
                return await this.removeItem(productId);
            }

            // Verificar stock
            if (newQuantity > item.product.stock) {
                this.isLoading = false;
                return {
                    success: false,
                    message: `Stock insuficiente. Solo hay ${item.product.stock} unidades disponibles.`
                };
            }

            item.quantity = parseInt(newQuantity);

            // Guardar en localStorage
            this.saveToStorage();

            this.isLoading = false;
            return {
                success: true,
                message: 'Cantidad actualizada'
            };
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            this.isLoading = false;
            return {
                success: false,
                message: 'Error al actualizar la cantidad'
            };
        }
    }

    /**
     * Vacía el carrito completamente de forma asíncrona
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async clearCart() {
        try {
            this.isLoading = true;

            // Simular delay de red
            await this.simulateNetworkDelay();

            this.items = [];

            // Eliminar de localStorage
            localStorage.removeItem(ShoppingCart.CART_KEY);

            this.isLoading = false;
            return {
                success: true,
                message: 'Carrito vaciado correctamente'
            };
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            this.isLoading = false;
            return {
                success: false,
                message: 'Error al vaciar el carrito'
            };
        }
    }

    /**
     * Obtiene el total del carrito
     * @returns {number} - Total del carrito
     */
    getTotal() {
        return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
    }

    /**
     * Obtiene el número total de items en el carrito
     * @returns {number} - Cantidad total de items
     */
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    /**
     * Obtiene todos los items del carrito
     * @returns {CartItem[]} - Array de items
     */
    getItems() {
        return this.items;
    }

    /**
     * Verifica si el carrito está vacío
     * @returns {boolean} - True si el carrito está vacío
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Obtiene un item específico por ID de producto
     * @param {number} productId - ID del producto
     * @returns {CartItem|undefined} - Item encontrado o undefined
     */
    getItem(productId) {
        return this.items.find(item => item.product.id === productId);
    }

    /**
     * Simula el proceso de checkout de forma asíncrona
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async checkout() {
        try {
            this.isLoading = true;

            // Simular proceso de checkout (valdría para conectar con backend)
            await this.simulateNetworkDelay(1500);

            // Verificar que hay items
            if (this.isEmpty()) {
                this.isLoading = false;
                return {
                    success: false,
                    message: 'El carrito está vacío'
                };
            }

            // Simular éxito del pedido
            const orderTotal = this.getTotal();
            const itemCount = this.getItemCount();

            // Vaciar el carrito después del checkout exitoso
            await this.clearCart();

            this.isLoading = false;
            return {
                success: true,
                message: '¡Pedido realizado con éxito!',
                orderDetails: {
                    total: orderTotal,
                    items: itemCount,
                    orderId: 'ORD-' + Date.now()
                }
            };
        } catch (error) {
            console.error('Error en el checkout:', error);
            this.isLoading = false;
            return {
                success: false,
                message: 'Error al procesar el pedido'
            };
        }
    }

    /**
     * Obtiene un resumen del carrito para mostrar
     * @returns {Object} - Resumen del carrito
     */
    getSummary() {
        return {
            items: this.items.map(item => item.getInfo()),
            itemCount: this.getItemCount(),
            total: this.getTotal(),
            isEmpty: this.isEmpty()
        };
    }
}
