import { isAuthenticated } from "./auth.js";
import { categories, products as initialProducts } from "./data.js";
import { saveCart, getCart, saveProducts, getProducts } from "./storage.js";
import Cart from "./models/Cart.js";

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const productCont = document.querySelector('#productCont');
const btnCategories = document.querySelectorAll(".btn-cat");
const mainTitle = document.querySelector('#mainTitle');
const cartNumIndicator = document.querySelector('.num');
let btnAdd = document.querySelectorAll('.product-add');

// Array de productos (cargados desde localStorage o datos iniciales)
let products = [];

// Instancia del carrito usando el modelo Cart
let cart = new Cart();

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
function main() {
    checkAuth();
    loadProductsData();
    loadCart();
    loadProducts(products);
    updateCartIndicator();
}

/**
 * Carga los productos desde localStorage o usa los datos iniciales
 */
function loadProductsData() {
    const savedProducts = getProducts();
    
    if (savedProducts && savedProducts.length > 0) {
        products = savedProducts;
    } else {
        products = [...initialProducts];
        saveProducts(products);
    }
}

/**
 * Carga el carrito desde localStorage usando el modelo Cart
 */
function loadCart() {
    cart = getCart();
}

// ==========================================================================
// PRODUCTOS
// ==========================================================================
/**
 * Función asíncrona para cargar los productos dinámicamente
 * y usando filtros para la página.
 * 
 * @param {Array} selectProducts 
 */
async function loadProducts(selectProducts) {
    productCont.innerHTML = '<p>Cargando productos...</p>';

    try {
        // Simula una petición asíncrona al servidor
        await new Promise(resolve => setTimeout(resolve, 500));

        productCont.innerHTML = '';

        if (selectProducts.length === 0) {
            productCont.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        selectProducts.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
                <img class="product-img" src="${product.image_url}" alt="${product.title}">
                <div class="product-details">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${product.price}€</p>
                    <button class="product-add" id="${product.id}"><i class="bi bi-cart-plus-fill"></i> Agregar</button>
                </div>
            `;
            productCont.append(div);
        });

        updateBtnAdd(); // Se actualiza la selección de botones
    } catch (error) {
        console.log("Error cargando productos:", error);
        productCont.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}

/**
 * Añadir evento click a todos los botones para poder
 * filtrar y moverse por el menú de navegación.
 */
btnCategories.forEach(btn => {
    btn.addEventListener("click", async (e) => {

        btnCategories.forEach(btn => btn.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != 'todos') {
            const productCat = products.find(product => product.category_id == e.currentTarget.id);
            const category = categories.find(cat => cat.id === productCat.category_id);
            mainTitle.innerText = category.name;
            const selectProducts = products.filter(product => product.category_id == e.currentTarget.id);
            await loadProducts(selectProducts);
        } else {
            mainTitle.innerText = 'Todos los productos';
            await loadProducts(products);
        }
    });
});


/**
 * Función para seleccionar los botones de añadir.
 */
function updateBtnAdd() {
    btnAdd = document.querySelectorAll('.product-add');

    btnAdd.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

/**
 * Añade un producto al carrito usando el modelo Cart
 * Si el producto ya existe, incrementa la cantidad
 * Si no existe, lo añade con cantidad 1
 */
async function addToCart(e) {
    const idBtn = e.currentTarget.id;
    const addProduct = products.find(product => product.id == idBtn);
    
    if (!addProduct) {
        alert('Producto no encontrado');
        return;
    }
    
    try {
        // Simula una petición asíncrona
        const btn = e.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Añadido';
        btn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Usa el método del modelo Cart para añadir el producto
        cart.addProduct(addProduct);
        
        // Guarda el carrito en localStorage
        saveCart(cart);
        
        // Actualiza el indicador del carrito
        updateCartIndicator();
        
        console.log('Carrito actualizado:', cart.getSummary());
        
        // Restaura el botón después de un momento
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1000);
        
    } catch (error) {
        console.error('Error añadiendo al carrito:', error);
        alert('Error al añadir el producto al carrito');
    }
}

/**
 * Actualiza el indicador numérico del carrito en la UI
 */
function updateCartIndicator() {
    const totalItems = cart.getTotalItems();
    
    if (cartNumIndicator) {
        cartNumIndicator.textContent = totalItems;
    }
}

/**
 * Verifica la autenticación del usuario
 */
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// ==========================================================================
// INICIAR LA APLICACIÓN
// ==========================================================================
main();