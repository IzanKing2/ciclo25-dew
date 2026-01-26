import { USERS } from "./data.js";

// Claves para localStorage
const AUTH_KEY = "isAuthenticated";
const USER_KEY = "currentUser";

/**
 * Función para iniciar sesión
 * @param {string} username 
 * @param {string} password 
 * @returns {Object} Resultado del login
 */
export function login(username, password) {
    if (!username || !password) {
        return {
            success: false,
            message: 'Por favor complete todos los campos'
        };
    }

    // Buscamos el usuario en nuestra "Base de Datos" (Array USERS)
    // Esto es mucho más escalable que comparar variables sueltas
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        // Guardamos la sesión
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        return {
            success: true,
            message: 'Inicio de sesión exitoso'
        }
    }

    // Si las credenciales son incorrectas
    return {
        success: false,
        message: 'Usuario o contraseña incorrecta'
    }
}

/**
 * Función para cerrar sesión
 */
export function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = 'shop.html';
}

/**
 * Función para comprobar que un usuario está autenticado
 * @returns {boolean} - True si el usuario está autenticado, False en caso contrario
 */
export function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

/**
 * Función para obtener el usuario actual (Objeto completo)
 * @returns {object|null} - Objeto Usuario o null
 */
export function getCurrentUser() {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    return JSON.parse(userJson);
}

/**
 * Verifica si es Admin
 */
export function isAdmin() {
    const user = getCurrentUser();
    // Verificamos que usuario exista, que tenga rol y que el nombre del rol sea 'Admin'
    return user && user.role && user.role.name === 'Admin';
}

function redirectIsAdmin() {
    if (isAdmin()) {
        window.location.href = 'admin.html';
    }

    window.location.href = 'shop.html';
}
