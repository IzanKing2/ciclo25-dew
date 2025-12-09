// app.js - Archivo principal de la aplicación
// Inicialización y event listeners globales

// ========= VARIABLES GLOBALES =========
let productManager;  // Instancia del gestor de productos
let shoppingCart;    // Instancia del carrito de compras
let currentFilters = {
    search: '',
    category: null,
    minPrice: null,
    maxPrice: null,
    inStockOnly: false,
    featuredOnly: false
};

// ========= INICIALIZACIÓN DE LA TIENDA =========

/**
 * Inicializa la página de la tienda
 * Carga productos y configura event listeners
 */
async function initShopPage() {
    try {
        // Verificar autenticación (opcional para la tienda)
        // protectPage(); // Descomentar si se requiere login para ver la tienda

        // Mostrar loading
        showLoading('Cargando productos...');

        // Mostrar nombre del usuario si está logueado
        displayCurrentUser();

        // Inicializar el ProductManager
        productManager = new ProductManager();

        // Inicializar el carrito
        shoppingCart = new ShoppingCart();

        // Simular carga asíncrona de productos desde "servidor"
        await simulateProductLoad();

        // Cargar carrito desde localStorage
        await shoppingCart.loadFromStorage(productManager);

        // Renderizar categorías en el sidebar de filtros
        renderCategoryFilters();

        // Renderizar productos
        await renderProducts();

        // Actualizar el UI del carrito
        updateCartUI();

        // Configurar todos los event listeners
        setupEventListeners();

        // Ocultar loading
        hideLoading();

        // Mostrar notificación de bienvenida
        showNotification('¡Bienvenido a TechShop!', 'success');

    } catch (error) {
        console.error('Error al inicializar la tienda:', error);
        hideLoading();
        showNotification('Error al cargar la tienda', 'error');
    }
}

/**
 * Simula la carga de productos desde un servidor
 * Usa async/await para demostrar asincronía
 */
async function simulateProductLoad() {
    // Simular delay de red (como si fuera una llamada fetch)
    await delay(1000);

    // Los productos ya están cargados en ProductManager.initializeData()
    // Este delay simula una llamada a API
    console.log('Productos cargados desde el servidor (simulado)');
}

/**
 * Muestra el nombre del usuario actual en la navbar
 */
function displayCurrentUser() {
    const userDisplay = document.getElementById('userDisplay');
    const currentUser = getCurrentUser();

    if (userDisplay && currentUser) {
        userDisplay.innerHTML = `Hola, <strong>${currentUser}</strong>`;
    }
}

// ========= RENDERIZADO DE PRODUCTOS =========

/**
 * Renderiza los productos en el grid aplicando filtros
 */
