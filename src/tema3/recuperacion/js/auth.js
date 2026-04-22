import { users, roles } from "./data.js";

const adminRole = roles.find(role => role.name === 'Admin');
const adminUser = users.find(user => user.role_id === adminRole.id);

const AUTH_CREDENTIALS = {
    AUTH_KEY: 'isAuthenticated',
    USER_KEY: 'currentUser'
};

function login(email, password) {
    const user = users.find(user => user.email === email);

    if (user && email === adminUser.email && password === adminUser.password) {
        localStorage.setItem(AUTH_CREDENTIALS.AUTH_KEY, 'true');
        localStorage.setItem(AUTH_CREDENTIALS.USER_KEY, user.id);
        return true;
    }
    return false;
}

function logout() {
    if (isAuthenticated()) {
        localStorage.removeItem(AUTH_CREDENTIALS.AUTH_KEY);
        localStorage.removeItem(AUTH_CREDENTIALS.USER_KEY);
        return true;
    }
    return false;
}

function isAuthenticated() {
    return localStorage.getItem(AUTH_CREDENTIALS.AUTH_KEY) === 'true';
}

function getCurrentUser() {
    const currentUser = users.find(user => user.id === localStorage.getItem(AUTH_CREDENTIALS.USER_KEY));
    return currentUser;
}

export { login, logout, isAuthenticated, getCurrentUser };