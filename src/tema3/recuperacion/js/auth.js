import { User } from "./models/User.js";


const ADMIN_CREDENTIALS = new User(1, 'admin', 'admin123');

const AUTH_KEY = 'isAuthenticated';
const USER_KEY = 'currentUser';

function getCurrentUser() {
    let currentUser = localStorage.getItem(USER_KEY);
    return currentUser;
}

function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'admin.html';
    }
}

function protectedPage() {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    }
}

function login(username, password) {
    if (!username || !password) {
        return {
            success: false,
            message: 'Por favor completa todos los campos'
        }
    }

    if (username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password) {

        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, username);

        return {
            success: true,
            message: 'Inicio de sesión exitoso'
        }
    }

    return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
    }
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = 'index.html';
}