async function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    const noProducts = document.getElementById('noProducts');

    if (!productsGrid) return;

    // Obtener todos los productos
    let products = productManager.getAllProducts();
    const categories = productManager.getAllCategories();

    // Aplicar filtros
    products = applyFilters(products);

    // Actualizar contador
    if (productsCount) {
        productsCount.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`;
    }

    // Mostrar mensaje si no hay productos
    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noProducts?.classList.remove('hidden');
        return;
    }

    noProducts?.classList.add('hidden');

    // Generar HTML de los productos
    productsGrid.innerHTML = products.map(product => {
        // Obtener nombre de la categoría
        const category = categories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Sin categoría';

        // Determinar estado del stock
        let stockClass = '';
        let stockText = `${product.stock} en stock`;
        if (product.stock === 0) {
            stockClass = 'out';
            stockText = 'Agotado';
        } else if (product.stock < 10) {
            stockClass = 'low';
            stockText = `¡Solo ${product.stock} disponibles!`;
        }

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.featured ? '<span class="product-badge">Destacado</span>' : ''}
                    ${product.stock === 0 ? '<span class="product-badge out-of-stock">Agotado</span>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${categoryName}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div>
                            <span class="product-price">${formatCurrency(product.price)}</span>
                            <p class="product-stock ${stockClass}">${stockText}</p>
                        </div>
                        <button 
                            class="btn-add-cart" 
                            data-product-id="${product.id}"
                            ${product.stock === 0 ? 'disabled' : ''}
                            aria-label="Agregar al carrito"
                        >
                            🛒
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
}

/**
 * Aplica los filtros actuales a la lista de productos
 * @param {Product[]} products - Lista de productos
 * @returns {Product[]} - Lista filtrada
 */
function applyFilters(products) {
    return products.filter(product => {
        // Filtro de búsqueda
        if (currentFilters.search) {
            const searchLower = currentFilters.search.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Filtro de categoría
        if (currentFilters.category !== null) {
            if (product.categoryId !== currentFilters.category) return false;
        }

        // Filtro de precio mínimo
        if (currentFilters.minPrice !== null) {
            if (product.price < currentFilters.minPrice) return false;
        }

        // Filtro de precio máximo
        if (currentFilters.maxPrice !== null) {
            if (product.price > currentFilters.maxPrice) return false;
        }

        // Filtro de stock
        if (currentFilters.inStockOnly) {
            if (product.stock === 0) return false;
        }

        // Filtro de destacados
        if (currentFilters.featuredOnly) {
            if (!product.featured) return false;
        }

        return true;
    });
}

/**
 * Renderiza los filtros de categoría en el sidebar
 */
function renderCategoryFilters() {
    const categoryFilters = document.getElementById('categoryFilters');
    if (!categoryFilters) return;

    const categories = productManager.getAllCategories();

    // Agregar opción "Todas"
    categoryFilters.innerHTML = `
        <label class="category-item active" data-category-id="">
            <input type="radio" name="category" value="" checked>
            <span>Todas las categorías</span>
        </label>
        ${categories.map(category => `
            <label class="category-item" data-category-id="${category.id}">
                <input type="radio" name="category" value="${category.id}">
                <span>${category.name}</span>
            </label>
        `).join('')}
    `;

    // Event listeners para los filtros de categoría
    categoryFilters.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function () {
            // Marcar como activo
            categoryFilters.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Actualizar filtro
            const categoryId = this.dataset.categoryId;
            currentFilters.category = categoryId ? parseInt(categoryId) : null;

            // Re-renderizar productos
            renderProducts();
        });
    });
}

// ========= MANEJO DEL CARRITO =========

/**
 * Maneja el evento de agregar producto al carrito
 * @param {Event} event - Evento del click
 */
async function handleAddToCart(event) {
    const button = event.currentTarget;
    const productId = parseInt(button.dataset.productId);

    // Encontrar el producto
    const product = productManager.getAllProducts().find(p => p.id === productId);
    if (!product) return;

    // Animación del botón
    button.classList.add('adding');
    button.disabled = true;

    // Agregar al carrito (operación asíncrona)
    const result = await shoppingCart.addItem(product, 1);

    // Quitar animación
    setTimeout(() => {
        button.classList.remove('adding');
        button.disabled = product.stock === 0;
    }, 500);

    // Mostrar notificación
    if (result.success) {
        showNotification(result.message, 'success');
        updateCartUI();

        // Abrir carrito si está cerrado (en móvil)
        if (window.innerWidth <= 1200) {
            openCart();
        }
    } else {
        showNotification(result.message, 'error');
    }
}

/**
 * Actualiza toda la UI del carrito
 */
function updateCartUI() {
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}

/**
 * Actualiza el contador del carrito en la navbar
 */
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = shoppingCart.getItemCount();
        cartCount.textContent = count;

        // Animación si hay items
        if (count > 0) {
            cartCount.style.animation = 'none';
            cartCount.offsetHeight; // Trigger reflow
            cartCount.style.animation = 'pulse 0.3s ease';
        }
    }
}

/**
 * Renderiza los items del carrito en el sidebar
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItemsContainer) return;

    const items = shoppingCart.getItems();

    if (items.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart?.classList.remove('hidden');
        cartSummary?.classList.add('hidden');
        return;
    }

    emptyCart?.classList.add('hidden');
    cartSummary?.classList.remove('hidden');

    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-product-id="${item.product.id}">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.product.name}</span>
                <span class="cart-item-price">${formatCurrency(item.getSubtotal())}</span>
                <div class="cart-item-controls">
                    <button class="qty-btn btn-decrease" data-product-id="${item.product.id}">−</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn btn-increase" data-product-id="${item.product.id}">+</button>
                </div>
            </div>
            <button class="btn-remove-item" data-product-id="${item.product.id}" aria-label="Eliminar">🗑️</button>
        </div>
    `).join('');

    // Event listeners para los controles de cantidad
    cartItemsContainer.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', () => handleQuantityChange(parseInt(btn.dataset.productId), -1));
    });

    cartItemsContainer.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', () => handleQuantityChange(parseInt(btn.dataset.productId), 1));
    });

    cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', () => handleRemoveItem(parseInt(btn.dataset.productId)));
    });
}

