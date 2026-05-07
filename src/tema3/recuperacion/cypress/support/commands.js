// ==========================================================================
// COMANDOS PERSONALIZADOS DE CYPRESS
// ==========================================================================
// Los "custom commands" son funciones reutilizables que podemos llamar
// en cualquier test con cy.nombreDelComando().
//
// ¿Por qué crear comandos personalizados?
//   - Evitan repetir código en cada test
//   - Si la lógica cambia, solo se actualiza en un lugar
//   - Hacen los tests más legibles
// ==========================================================================

// -----------------------------------------------------------------------
// COMANDO: cy.login()
// -----------------------------------------------------------------------
// Simula el inicio de sesión estableciendo directamente los valores
// en localStorage, sin necesidad de pasar por la página de login.
//
// ¿Por qué no hacer login por la UI en cada test?
//   - Sería más lento (cargar la página, escribir, hacer clic...)
//   - Si el login se rompe, TODOS los tests fallarían
//   - Solo el test de login debe probar la UI de login
//
// Uso: cy.login()
// -----------------------------------------------------------------------
Cypress.Commands.add('login', () => {
    // Establece las mismas claves que usa auth.js para marcar al usuario
    // como autenticado. Esto simula haber pasado por el formulario de login.
    window.localStorage.setItem('isAuthenticated', 'true');
    window.localStorage.setItem('currentUser', '0');
});

// -----------------------------------------------------------------------
// COMANDO: cy.limpiarDatos()
// -----------------------------------------------------------------------
// Limpia completamente el localStorage, eliminando autenticación,
// carrito y productos guardados.
//
// Uso: cy.limpiarDatos()
// -----------------------------------------------------------------------
Cypress.Commands.add('limpiarDatos', () => {
    window.localStorage.clear();
});
