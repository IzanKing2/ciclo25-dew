// ==========================================================================
// TESTS E2E: CATÁLOGO DE PRODUCTOS
// ==========================================================================
// Estos tests verifican que el catálogo de productos funciona
// correctamente: carga de productos, filtrado por categorías
// y actualización del título de la página.
//
// NOTA: Todos los tests usan cy.login() antes de visitar la página
// porque index.html es una página protegida que requiere autenticación.
// ==========================================================================

describe('Catálogo de Productos', () => {

    // Antes de cada test: simulamos el login y visitamos el catálogo.
    // Usamos cy.login() (nuestro comando personalizado) en lugar de
    // pasar por la UI del login, porque es más rápido y fiable.
    beforeEach(() => {
        cy.login();
        cy.visit('/index.html');
    });

    // -----------------------------------------------------------------------
    // TEST 1: Se cargan todos los productos
    // -----------------------------------------------------------------------
    // La app tiene 12 productos iniciales (4 PCs + 4 periféricos + 4 consolas).
    // Este test verifica que todos se muestran al cargar la página.
    it('Debe cargar todos los productos (12 en total)', () => {
        // .should('have.length', 12) verifica que hay exactamente 12 elementos
        // con la clase '.product' en el DOM.
        // El timeout por defecto (8000ms) da tiempo a la carga asíncrona.
        cy.get('.product').should('have.length', 12);
    });

    // -----------------------------------------------------------------------
    // TEST 2: El título inicial es correcto
    // -----------------------------------------------------------------------
    it('Debe mostrar el título "Todos los productos"', () => {
        // .should('have.text', ...) verifica el texto exacto del elemento
        cy.get('#mainTitle').should('have.text', 'Todos los productos');
    });

    // -----------------------------------------------------------------------
    // TEST 3: Filtrar por categoría "Ordenadores"
    // -----------------------------------------------------------------------
    // Al hacer clic en el botón "Ordenadores" (id="0"), solo deben
    // mostrarse los 4 productos de esa categoría.
    it('Debe filtrar y mostrar solo los Ordenadores (4 productos)', () => {
        // Hacemos clic en el botón de categoría "Ordenadores"
        // El id="0" corresponde al primer índice de categorías en data.js
        cy.get('#\\30').click();

        // Verificamos que solo hay 4 productos visibles
        cy.get('.product').should('have.length', 4);

        // Verificamos que el título cambió
        cy.get('#mainTitle').should('have.text', 'Ordenadores');
    });

    // -----------------------------------------------------------------------
    // TEST 4: Filtrar por categoría "Periféricos"
    // -----------------------------------------------------------------------
    it('Debe filtrar y mostrar solo los Periféricos (4 productos)', () => {
        // id="1" corresponde a la categoría "Periféricos"
        cy.get('#\\31').click();

        cy.get('.product').should('have.length', 4);
        cy.get('#mainTitle').should('have.text', 'Periféricos');
    });

    // -----------------------------------------------------------------------
    // TEST 5: Filtrar por categoría "Consolas"
    // -----------------------------------------------------------------------
    it('Debe filtrar y mostrar solo las Consolas (4 productos)', () => {
        // id="2" corresponde a la categoría "Consolas"
        cy.get('#\\32').click();

        cy.get('.product').should('have.length', 4);
        cy.get('#mainTitle').should('have.text', 'Consolas');
    });

    // -----------------------------------------------------------------------
    // TEST 6: Volver a "Todos los productos" después de filtrar
    // -----------------------------------------------------------------------
    // Verifica que al pulsar "Todos los productos" después de haber
    // filtrado, se restauran los 12 productos.
    it('Debe volver a mostrar todos los productos tras filtrar', () => {
        // Primero filtramos por una categoría
        cy.get('#\\30').click();
        cy.get('.product').should('have.length', 4);

        // Luego pulsamos "Todos los productos"
        cy.get('#todos').click();

        // Verificamos que se muestran los 12 productos de nuevo
        cy.get('.product').should('have.length', 12);
        cy.get('#mainTitle').should('have.text', 'Todos los productos');
    });

    // -----------------------------------------------------------------------
    // TEST 7: Los productos muestran título y precio
    // -----------------------------------------------------------------------
    // Verifica que cada tarjeta de producto tiene los elementos
    // esperados: imagen, título, precio y botón "Agregar".
    it('Cada producto debe mostrar título, precio y botón de agregar', () => {
        // .first() selecciona solo el primer elemento de la lista
        cy.get('.product').first().within(() => {
            // .within() limita la búsqueda al elemento seleccionado
            // Es como decir: "dentro de este producto, busca..."
            cy.get('.product-title').should('exist');
            cy.get('.product-price').should('exist');
            cy.get('.product-add').should('exist');
            cy.get('.product-img').should('exist');
        });
    });

    // -----------------------------------------------------------------------
    // TEST 8: El botón de categoría activa se marca visualmente
    // -----------------------------------------------------------------------
    it('Debe marcar como activo el botón de la categoría seleccionada', () => {
        // Al cargar, "Todos los productos" debe tener la clase "active"
        cy.get('#todos').should('have.class', 'active');

        // Al hacer clic en "Ordenadores", ese botón debe ser el activo
        cy.get('#\\30').click();
        cy.get('#\\30').should('have.class', 'active');

        // Y "Todos los productos" ya no debe tener la clase "active"
        cy.get('#todos').should('not.have.class', 'active');
    });
});
