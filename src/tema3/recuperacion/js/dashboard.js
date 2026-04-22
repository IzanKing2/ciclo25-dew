import { isAuthenticated, getCurrentUser } from "./auth.js";
import { products as initialProducts, categories } from "./data.js";
import { saveProducts, getProducts } from "./storage.js";
import Product from "./models/Product.js";

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const productsContainer = document.querySelector('.cart-products');
const emptyMessage = document.querySelector('.empty-cart');
const createProductBtn = document.querySelector('.admin-create-product');

// Array de productos (cargados desde localStorage o datos iniciales)
let products = [];

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
function init() {
    checkAuth();
    loadProducts();
    renderProducts();
    setupEventListeners();
}

// ==========================================================================
// AUTENTICACIÓN Y AUTORIZACIÓN
// ==========================================================================
function checkAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

// ==========================================================================
// GESTIÓN DE PRODUCTOS
// ==========================================================================

/**
 * Carga los productos desde localStorage o usa los datos iniciales
 */
function loadProducts() {
    const savedProducts = getProducts();
    
    if (savedProducts && savedProducts.length > 0) {
        products = savedProducts;
    } else {
        products = [...initialProducts];
        saveProducts(products);
    }
}

/**
 * Renderiza todos los productos en el dashboard
 */
async function renderProducts() {
    productsContainer.innerHTML = '<p style="color: var(--clr-main);">Cargando productos...</p>';
    
    try {
        // Simula carga asíncrona
        await new Promise(resolve => setTimeout(resolve, 500));
        
        productsContainer.innerHTML = '';
        
        if (products.length === 0) {
            showEmptyMessage();
            return;
        }
        
        hideEmptyMessage();
        
        products.forEach((product, index) => {
            const productElement = createProductElement(product, index);
            productsContainer.appendChild(productElement);
        });
        
    } catch (error) {
        console.error('Error renderizando productos:', error);
        productsContainer.innerHTML = '<p style="color: red;">Error al cargar productos</p>';
    }
}

/**
 * Crea el elemento HTML para un producto en el dashboard
 */
function createProductElement(product, index) {
    const div = document.createElement('div');
    div.classList.add('cart-product');
    
    const category = categories.find(cat => cat.id === product.category_id);
    const categoryName = category ? category.name : 'Sin categoría';
    
    div.innerHTML = `
        <img class="cart-product-img" src="${product.image_url}" alt="${product.title}">
        <div class="cart-product-title">
            <small>Título</small>
            <h3>${product.title}</h3>
        </div>
        <div class="cart-product-quantity">
            <small>Categoría</small>
            <p>${categoryName}</p>
        </div>
        <div class="cart-product-price">
            <small>Precio</small>
            <p>${product.price}€</p>
        </div>
        <div class="product-actions">
            <button class="cart-product-delete" data-action="edit" data-index="${index}">
                <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="cart-product-delete" data-action="delete" data-index="${index}">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    `;
    
    // Event listeners para los botones
    const editBtn = div.querySelector('[data-action="edit"]');
    const deleteBtn = div.querySelector('[data-action="delete"]');
    
    editBtn.addEventListener('click', () => editProduct(index));
    deleteBtn.addEventListener('click', () => deleteProduct(index));
    
    return div;
}

// ==========================================================================
// OPERACIONES CRUD
// ==========================================================================

/**
 * CREATE - Crea un nuevo producto
 */
async function createProduct() {
    const modal = showProductModal();
    
    const form = modal.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const title = formData.get('title');
        const price = parseFloat(formData.get('price'));
        const categoryId = parseInt(formData.get('category'));
        const imageUrl = formData.get('image_url');
        
        // Validaciones básicas
        if (!title || !price || !categoryId) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        try {
            // Simula la creación asíncrona
            modal.querySelector('.modal-btn-save').textContent = 'Creando...';
            modal.querySelector('.modal-btn-save').disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Crea el nuevo producto
            const newProduct = new Product(title, imageUrl, categoryId, price);
            products.push(newProduct);
            
            // Guarda en localStorage
            saveProducts(products);
            
            // Cierra el modal
            closeModal(modal);
            
            // Re-renderiza
            await renderProducts();
            
            alert('Producto creado con éxito');
            
        } catch (error) {
            console.error('Error creando producto:', error);
            alert('Error al crear el producto');
            modal.querySelector('.modal-btn-save').textContent = 'Guardar';
            modal.querySelector('.modal-btn-save').disabled = false;
        }
    });
}

