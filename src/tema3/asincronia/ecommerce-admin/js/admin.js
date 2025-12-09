// admin.js - Lógica del panel de administración
// CRUD SIMULADO - Las operaciones no modifican los datos reales

// ========= VARIABLES GLOBALES =========
let productManager;  // Instancia del gestor de productos
let currentProductId = null;  // ID del producto actual (para edición/eliminación)
let adminFilters = {
    search: '',
    category: null
};

// ========= INICIALIZACIÓN =========

/**
 * Inicializa la página de administración
 */
async function initAdminPage() {
    try {
        // Verificar autenticación
        if (!isAuthenticated()) {
            window.location.href = 'index.html';
            return;
        }

        // Mostrar loading
        showLoading('Cargando panel de administración...');

        // Mostrar nombre del usuario
        const userDisplay = document.getElementById('userDisplay');
        const currentUser = getCurrentUser();
        if (userDisplay && currentUser) {
            userDisplay.innerHTML = `Hola, <strong>${currentUser}</strong>`;
        }

        // Inicializar ProductManager
        productManager = new ProductManager();

        // Simular carga de datos desde el "servidor"
        await simulateDataLoad();

        // Renderizar dashboard
        renderDashboard();

        // Renderizar tabla de productos
        renderProductsTable();

        // Llenar selects de categorías
        populateCategorySelects();

        // Configurar event listeners
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
 * Simula la carga de datos desde un servidor
 */
async function simulateDataLoad() {
    await delay(800);
    console.log('Datos del admin cargados (simulado)');
}

// ========= DASHBOARD =========

/**
 * Renderiza las estadísticas del dashboard
 */
function renderDashboard() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    const products = productManager.getAllProducts();
    const categories = productManager.getAllCategories();

    // Calcular estadísticas
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const outOfStockCount = products.filter(p => p.stock === 0).length;
    const featuredCount = products.filter(p => p.featured).length;
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;

    statsGrid.innerHTML = `
        <div class="stat-card primary">
            <span class="stat-icon">📦</span>
            <span class="stat-value">${totalProducts}</span>
            <span class="stat-label">Total Productos</span>
        </div>
        <div class="stat-card success">
            <span class="stat-icon">📊</span>
            <span class="stat-value">${totalStock}</span>
            <span class="stat-label">Unidades en Stock</span>
        </div>
        <div class="stat-card primary">
            <span class="stat-icon">💰</span>
            <span class="stat-value">${formatCurrency(totalValue)}</span>
            <span class="stat-label">Valor del Inventario</span>
        </div>
        <div class="stat-card warning">
            <span class="stat-icon">⚠️</span>
            <span class="stat-value">${lowStockCount}</span>
            <span class="stat-label">Stock Bajo (&lt;10)</span>
        </div>
        <div class="stat-card danger">
            <span class="stat-icon">❌</span>
            <span class="stat-value">${outOfStockCount}</span>
            <span class="stat-label">Sin Stock</span>
        </div>
        <div class="stat-card success">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">${featuredCount}</span>
            <span class="stat-label">Productos Destacados</span>
        </div>
    `;
}

// ========= TABLA DE PRODUCTOS =========

/**
 * Renderiza la tabla de productos
 */
function renderProductsTable() {
    const tableBody = document.getElementById('productsTableBody');
    const noProducts = document.getElementById('noProducts');
    if (!tableBody) return;

    let products = productManager.getAllProducts();
    const categories = productManager.getAllCategories();

    // Aplicar filtros
    products = applyAdminFilters(products);

    // Mostrar mensaje si no hay productos
    if (products.length === 0) {
        tableBody.innerHTML = '';
        noProducts?.classList.remove('hidden');
        return;
    }

    noProducts?.classList.add('hidden');

    // Generar filas de la tabla
    tableBody.innerHTML = products.map(product => {
        const category = categories.find(c => c.id === product.categoryId);
        const categoryName = category ? category.name : 'Sin categoría';

        // Determinar clase de stock
        let stockClass = 'in-stock';
        if (product.stock === 0) {
            stockClass = 'out-of-stock';
        } else if (product.stock < 10) {
            stockClass = 'low-stock';
        }

        return `
            <tr data-product-id="${product.id}">
                <td>#${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" class="table-product-image">
                </td>
                <td>
                    <span class="table-product-name">${product.name}</span>
                    <p class="table-product-desc">${product.description}</p>
                </td>
                <td>${categoryName}</td>
                <td class="table-price">${formatCurrency(product.price)}</td>
                <td class="table-stock ${stockClass}">${product.stock}</td>
                <td>
                    <span class="badge ${product.featured ? 'badge-success' : 'badge-secondary'}">
                        ${product.featured ? 'Sí' : 'No'}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon btn-edit" data-product-id="${product.id}" title="Editar">
                            ✏️
                        </button>
                        <button class="btn-icon btn-delete" data-product-id="${product.id}" title="Eliminar">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Agregar event listeners a los botones
    tableBody.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.productId)));
    });

    tableBody.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => openDeleteModal(parseInt(btn.dataset.productId)));
    });
}

/**
 * Aplica los filtros de administración
 * @param {Product[]} products - Lista de productos
 * @returns {Product[]} - Lista filtrada
 */
function applyAdminFilters(products) {
    return products.filter(product => {
        // Filtro de búsqueda
        if (adminFilters.search) {
            const searchLower = adminFilters.search.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Filtro de categoría
        if (adminFilters.category !== null) {
            if (product.categoryId !== adminFilters.category) return false;
        }

        return true;
    });
}

/**
 * Llena los selects de categorías
 */
function populateCategorySelects() {
    const categories = productManager.getAllCategories();

    // Select del filtro
    const filterCategory = document.getElementById('filterCategory');
    if (filterCategory) {
        filterCategory.innerHTML = `
            <option value="">Todas las categorías</option>
            ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        `;
    }

    // Select del formulario
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        productCategory.innerHTML = `
            <option value="">Seleccionar categoría</option>
            ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        `;
    }
}

// ========= MODALES CRUD (SIMULADOS) =========

/**
 * Abre el modal para agregar un nuevo producto
 */
function openAddModal() {
    currentProductId = null;

    // Cambiar título del modal
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.textContent = '➕ Agregar Producto';

    // Limpiar formulario
    document.getElementById('productForm')?.reset();

    // Mostrar modal
    const productModal = document.getElementById('productModal');
    productModal?.classList.remove('hidden');
}

/**
 * Abre el modal para editar un producto existente
 * @param {number} productId - ID del producto a editar
 */
function openEditModal(productId) {
    const product = productManager.getAllProducts().find(p => p.id === productId);
    if (!product) return;

    currentProductId = productId;

    // Cambiar título del modal
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) modalTitle.textContent = '✏️ Editar Producto';

    // Llenar formulario con datos del producto
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productCategory').value = product.categoryId;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productFeatured').checked = product.featured;

    // Mostrar modal
    const productModal = document.getElementById('productModal');
    productModal?.classList.remove('hidden');
}

/**
 * Cierra el modal de producto
 */
function closeProductModal() {
    const productModal = document.getElementById('productModal');
    productModal?.classList.add('hidden');
    currentProductId = null;
}

/**
 * Abre el modal de confirmación de eliminación
 * @param {number} productId - ID del producto a eliminar
 */
function openDeleteModal(productId) {
    const product = productManager.getAllProducts().find(p => p.id === productId);
    if (!product) return;

    currentProductId = productId;

    // Mostrar nombre del producto
    const deleteProductName = document.getElementById('deleteProductName');
    if (deleteProductName) {
        deleteProductName.textContent = product.name;
    }

    // Mostrar modal
    const deleteModal = document.getElementById('deleteModal');
    deleteModal?.classList.remove('hidden');
}

/**
 * Cierra el modal de eliminación
 */
function closeDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal?.classList.add('hidden');
    currentProductId = null;
}

/**
 * Maneja el envío del formulario de producto (SIMULADO)
 * @param {Event} event - Evento del submit
 */
async function handleProductSubmit(event) {
    event.preventDefault();

    // Mostrar loading
    showLoading('Guardando producto...');

    // Simular delay de guardado
    await delay(1000);

    // Ocultar loading
    hideLoading();

    // Cerrar modal
    closeProductModal();

    // Mostrar notificación de DEMO
    if (currentProductId) {
        showNotification(
            '⚠️ Esta es una demostración. El producto NO ha sido actualizado realmente.',
            'warning',
            5000
        );
    } else {
        showNotification(
            '⚠️ Esta es una demostración. El producto NO ha sido creado realmente.',
            'warning',
            5000
        );
    }

    console.log('DEMO: Datos del formulario:', {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value,
        stock: document.getElementById('productStock').value,
        categoryId: document.getElementById('productCategory').value,
        image: document.getElementById('productImage').value,
        featured: document.getElementById('productFeatured').checked
    });
}

/**
 * Maneja la confirmación de eliminación (SIMULADO)
 */
async function handleDeleteConfirm() {
    // Mostrar loading
    showLoading('Eliminando producto...');

    // Simular delay de eliminación
    await delay(1000);

    // Ocultar loading
    hideLoading();

    // Cerrar modal
    closeDeleteModal();

    // Mostrar notificación de DEMO
    showNotification(
        '⚠️ Esta es una demostración. El producto NO ha sido eliminado realmente.',
        'warning',
        5000
    );

    console.log('DEMO: Se intentó eliminar el producto con ID:', currentProductId);
}

// ========= EVENT LISTENERS =========

/**
 * Configura todos los event listeners del admin
 */
function setupAdminEventListeners() {
    // === Búsqueda con debounce ===
    const searchProducts = document.getElementById('searchProducts');
    if (searchProducts) {
        const debouncedSearch = debounce((value) => {
            adminFilters.search = value;
            renderProductsTable();
        }, 300);

        searchProducts.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }

    // === Filtro de categoría ===
    const filterCategory = document.getElementById('filterCategory');
    if (filterCategory) {
        filterCategory.addEventListener('change', (e) => {
            adminFilters.category = e.target.value ? parseInt(e.target.value) : null;
            renderProductsTable();
        });
    }

    // === Botón agregar producto ===
    const btnAddProduct = document.getElementById('btnAddProduct');
    if (btnAddProduct) {
        btnAddProduct.addEventListener('click', openAddModal);
    }

    // === Formulario de producto ===
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }

    // === Cancelar modal de producto ===
    const btnCancelProduct = document.getElementById('btnCancelProduct');
    if (btnCancelProduct) {
        btnCancelProduct.addEventListener('click', closeProductModal);
    }

    // === Cerrar modal con X ===
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.querySelector('.modal-close')?.addEventListener('click', closeProductModal);

        // Cerrar al hacer clic fuera
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) closeProductModal();
        });
    }

    // === Confirmar eliminación ===
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    if (btnConfirmDelete) {
        btnConfirmDelete.addEventListener('click', handleDeleteConfirm);
    }

    // === Cancelar eliminación ===
    const btnCancelDelete = document.getElementById('btnCancelDelete');
    if (btnCancelDelete) {
        btnCancelDelete.addEventListener('click', closeDeleteModal);
    }

    // === Modal de eliminación ===
    const deleteModal = document.getElementById('deleteModal');
    if (deleteModal) {
        deleteModal.querySelector('.modal-close')?.addEventListener('click', closeDeleteModal);

        // Cerrar al hacer clic fuera
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) closeDeleteModal();
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
            closeProductModal();
            closeDeleteModal();
        }
    });
}
