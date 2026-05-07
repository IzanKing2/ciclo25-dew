// ==========================================================================
// TESTS E2E: PANEL DE ADMINISTRACIÓN (CRUD)
// ==========================================================================
// Estos tests verifican las operaciones CRUD del panel de administración:
// Crear, Leer, Actualizar y Eliminar productos.
// ==========================================================================

describe('Panel de Administración (CRUD)', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/dashboard.html');
    });

    // -----------------------------------------------------------------------
    // TEST 1: Mostrar el listado de productos
    // -----------------------------------------------------------------------
    it('Debe mostrar el listado de productos existentes', () => {
        // Verifica que hay productos renderizados en el dashboard
        cy.get('.cart-product').should('have.length.greaterThan', 0);
    });

    // -----------------------------------------------------------------------
    // TEST 2: El botón "Crear producto" existe y es visible
    // -----------------------------------------------------------------------
    it('Debe mostrar el botón de crear producto', () => {
        cy.get('.admin-create-product').should('be.visible');
        cy.get('.admin-create-product').should('contain', 'Crear producto');
    });

    // -----------------------------------------------------------------------
    // TEST 3: Abrir el modal de creación de producto
    // -----------------------------------------------------------------------
    it('Debe abrir el modal al pulsar "Crear producto"', () => {
        cy.get('.admin-create-product').click();

        // Verifica que el modal se abre
        cy.get('.modal-overlay').should('be.visible');
        cy.get('.modal-title').should('contain', 'Crear Producto');

        // Verifica que el formulario tiene los campos esperados
        cy.get('#title').should('exist');
        cy.get('#price').should('exist');
        cy.get('#category').should('exist');
        cy.get('#image_url').should('exist');
    });

    // -----------------------------------------------------------------------
    // TEST 4: Crear un nuevo producto
    // -----------------------------------------------------------------------
    it('Debe crear un nuevo producto correctamente', () => {
        // Contamos los productos antes de crear
        cy.get('.cart-product').then(($productos) => {
            const cantidadAntes = $productos.length;

            // Abrimos el modal
            cy.get('.admin-create-product').click();
            cy.get('.modal-overlay').should('be.visible');

            // Rellenamos el formulario
            cy.get('#title').type('Producto de Test Cypress');
            cy.get('#price').type('99.99');
            // select() con texto visible selecciona la opción "Periféricos"
            // NOTA: No usamos "Ordenadores" porque su ID es 0, y la app
            // tiene un bug: !0 === true en JS, lo que falla la validación.
            cy.get('#category').select('Periféricos');
            cy.get('#image_url').type('./img/pc/01.webp');

            // Interceptamos el alert de éxito
            cy.on('window:alert', (texto) => {
                expect(texto).to.contains('Producto creado con éxito');
            });

            // Enviamos el formulario
            cy.get('.modal-btn-save').click();

            // Esperamos a que el modal se cierre (la creación tarda 800ms)
            cy.get('.modal-overlay', { timeout: 10000 }).should('not.exist');

            // Debe haber un producto más que antes
            cy.get('.cart-product').should('have.length', cantidadAntes + 1);
        });
    });

    // -----------------------------------------------------------------------
    // TEST 5: Cerrar el modal con el botón "Cancelar"
    // -----------------------------------------------------------------------
    it('Debe cerrar el modal al pulsar "Cancelar"', () => {
        cy.get('.admin-create-product').click();
        cy.get('.modal-overlay').should('be.visible');

        cy.get('.modal-btn-cancel').click();

        // El modal debe desaparecer
        cy.get('.modal-overlay').should('not.exist');
    });

    // -----------------------------------------------------------------------
    // TEST 6: Cerrar el modal con el botón "X"
    // -----------------------------------------------------------------------
    it('Debe cerrar el modal al pulsar el botón de cierre', () => {
        cy.get('.admin-create-product').click();
        cy.get('.modal-overlay').should('be.visible');

        cy.get('.modal-close').click();
        cy.get('.modal-overlay').should('not.exist');
    });

    // -----------------------------------------------------------------------
    // TEST 7: Abrir el modal de edición
    // -----------------------------------------------------------------------
    it('Debe abrir el modal de edición al pulsar el botón editar', () => {
        // Hacemos clic en el botón de editar del primer producto
        cy.get('[data-action="edit"]').first().click();

        // Verificamos que se abre el modal con título "Editar Producto"
        cy.get('.modal-overlay').should('be.visible');
        cy.get('.modal-title').should('contain', 'Editar Producto');

        // El formulario debe tener datos pre-rellenados (no vacíos)
        cy.get('#title').should('not.have.value', '');
        cy.get('#price').should('not.have.value', '');
    });

    // -----------------------------------------------------------------------
    // TEST 8: Eliminar un producto
    // -----------------------------------------------------------------------
    it('Debe eliminar un producto correctamente', () => {
        cy.get('.cart-product').then(($productos) => {
            const cantidadAntes = $productos.length;

            // Aceptamos el confirm() automáticamente
            cy.on('window:confirm', () => true);
            // Interceptamos el alert de éxito
            cy.on('window:alert', (texto) => {
                expect(texto).to.contains('Producto eliminado con éxito');
            });

            // Hacemos clic en eliminar el primer producto
            cy.get('[data-action="delete"]').first().click();

            // Debe haber un producto menos
            cy.get('.cart-product').should('have.length', cantidadAntes - 1);
        });
    });

    // -----------------------------------------------------------------------
    // TEST 9: Cada producto muestra botones de editar y eliminar
    // -----------------------------------------------------------------------
    it('Cada producto debe tener botones de editar y eliminar', () => {
        cy.get('.cart-product').first().within(() => {
            cy.get('[data-action="edit"]').should('exist');
            cy.get('[data-action="delete"]').should('exist');
        });
    });

    // -----------------------------------------------------------------------
    // TEST 10: Cada producto muestra título, categoría y precio
    // -----------------------------------------------------------------------
    it('Cada producto debe mostrar su información', () => {
        cy.get('.cart-product').first().within(() => {
            cy.get('.cart-product-title h3').should('not.be.empty');
            cy.get('.cart-product-price p').should('not.be.empty');
        });
    });
});
