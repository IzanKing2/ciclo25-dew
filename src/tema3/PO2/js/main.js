import { ROLES, USERS, CATEGORIES, PRODUCTS } from "./data.js";


async function initShopPage() {
    try {
        

    } catch(error) {
        console.error('Error al cargar la página:', error);
    }
}

/**
 * Función para mostrar los productos dinámicamente
 */
function showProducts() {
    const productContainer = document.querySelector(".products-grid");

    // Limpiamos el HTML de prueba que había en el archivo .html
    productContainer.innerHTML = "";

    PRODUCTS.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';

        // 1. Imagen
        const productoImage = document.createElement('img');
        productoImage.src = product.imageUrl;
        productoImage.alt = product.name;
        productoImage.className = 'product-image';

        // Contenedor de info
        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        // 2. Categorías
        const categoryNames = product.category.map(cat => cat.name).join(", ");

        const productCategory = document.createElement('span');
        productCategory.className = 'product-category';
        productCategory.textContent = categoryNames;

        // 3. Título
        const productTitle = document.createElement('h2');
        productTitle.className = 'product-title';
        productTitle.textContent = product.name;

        // 4. Precio
        const productPrice = document.createElement('p');
        productPrice.className = 'product-price';
        productPrice.textContent = `${product.price}€`;

        // 5. Botón
        const btnCart = document.createElement('button');
        btnCart.className = 'btn-add-cart';
        btnCart.textContent = 'Añadir al Carrito';

        // Ensamblaje
        productInfo.append(productCategory, productTitle, productPrice, btnCart);
        productCard.append(productoImage, productInfo);

        // Añadir al DOM
        productContainer.append(productCard);
    });
}

/**
 * Función para renderizar las categorías en el menú de filtros
 */
function renderCategories() {
    const categoryContainer = document.querySelector('.category-group');

    // 1. Limpiamos el HTML hardcodeado
    categoryContainer.innerHTML = "";

    // 2. Volvemos a crear el título que borramos al limpiar
    const title = document.createElement('h3');
    title.textContent = "Categorías";
    categoryContainer.append(title);

    // 3. Generamos los filtros dinámicamente
    CATEGORIES.forEach(category => {
        const label = document.createElement('label');
        label.className = 'filter-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category.id; // Guardamos el ID para filtrar luego
        label.append(checkbox, ` ${category.name}`);

        categoryContainer.append(label);
    });
}


