// auth.js - Sistema de autenticación

// Credenciales del administrador
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Claves para localStorage
const AUTH_KEY = 'isAuthenticated';
const USER_KEY = 'currentUser';

/**
 * Función para iniciar sesión
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Object} - Objeto con el resultado del inicio de sesión
 */
function login(username, password) {
    // Valida si los campos están vacios
    if (!username || !password) {
        return {
            success: false,
            message: 'Por favor completa todos los campos'
        };
    }

    // Verifica las credenciales
    if (username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password) {

        // Guardar sesión en localStorage
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, username);

        return {
            success: true,
            message: 'Inicio de sesión exitoso'
        };
    }

    // Si las credenciales son incorrectas
    return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
    };
}

/**
 * Función para cerrar sesión
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = 'index.html';
}

/**
 * Función para verificar si el usuario está autenticado
 * @returns {boolean} - True si el usuario está autenticado, false en caso contrario
 */
function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

/**
 * Función para obtener el nombre del usuario actual
 * @returns {string|null} - Nombre del usuario actual
 */
function getCurrentUser() {
    return localStorage.getItem(USER_KEY);
}

/**
 * Función para proteger una página
 */
function protectedPage() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

/**
 * Función para redirigir si el usuario está autenticado
 */
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'admin.html';
    }
}

// Las funciones están disponibles globalmente (no usamos ES modules)
// para compatibilidad con script tags simples