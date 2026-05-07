// ==========================================================================
// ARCHIVO DE SOPORTE GLOBAL DE CYPRESS
// ==========================================================================
// Este archivo se ejecuta ANTES de cada archivo de tests.
// Es el lugar ideal para:
//   1. Importar comandos personalizados
//   2. Configurar hooks globales (beforeEach, afterEach)
//   3. Manejar errores no capturados
// ==========================================================================

// Importa los comandos personalizados (cy.login(), cy.limpiarDatos(), etc.)
import './commands';

// ==========================================================================
// HOOKS GLOBALES
// ==========================================================================

// beforeEach se ejecuta ANTES de cada test individual.
// Aquí limpiamos localStorage para que cada test comience desde cero,
// evitando que datos de un test anterior afecten al siguiente.
beforeEach(() => {
    // Limpia todo el localStorage del navegador
    cy.clearLocalStorage();
});

// ==========================================================================
// MANEJO DE ERRORES NO CAPTURADOS
// ==========================================================================
// Algunos errores de JavaScript en la aplicación pueden hacer que Cypress
// falle innecesariamente. Este handler evita que errores no relacionados
// con nuestros tests detengan la ejecución.
Cypress.on('uncaught:exception', (err, runnable) => {
    // Retornar false evita que Cypress falle el test por errores
    // de la aplicación que no son parte de lo que estamos testeando.
    return false;
});
