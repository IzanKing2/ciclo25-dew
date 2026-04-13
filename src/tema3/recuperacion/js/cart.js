import { isAuthenticated } from "./auth.js";
import { saveCart, getCart, clearCart } from "./storage.js";
import Cart from "./models/Cart.js";

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const cartProductsContainer = document.querySelector('.cart-products');
const emptyCartMessage = document.querySelector('.empty-cart');
const cartActionsContainer = document.querySelector('.cart-actions');
const emptyCartBtn = document.querySelector('.cart-empty-action');
const buyCartBtn = document.querySelector('.cart-buy-action');
const totalElement = document.querySelector('#total');

// Instancia del carrito usando el modelo Cart
let cart = new Cart();

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
function init() {
    checkAuth();
    loadCartFromStorage();
    renderCart();
    setupEventListeners();
}

// ==========================================================================
// AUTENTICACIÓN
// ==========================================================================
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// ==========================================================================
// GESTIÓN DEL CARRITO
// ==========================================================================

/**
 * Carga el carrito desde localStorage
 */
function loadCartFromStorage() {
    cart = getCart();
    updateCartIndicator();
}

/**
 * Renderiza todos los productos del carrito en el DOM
 * Utiliza async/await para simular la carga de datos
 */
async function renderCart() {
    // Muestra mensaje de carga
    cartProductsContainer.innerHTML = '<p style="color: var(--clr-main);">Cargando carrito...</p>';
    
    try {
        // Simula una petición asíncrona al servidor
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Limpia el contenedor
        cartProductsContainer.innerHTML = '';
        
        if (cart.isEmpty()) {
            showEmptyCart();
            return;
        }
        
        showCartWithProducts();
        
        // Renderiza cada item del carrito
        const items = cart.getItems();
        items.forEach((item, index) => {
            const cartProductDiv = createCartProductElement(item, index);
            cartProductsContainer.appendChild(cartProductDiv);
        });
        
        updateTotal();
        
    } catch (error) {
        console.error('Error renderizando el carrito:', error);
        cartProductsContainer.innerHTML = '<p style="color: red;">Error al cargar el carrito</p>';
    }
}

/**
 * Crea el elemento HTML para un item del carrito
 * @param {CartItem} item - Item del carrito
 * @param {Number} index - Índice del item en el array
 * @returns {HTMLElement} - Elemento div con el producto
 */
function createCartProductElement(item, index) {
    const div = document.createElement('div');
    div.classList.add('cart-product');
    
    const subtotal = item.getSubtotal().toFixed(2);
    
    div.innerHTML = `
        <img class="cart-product-img" src="${item.image_url}" alt="${item.title}">
        <div class="cart-product-title">
            <small>Título</small>
            <h3>${item.title}</h3>
        </div>
        <div class="cart-product-quantity">
            <small>Cantidad</small>
            <p>${item.quantity}</p>
        </div>
        <div class="cart-product-price">
            <small>Precio</small>
            <p>${item.price}€</p>
        </div>
        <div class="cart-product-subtotal">
            <small>Subtotal</small>
            <p>${subtotal}€</p>
        </div>
        <button class="cart-product-delete" data-index="${index}">
            <i class="bi bi-trash-fill"></i>
        </button>
    `;
    
    // Añade el evento de eliminar al botón
    const deleteBtn = div.querySelector('.cart-product-delete');
    deleteBtn.addEventListener('click', () => removeFromCart(index));
    
    return div;
}

/**
 * Elimina un item del carrito
 * @param {Number} index - Índice del item a eliminar
 */
async function removeFromCart(index) {
    // Confirmación antes de eliminar
    const confirmDelete = confirm('¿Estás seguro de eliminar este producto del carrito?');
    
    if (!confirmDelete) return;
    
    try {
        // Simula una petición asíncrona
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Elimina el item usando el método del modelo
        cart.removeItem(index);
        
        // Guarda en localStorage
        saveCart(cart);
        
        // Actualiza el indicador
        updateCartIndicator();
        
        // Re-renderiza el carrito
        await renderCart();
        
    } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar el producto');
    }
}

/**
 * Vacía completamente el carrito
 */
async function emptyCart() {
    const confirmEmpty = confirm('¿Estás seguro de vaciar todo el carrito?');
    
    if (!confirmEmpty) return;
    
    try {
        // Simula una petición asíncrona
        await new Promise(resolve => setTimeout(resolve, 300));
        
        cart.clear();
        clearCart();
        updateCartIndicator();
        await renderCart();
        
    } catch (error) {
        console.error('Error vaciando el carrito:', error);
        alert('Error al vaciar el carrito');
    }
}

/**
 * Simula la compra de los productos
 */
async function buyCart() {
    if (cart.isEmpty()) {
        alert('El carrito está vacío');
        return;
    }
    
    // Simula el proceso de compra
    const buyBtn = document.querySelector('.cart-buy-action');
    buyBtn.disabled = true;
    buyBtn.textContent = 'PROCESANDO...';
    
    try {
        // Simula una petición al servidor
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const summary = cart.getSummary();
        alert(`¡Compra realizada con éxito!\nProductos: ${summary.productCount}\nTotal: ${summary.totalFormatted}€`);
        
        // Vacía el carrito después de la compra
        cart.clear();
        clearCart();
        updateCartIndicator();
        await renderCart();
        
    } catch (error) {
        console.error('Error procesando la compra:', error);
        alert('Error al procesar la compra');
    } finally {
        buyBtn.disabled = false;
        buyBtn.textContent = 'COMPRAR AHORA';
    }
}

// ==========================================================================
// UTILIDADES
// ==========================================================================

/**
 * Actualiza el total en el DOM
 */
function updateTotal() {
    totalElement.textContent = `${cart.getTotalFormatted()}€`;
}

/**
 * Actualiza el indicador numérico del carrito
 */
function updateCartIndicator() {
    const totalItems = cart.getTotalItems();
    
    // Actualiza todos los indicadores de la página
    const indicators = document.querySelectorAll('.num');
    indicators.forEach(indicator => {
        indicator.textContent = totalItems;
    });
}

/**
 * Muestra el mensaje de carrito vacío
 */
function showEmptyCart() {
    emptyCartMessage.style.display = 'block';
    cartActionsContainer.style.display = 'none';
}

/**
 * Muestra el carrito con productos
 */
function showCartWithProducts() {
    emptyCartMessage.style.display = 'none';
    cartActionsContainer.style.display = 'flex';
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', emptyCart);
    }
    
    if (buyCartBtn) {
        buyCartBtn.addEventListener('click', buyCart);
    }
}

// ==========================================================================
// INICIAR LA APLICACIÓN
// ==========================================================================
init();