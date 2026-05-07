// ==========================================================================
// TESTS E2E: CARRITO DE COMPRAS
// ==========================================================================
// Estos tests verifican el flujo completo del carrito.
//
// NOTA IMPORTANTE: Cuando un test necesita navegar de index a cart,
// usamos el enlace del menú (cy.get('.btn-cart').click()) en lugar de
// cy.visit('/cart.html'). Esto mantiene el localStorage intacto.
// ==========================================================================

describe('Carrito de Compras', () => {

    beforeEach(() => {
        cy.login();
    });

    it('Debe añadir un producto al carrito y actualizar el indicador', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');
    });

    it('Debe mostrar feedback visual al añadir un producto', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.product-add').first().should('contain', 'Añadido');
        cy.get('.product-add').first().should('be.disabled');
    });

    it('Debe mostrar los productos añadidos en la página del carrito', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);

        // Añadimos un producto y esperamos a que se guarde en localStorage
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        // Navegamos al carrito haciendo clic en el enlace del menú
        // Esto mantiene el localStorage intacto (a diferencia de cy.visit)
        cy.get('.btn-cart').click();

        // Verificamos que hay al menos 1 producto en el carrito
        cy.get('.cart-product').should('have.length.greaterThan', 0);
    });

    it('Debe mostrar mensaje de carrito vacío cuando no hay productos', () => {
        cy.visit('/cart.html');
        cy.get('.empty-cart').should('be.visible');
        cy.get('.empty-cart').should('contain', 'Tu carrito está vacío');
    });

    it('Debe mostrar los botones de acción cuando hay productos', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        // Navegamos al carrito vía menú
        cy.get('.btn-cart').click();

        cy.get('.cart-actions').should('be.visible');
        cy.get('.cart-buy-action').should('be.visible');
        cy.get('#total').should('be.visible');
    });

    it('Debe mostrar el total correcto del carrito', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        cy.get('.btn-cart').click();

        cy.get('#total').should('not.be.empty');
        cy.get('#total').invoke('text').should('include', '€');
    });

    it('Debe vaciar el carrito al pulsar "Vaciar carrito"', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        cy.get('.btn-cart').click();
        cy.get('.cart-product').should('have.length.greaterThan', 0);

        // Aceptamos el confirm() automáticamente
        cy.on('window:confirm', () => true);
        cy.get('.cart-empty-action').click();
        cy.get('.empty-cart').should('be.visible');
    });

    it('Debe simular la compra correctamente', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        cy.get('.btn-cart').click();
        cy.get('.cart-product').should('have.length.greaterThan', 0);

        // Interceptamos el alert de compra
        cy.on('window:alert', (texto) => {
            expect(texto).to.contains('Compra realizada con éxito');
        });
        cy.get('.cart-buy-action').click();
        cy.get('.cart-buy-action').should('contain', 'PROCESANDO...');
        cy.get('.empty-cart', { timeout: 5000 }).should('be.visible');
    });

    it('Debe mantener el indicador del carrito al navegar', () => {
        cy.visit('/index.html');
        cy.get('.product').should('have.length.greaterThan', 0);
        cy.get('.product-add').first().click();
        cy.get('.num').should('contain', '1');

        cy.get('.btn-cart').click();
        cy.get('.num').should('contain', '1');
    });
});