/**
 * Actualiza el resumen y totales del carrito
 */
function updateCartSummary() {
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');

    const total = shoppingCart.getTotal();

    if (cartSubtotal) {
        cartSubtotal.textContent = formatCurrency(total);
    }

    if (cartTotal) {
        cartTotal.textContent = formatCurrency(total);
    }
}

/**
 * Maneja el cambio de cantidad de un item
 * @param {number} productId - ID del producto
 * @param {number} change - Cambio de cantidad (+1 o -1)
 */
async function handleQuantityChange(productId, change) {
    const item = shoppingCart.getItem(productId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
        await handleRemoveItem(productId);
        return;
    }

    const result = await shoppingCart.updateQuantity(productId, newQuantity);

    if (result.success) {
        updateCartUI();
    } else {
        showNotification(result.message, 'error');
    }
}

/**
 * Maneja la eliminación de un item del carrito
 * @param {number} productId - ID del producto
 */
async function handleRemoveItem(productId) {
    const result = await shoppingCart.removeItem(productId);

    if (result.success) {
        showNotification(result.message, 'info');
        updateCartUI();
    } else {
        showNotification(result.message, 'error');
    }
}

/**
 * Maneja el vaciado completo del carrito
 */
async function handleClearCart() {
    const confirmed = await showConfirmDialog(
        '¿Estás seguro de que deseas vaciar el carrito?',
        'Vaciar Carrito'
    );

    if (confirmed) {
        const result = await shoppingCart.clearCart();
        if (result.success) {
            showNotification(result.message, 'success');
            updateCartUI();
        }
    }
}

/**
 * Maneja el proceso de checkout
 */
async function handleCheckout() {
    if (shoppingCart.isEmpty()) {
        showNotification('El carrito está vacío', 'warning');
        return;
    }

    showLoading('Procesando pedido...');

    const result = await shoppingCart.checkout();

    hideLoading();

    if (result.success) {
        // Mostrar modal de éxito
        const orderDetails = document.getElementById('orderDetails');
        if (orderDetails) {
            orderDetails.innerHTML = `
                <strong>ID del pedido:</strong> ${result.orderDetails.orderId}<br>
                <strong>Total:</strong> ${formatCurrency(result.orderDetails.total)}<br>
                <strong>Artículos:</strong> ${result.orderDetails.items}
            `;
        }

        const checkoutModal = document.getElementById('checkoutModal');
        checkoutModal?.classList.remove('hidden');

        updateCartUI();
        closeCart();
    } else {
        showNotification(result.message, 'error');
    }
}

// ========= CONTROL DEL CARRITO (SIDEBAR) =========

/**
 * Abre el sidebar del carrito
 */
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSidebar?.classList.add('open');
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el sidebar del carrito
 */
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    cartSidebar?.classList.remove('open');
    cartOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

// ========= EVENT LISTENERS =========

/**
 * Configura todos los event listeners de la página
 */
