/**
 * =====================================================================================
 * EJEMPLE DE UNIT TEST (JavaScript)
 * =====================================================================================
 * Prueba para ver como funciona un unit test en JavaScript
 * Ejemplo:
 *   - Suma(2, 3) -> 5
 */

const suma = require('./suma');

test('suma 2 + 3 = 5', () => {
    expect(suma(2, 3)).toBe(5);
});