/**
 * READ - Ya está implementado en renderProducts()
 */

/**
 * UPDATE - Edita un producto existente
 */
async function editProduct(index) {
    const product = products[index];
    
    const modal = showProductModal(product);
    
    const form = modal.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const title = formData.get('title');
        const price = parseFloat(formData.get('price'));
        const categoryId = parseInt(formData.get('category'));
        const imageUrl = formData.get('image_url');
        
        if (!title || !price || !categoryId) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        try {
            // Simula la actualización asíncrona
            modal.querySelector('.modal-btn-save').textContent = 'Actualizando...';
            modal.querySelector('.modal-btn-save').disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Actualiza el producto
            products[index].title = title;
            products[index].price = price;
            products[index].category_id = categoryId;
            products[index].image_url = imageUrl;
            
            // Guarda en localStorage
            saveProducts(products);
            
            // Cierra el modal
            closeModal(modal);
            
            // Re-renderiza
            await renderProducts();
            
            alert('Producto actualizado con éxito');
            
        } catch (error) {
            console.error('Error actualizando producto:', error);
            alert('Error al actualizar el producto');
            modal.querySelector('.modal-btn-save').textContent = 'Guardar';
            modal.querySelector('.modal-btn-save').disabled = false;
        }
    });
}

/**
 * DELETE - Elimina un producto
 */
async function deleteProduct(index) {
    const product = products[index];
    
    const confirmDelete = confirm(`¿Estás seguro de eliminar "${product.title}"?`);
    
    if (!confirmDelete) return;
    
    try {
        // Simula la eliminación asíncrona
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Elimina el producto
        products.splice(index, 1);
        
        // Guarda en localStorage
        saveProducts(products);
        
        // Re-renderiza
        await renderProducts();
        
        alert('Producto eliminado con éxito');
        
    } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar el producto');
    }
}

// ==========================================================================
// MODAL DE FORMULARIO
// ==========================================================================

/**
 * Muestra un modal con el formulario de producto
 * @param {Object} product - Producto a editar (null para crear nuevo)
 * @returns {HTMLElement} - Elemento del modal
 */
function showProductModal(product = null) {
    const isEdit = product !== null;
    
    // Crea el modal
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${isEdit ? 'Editar' : 'Crear'} Producto</h2>
                <button class="modal-close">&times;</button>
            </div>
            <form class="modal-form">
                <div class="form-group">
                    <label for="title">Título *</label>
                    <input type="text" id="title" name="title" value="${isEdit ? product.title : ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="price">Precio (€) *</label>
                    <input type="number" id="price" name="price" step="0.01" min="0" value="${isEdit ? product.price : ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="category">Categoría *</label>
                    <select id="category" name="category" required>
                        <option value="">Selecciona una categoría</option>
                        ${categories.map(cat => `
                            <option value="${cat.id}" ${isEdit && product.category_id === cat.id ? 'selected' : ''}>
                                ${cat.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="image_url">URL de la imagen</label>
                    <input type="text" id="image_url" name="image_url" value="${isEdit && product.image_url ? product.image_url : ''}">
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="modal-btn-cancel">Cancelar</button>
                    <button type="submit" class="modal-btn-save">Guardar</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners del modal
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-btn-cancel');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    cancelBtn.addEventListener('click', () => closeModal(modal));
    
    // Cerrar al hacer click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    return modal;
}

/**
 * Cierra y elimina el modal
 */
function closeModal(modal) {
    modal.remove();
}

// ==========================================================================
// UTILIDADES
// ==========================================================================

function showEmptyMessage() {
    emptyMessage.style.display = 'block';
    emptyMessage.textContent = 'No hay productos disponibles.';
}

function hideEmptyMessage() {
    emptyMessage.style.display = 'none';
}

function setupEventListeners() {
    if (createProductBtn) {
        createProductBtn.addEventListener('click', createProduct);
    }
}

// ==========================================================================
// INICIAR LA APLICACIÓN
// ==========================================================================
init();