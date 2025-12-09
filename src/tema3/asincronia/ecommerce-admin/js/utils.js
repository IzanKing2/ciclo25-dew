// utils.js - Funciones utilitarias para la aplicación

/**
 * Formatea un número como moneda (EUR)
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada como moneda
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

/**
 * Formatea una fecha en formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

/**
 * Implementación de debounce para evitar llamadas excesivas
 * Útil para búsquedas en tiempo real
 * @param {Function} fn - Función a ejecutar
 * @param {number} delay - Tiempo de espera en milisegundos
 * @returns {Function} - Función con debounce aplicado
 */
function debounce(fn, delay = 300) {
    let timeoutId;
    return function (...args) {
        // Cancelar el timeout anterior si existe
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Establecer un nuevo timeout
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * Crea una promesa que se resuelve después de un delay
 * Útil para simular operaciones asíncronas de red
 * @param {number} ms - Milisegundos de espera
 * @returns {Promise} - Promesa que se resuelve después del delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Muestra una notificación toast al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duración en milisegundos (por defecto 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Crear contenedor de notificaciones si no existe
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    // Crear la notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Iconos según el tipo
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || icons.info}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Estilos inline para las notificaciones (independientes del CSS)
    const colors = {
        success: { bg: '#d4edda', border: '#28a745', text: '#155724' },
        error: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' },
        warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
        info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' }
    };

    const color = colors[type] || colors.info;
    notification.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background-color: ${color.bg};
        border-left: 4px solid ${color.border};
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        color: ${color.text};
        font-size: 14px;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Agregar estilos de animación si no existen
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.6;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
            .notification-icon {
                font-size: 16px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    container.appendChild(notification);

    // Auto-cerrar después del tiempo especificado
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * Muestra el overlay de carga
 * @param {string} message - Mensaje opcional a mostrar
 */
function showLoading(message = 'Cargando...') {
    // Crear overlay si no existe
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-message">${message}</p>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Estilos del spinner
        if (!document.getElementById('loading-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'loading-styles';
            styleSheet.textContent = `
                .loading-content {
                    text-align: center;
                }
                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #e1e1e1;
                    border-top-color: #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .loading-message {
                    color: #666;
                    font-size: 16px;
                    font-weight: 500;
                }
            `;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(overlay);
        // Forzar reflow para la animación
        overlay.offsetHeight;
    } else {
        // Actualizar mensaje si ya existe
        const messageEl = overlay.querySelector('.loading-message');
        if (messageEl) messageEl.textContent = message;
    }

    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
}

/**
 * Oculta el overlay de carga
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    }
}

/**
 * Valida si un string está vacío o solo contiene espacios
 * @param {string} str - String a validar
 * @returns {boolean} - True si está vacío
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * Valida si un valor es un número positivo
 * @param {any} value - Valor a validar
 * @returns {boolean} - True si es un número positivo
 */
function isPositiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
}

/**
 * Valida un email con expresión regular
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Trunca un texto a una longitud máxima
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado con "..." al final si es necesario
 */
function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Muestra un modal de confirmación
 * @param {string} message - Mensaje de confirmación
 * @param {string} title - Título del modal
 * @returns {Promise<boolean>} - Promesa que se resuelve con true si confirma, false si cancela
 */
function showConfirmDialog(message, title = 'Confirmar') {
    return new Promise((resolve) => {
        // Crear el modal
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
        `;

        modalOverlay.innerHTML = `
            <div class="confirm-modal" style="
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                max-width: 400px;
                width: 90%;
                animation: slideIn 0.3s ease;
            ">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">${title}</h3>
                <p style="color: #666; margin: 0 0 25px 0; font-size: 14px; line-height: 1.5;">${message}</p>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn-cancel" style="
                        padding: 10px 20px;
                        border: 1px solid #ddd;
                        background: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                    ">Cancelar</button>
                    <button class="btn-confirm" style="
                        padding: 10px 20px;
                        border: none;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.2s;
                    ">Confirmar</button>
                </div>
            </div>
        `;

        // Agregar estilos de animación
        if (!document.getElementById('confirm-dialog-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'confirm-dialog-styles';
            styleSheet.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(modalOverlay);

        // Event listeners
        const cancelBtn = modalOverlay.querySelector('.btn-cancel');
        const confirmBtn = modalOverlay.querySelector('.btn-confirm');

        cancelBtn.addEventListener('click', () => {
            modalOverlay.remove();
            resolve(false);
        });

        confirmBtn.addEventListener('click', () => {
            modalOverlay.remove();
            resolve(true);
        });

        // Cerrar al hacer clic fuera del modal
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
                resolve(false);
            }
        });

        // Cerrar con Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modalOverlay.remove();
                document.removeEventListener('keydown', handleEscape);
                resolve(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
}
