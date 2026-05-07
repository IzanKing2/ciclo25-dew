// ==========================================================================
// TESTS E2E: SISTEMA DE LOGIN
// ==========================================================================
// Estos tests verifican que el sistema de autenticación funciona
// correctamente: login exitoso, login fallido, protección de rutas
// y cierre de sesión.
//
// describe() → Agrupa tests relacionados (como una "carpeta" de tests)
// it() → Define un test individual (un caso concreto a probar)
// cy → Objeto global de Cypress para interactuar con el navegador
// ==========================================================================

describe('Sistema de Login', () => {

    // beforeEach se ejecuta antes de CADA test dentro de este describe.
    // Aquí visitamos la página de login para que cada test empiece
    // desde el mismo punto.
    beforeEach(() => {
        cy.visit('/login.html');
    });

    // -----------------------------------------------------------------------
    // TEST 1: Login exitoso con credenciales de administrador
    // -----------------------------------------------------------------------
    it('Debe iniciar sesión correctamente con credenciales de admin', () => {
        // cy.get() busca un elemento en el DOM por su selector CSS
        // .type() escribe texto en un campo de input
        cy.get('#email').type('admin@test.com');
        cy.get('#password').type('password');

        // .click() simula un clic del ratón sobre el botón
        cy.get('#loginBtn').click();

        // cy.url() obtiene la URL actual del navegador
        // Verificamos que la URL NO contiene 'login' (es decir, redirigió)
        // NOTA: El servidor 'serve' puede quitar la extensión .html,
        // por eso comprobamos que no estamos en login en vez de buscar index.html
        cy.url().should('not.include', 'login');

        // Verificamos que localStorage tiene la clave de autenticación
        cy.window().then((win) => {
            expect(win.localStorage.getItem('isAuthenticated')).to.eq('true');
        });
    });

    // -----------------------------------------------------------------------
    // TEST 2: Login fallido con credenciales incorrectas
    // -----------------------------------------------------------------------
    it('Debe mostrar error con credenciales incorrectas', () => {
        cy.get('#email').type('usuario@falso.com');
        cy.get('#password').type('contraseñaFalsa');

        // cy.on('window:alert') intercepta los alert() del navegador
        // Debe configurarse ANTES del click que dispara el alert
        cy.on('window:alert', (textoAlerta) => {
            expect(textoAlerta).to.contains('Email o contraseña incorrectos');
        });

        cy.get('#loginBtn').click();

        // Comprobamos que seguimos en la página de login (no se redirigió)
        cy.url().should('include', 'login');
    });

    // -----------------------------------------------------------------------
    // TEST 3: Login fallido con campos vacíos
    // -----------------------------------------------------------------------
    it('No debe permitir enviar el formulario con campos vacíos', () => {
        // Intentamos hacer clic sin escribir nada
        cy.get('#loginBtn').click();

        // Seguimos en login porque el navegador bloquea el envío
        // (los inputs tienen el atributo "required")
        cy.url().should('include', 'login');
    });

    // -----------------------------------------------------------------------
    // TEST 4: Las páginas protegidas redirigen al login
    // -----------------------------------------------------------------------
    it('Debe redirigir a login si no está autenticado', () => {
        // Intentamos acceder directamente a la página principal sin login
        cy.visit('/index.html');

        // Esperamos a que la redirección ocurra
        cy.url().should('include', 'login');
    });

    // -----------------------------------------------------------------------
    // TEST 5: Cerrar sesión funciona correctamente
    // -----------------------------------------------------------------------
    it('Debe cerrar sesión correctamente', () => {
        // Primero hacemos login usando nuestro comando personalizado
        cy.login();

        // Visitamos la página principal (ahora sí tenemos acceso)
        cy.visit('/index.html');

        // Esperamos a que la página cargue completamente
        cy.get('#logoutBtn').should('be.visible');

        // Buscamos y hacemos clic en el botón de cerrar sesión
        cy.get('#logoutBtn').click();

        // Verificamos que redirige al login
        cy.url().should('include', 'login');

        // Verificamos que localStorage ya no tiene la clave de autenticación
        cy.window().then((win) => {
            expect(win.localStorage.getItem('isAuthenticated')).to.be.null;
        });
    });
});