function setupEventListeners() {
    // === Búsqueda con debounce ===
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedSearch = debounce((value) => {
            currentFilters.search = value;
            renderProducts();
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }

    // === Filtros de precio ===
    const applyPriceFilter = document.getElementById('applyPriceFilter');
    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', () => {
            const minPrice = document.getElementById('minPrice')?.value;
            const maxPrice = document.getElementById('maxPrice')?.value;

            currentFilters.minPrice = minPrice ? parseFloat(minPrice) : null;
            currentFilters.maxPrice = maxPrice ? parseFloat(maxPrice) : null;

            renderProducts();
            showNotification('Filtro de precio aplicado', 'info');
        });
    }

    // === Filtro de stock ===
    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly) {
        inStockOnly.addEventListener('change', (e) => {
            currentFilters.inStockOnly = e.target.checked;
            renderProducts();
        });
    }

    // === Filtro de destacados ===
    const featuredOnly = document.getElementById('featuredOnly');
    if (featuredOnly) {
        featuredOnly.addEventListener('change', (e) => {
            currentFilters.featuredOnly = e.target.checked;
            renderProducts();
        });
    }

    // === Limpiar filtros ===
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            // Resetear filtros
            currentFilters = {
                search: '',
                category: null,
                minPrice: null,
                maxPrice: null,
                inStockOnly: false,
                featuredOnly: false
            };

            // Resetear inputs
            if (searchInput) searchInput.value = '';
            document.getElementById('minPrice').value = '';
            document.getElementById('maxPrice').value = '';
            document.getElementById('inStockOnly').checked = false;
            document.getElementById('featuredOnly').checked = false;

            // Resetear categoría
            const categoryFilters = document.getElementById('categoryFilters');
            categoryFilters?.querySelectorAll('.category-item').forEach((item, index) => {
                item.classList.toggle('active', index === 0);
            });

            renderProducts();
            showNotification('Filtros limpiados', 'info');
        });
    }

    // === Resetear búsqueda (desde el mensaje de no productos) ===
    const resetSearch = document.getElementById('resetSearch');
    if (resetSearch) {
        resetSearch.addEventListener('click', () => {
            document.getElementById('clearFilters')?.click();
        });
    }

    // === Toggle del carrito ===
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            const cartSidebar = document.getElementById('cartSidebar');
            if (cartSidebar?.classList.contains('open')) {
                closeCart();
            } else {
                openCart();
            }
        });
    }

    // === Cerrar carrito ===
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    // === Overlay del carrito ===
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // === Vaciar carrito ===
    const btnClearCart = document.getElementById('btnClearCart');
    if (btnClearCart) {
        btnClearCart.addEventListener('click', handleClearCart);
    }

    // === Checkout ===
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', handleCheckout);
    }

    // === Modal de checkout ===
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        // Cerrar modal
        checkoutModal.querySelector('.modal-close')?.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });

        // Continuar comprando
        document.getElementById('btnContinueShopping')?.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
        });

        // Cerrar al hacer clic fuera
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.classList.add('hidden');
            }
        });
    }

    // === Logout ===
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            logout();
        });
    }

    // === Cerrar modales con Escape ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            checkoutModal?.classList.add('hidden');
        }
    });
}

// ========= INICIALIZACIÓN DEL ADMIN =========

/**
 * Inicializa la página de administración
 * Esta función se llama desde admin.html
 */
async function initAdminPage() {
    try {
        // Verificar autenticación
        protectPage();

        // Mostrar loading
        showLoading('Cargando panel de administración...');

        // Mostrar nombre del usuario
        displayCurrentUser();

        // Inicializar ProductManager
        productManager = new ProductManager();

        // Simular carga de datos
        await delay(800);

        // Renderizar dashboard y tabla
        renderAdminDashboard();
        renderProductsTable();

        // Configurar event listeners del admin
        setupAdminEventListeners();

        // Ocultar loading
        hideLoading();

        showNotification('Panel de administración cargado', 'success');

    } catch (error) {
        console.error('Error al inicializar admin:', error);
        hideLoading();
        showNotification('Error al cargar el panel', 'error');
    }
}

/**
 * Protege la página verificando autenticación
 */
function protectPage() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}
