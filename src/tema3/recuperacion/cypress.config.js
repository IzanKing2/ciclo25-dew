// ==========================================================================
// CONFIGURACIÓN DE CYPRESS
// ==========================================================================
// Este archivo configura cómo se comporta Cypress al ejecutar los tests.
// 
// defineConfig() es la función oficial de Cypress para establecer opciones.
// Dentro de "e2e" ponemos las opciones específicas para tests end-to-end.
// ==========================================================================

const { defineConfig } = require('cypress');

module.exports = defineConfig({

  // Configuración para tests end-to-end (E2E)
  e2e: {

    // URL base del servidor local donde se sirve la aplicación.
    // Todos los cy.visit() usarán esta URL como prefijo.
    // Ejemplo: cy.visit('/login.html') → http://localhost:3000/login.html
    baseUrl: 'http://localhost:3000',

    // Resolución de pantalla para los tests (simula un monitor estándar)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Tiempo máximo (en milisegundos) que Cypress espera a que un comando
    // se complete. Si un elemento no aparece en 8 segundos, el test falla.
    // Lo ponemos a 8000ms porque la app simula cargas asíncronas con setTimeout.
    defaultCommandTimeout: 8000,

    // Carpeta donde Cypress guarda capturas de pantalla si un test falla
    screenshotsFolder: 'cypress/screenshots',

    // Carpeta donde Cypress guarda videos de las ejecuciones
    videosFolder: 'cypress/videos',

    // No grabar video por defecto (para ahorrar espacio)
    video: false,
  },
});
