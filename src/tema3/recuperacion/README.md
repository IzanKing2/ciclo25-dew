# IzanShop - Proyecto E-commerce 🛒

## 📋 Descripción del Proyecto

Este es un proyecto de e-commerce desarrollado con **JavaScript vanilla**, HTML y CSS. Implementa un sistema completo de gestión de productos, carrito de compras y panel de administración con operaciones CRUD simuladas.

---

## 🗂️ Estructura del Proyecto

```
IzanShop/
├── index.html              # Página principal (catálogo de productos)
├── login.html              # Página de inicio de sesión
├── cart.html               # Página del carrito de compras
├── dashboard.html          # Panel de administración
├── css/
│   ├── main.css           # Estilos principales
│   └── modal.css          # Estilos para el modal del CRUD
└── js/
    ├── main.js            # Lógica principal del catálogo
    ├── cart.js            # Lógica del carrito
    ├── dashboard.js       # Lógica del panel admin (CRUD)
    ├── auth.js            # Sistema de autenticación
    ├── data.js            # Datos iniciales (productos, usuarios, etc.)
    ├── storage.js         # Gestión de localStorage
    └── models/
        ├── Cart.js        # Modelo del Carrito
        ├── CartItem.js    # Modelo de Item del Carrito
        ├── Product.js     # Modelo de Producto
        ├── Category.js    # Modelo de Categoría
        ├── User.js        # Modelo de Usuario
        └── Role.js        # Modelo de Rol
```

---

## 🎯 Conceptos Clave que Aprenderás

### 1. **Programación Orientada a Objetos (POO)**
   
#### Clases y Modelos
- **Cart.js**: Clase que representa el carrito completo
  - Métodos: `addProduct()`, `removeItem()`, `clear()`, `getTotal()`
  - Encapsula toda la lógica del carrito en un solo lugar
  
- **CartItem.js**: Clase que representa un producto dentro del carrito
  - Métodos: `getSubtotal()`, `incrementQuantity()`, `decrementQuantity()`
  - Cada item sabe cómo calcular su propio subtotal

**¿Por qué usar modelos?**
- Código más organizado y mantenible
- Reutilización de lógica
- Separación de responsabilidades
- Más fácil de testear

### 2. **Asincronía con async/await**

```javascript
// Función asíncrona que simula una petición al servidor
async function loadProducts(selectProducts) {
    productCont.innerHTML = '<p>Cargando productos...</p>';

    try {
        // Simula un delay de 500ms (como si fuera una petición HTTP)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Código que se ejecuta después del delay
        productCont.innerHTML = '';
        // ... renderizar productos
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}
```

**Conceptos importantes:**
- `async`: Marca una función como asíncrona
- `await`: Espera a que una promesa se resuelva
- `try/catch`: Manejo de errores en código asíncrono
- `Promise`: Representa un valor que estará disponible en el futuro

### 3. **LocalStorage - Persistencia de Datos**

```javascript
// Guardar en localStorage
localStorage.setItem('clave', JSON.stringify(datos));

// Recuperar de localStorage
const datos = JSON.parse(localStorage.getItem('clave'));

// Eliminar de localStorage
localStorage.removeItem('clave');
```

**¿Por qué JSON.stringify() y JSON.parse()?**
- localStorage solo guarda strings
- JSON.stringify() convierte objetos a string
- JSON.parse() convierte string a objeto

### 4. **CRUD Simulado**

El archivo `dashboard.js` implementa las 4 operaciones básicas:

- **C**reate (Crear): `createProduct()`
- **R**ead (Leer): `renderProducts()`
- **U**pdate (Actualizar): `editProduct()`
- **D**elete (Eliminar): `deleteProduct()`

**¿Por qué es "simulado"?**
- No hay un backend real (servidor)
- Los datos se guardan en localStorage (navegador)
- En producción, usarías una API REST o GraphQL

---

## 🔐 Sistema de Autenticación

### Credenciales de Prueba:

**Administrador:**
- Email: `admin@test.com`
- Password: `password`

**Usuario:**
- Email: `user@test.com`
- Password: `password`

### Funciones Clave:

```javascript
// Verificar si está autenticado
isAuthenticated()

// Obtener usuario actual
getCurrentUser()

// Iniciar sesión
login(email, password)

// Cerrar sesión
logout()
```

---

## 🛠️ Funcionalidades Implementadas

### 📦 Catálogo de Productos (index.html)
- ✅ Carga asíncrona de productos
- ✅ Filtrado por categorías
- ✅ Añadir productos al carrito
- ✅ Indicador de cantidad en el carrito
- ✅ Feedback visual al añadir productos

### 🛒 Carrito de Compras (cart.html)
- ✅ Visualización de productos añadidos
- ✅ Cálculo automático de subtotales
- ✅ Cálculo del total del carrito
- ✅ Eliminar productos individuales
- ✅ Vaciar carrito completo
- ✅ Simulación de proceso de compra
- ✅ Persistencia con localStorage

### ⚙️ Panel de Administración (dashboard.html)
- ✅ CRUD completo de productos
- ✅ Formulario modal para crear/editar
- ✅ Validación de formularios
- ✅ Confirmaciones antes de eliminar
- ✅ Feedback visual en operaciones
- ✅ Solo accesible para usuarios admin

---

## 💡 Flujo de Datos

### Añadir Producto al Carrito:

```
1. Usuario hace click en "Agregar"
   ↓
2. main.js → addToCart()
   ↓
3. cart.addProduct(producto)  // Usa el modelo Cart
   ↓
4. Cart verifica si el producto ya existe
   - Si existe → incrementa cantidad
   - Si no existe → crea nuevo CartItem
   ↓
5. saveCart(cart)  // Guarda en localStorage
   ↓
6. updateCartIndicator()  // Actualiza UI
```

### Cargar Carrito en cart.html:

```
1. Usuario entra a cart.html
   ↓
2. cart.js → init()
   ↓
3. cart = getCart()  // Lee de localStorage
   ↓
4. renderCart()  // Renderiza async
   ↓
5. Muestra productos o mensaje vacío
```

---

## 🎨 Características Técnicas

### 1. **Módulos ES6**
```javascript
// Exportar
export default Cart;
export { saveCart, getCart };

// Importar
import Cart from "./models/Cart.js";
import { saveCart, getCart } from "./storage.js";
```

### 2. **Manipulación del DOM**
```javascript
// Crear elemento
const div = document.createElement('div');

// Añadir clases
div.classList.add('product');

// Insertar HTML
div.innerHTML = `<h3>${product.title}</h3>`;

// Añadir al DOM
container.appendChild(div);
```

### 3. **Event Listeners**
```javascript
// Event listener directo
button.addEventListener('click', function() {
    console.log('Clicked!');
});

// Event listener con arrow function
button.addEventListener('click', () => {
    console.log('Clicked!');
});

// Event listener con función externa
button.addEventListener('click', handleClick);
```

### 4. **Template Literals**
```javascript
// Interpolación de variables
const html = `
    <h3>${product.title}</h3>
    <p>${product.price}€</p>
`;

// Expresiones dentro de templates
const subtotal = `${(price * quantity).toFixed(2)}€`;
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Servidor Local (Recomendado)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

### Opción 2: Extensión Live Server en VS Code

1. Instala "Live Server" desde las extensiones
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

**⚠️ Importante:** No abras los archivos HTML directamente desde el explorador (file:///) porque los módulos ES6 no funcionarán.

---

## 📚 Conceptos de JavaScript que se Usan

### Arrays
```javascript
// map - transforma cada elemento
products.map(p => p.title)

// filter - filtra elementos
products.filter(p => p.category_id === 1)

// find - encuentra un elemento
products.find(p => p.id === '123')

// reduce - reduce a un solo valor
items.reduce((total, item) => total + item.price, 0)

// forEach - itera sin retornar
products.forEach(p => console.log(p))
```

### Operador Spread (...)
```javascript
// Copiar array
const copy = [...originalArray];

// Copiar objeto
const copy = {...originalObject};
```

### Destructuring
```javascript
// De objetos
const { name, price } = product;

// De arrays
const [first, second] = array;
```

### Optional Chaining (?.)
```javascript
// Evita errores si algo es null/undefined
const value = object?.property?.nestedProperty;
```

---

## 🔄 Mejoras Futuras (Para Practicar)

1. **Backend Real**
   - Conectar con Node.js + Express
   - Base de datos (MongoDB, PostgreSQL)
   - API REST

2. **Funcionalidades Adicionales**
   - Búsqueda de productos
   - Paginación
   - Ordenar productos (precio, nombre)
   - Imágenes reales
   - Sistema de favoritos

3. **UX/UI**
   - Animaciones con CSS
   - Loading spinners
   - Notificaciones toast
   - Modo oscuro

4. **Validaciones**
   - Validación de formularios más robusta
   - Sanitización de inputs
   - Límites de stock

---

## ❓ Preguntas Frecuentes

### ¿Por qué usar modelos (Cart, CartItem)?
Los modelos encapsulan la lógica de negocio. En vez de tener funciones sueltas, tienes objetos que saben cómo comportarse. Esto hace el código más mantenible y escalable.

### ¿Por qué async/await?
Simula operaciones que en el mundo real tardan tiempo (peticiones HTTP, lectura de archivos). Te prepara para trabajar con APIs reales.

### ¿Por qué localStorage y no una base de datos?
Es un proyecto de frontend puro. localStorage es perfecto para aprender persistencia sin necesitar un backend. En producción usarías una BD real.

### ¿Qué es un CRUD simulado?
Es hacer Create, Read, Update, Delete pero guardando en localStorage en vez de en un servidor. Los datos solo existen en tu navegador.

---

## 🎓 Lo que has Aprendido

✅ Programación Orientada a Objetos con JavaScript
✅ Módulos ES6 (import/export)
✅ Asincronía (async/await, Promises)
✅ Manipulación del DOM
✅ Event Handling
✅ LocalStorage para persistencia
✅ CRUD completo
✅ Autenticación básica
✅ Template Literals
✅ Array Methods (map, filter, reduce, find)
✅ Estructuración de proyectos

---

## 📝 Notas Importantes

- **Seguridad**: Este proyecto NO es seguro para producción. Las contraseñas están en texto plano y la autenticación es muy básica.
  
- **localStorage**: Los datos solo existen en tu navegador. Si borras el caché, se pierden.

- **Módulos ES6**: Necesitas un servidor (no file://) para que funcionen correctamente.

---

## 🤝 Recomendaciones de Estudio

1. **Practica modificando el código**
   - Añade nuevas categorías
   - Cambia los estilos
   - Añade validaciones

2. **Experimenta con la consola**
   - Abre DevTools (F12)
   - Usa `console.log()` para ver qué pasa
   - Prueba las funciones manualmente

3. **Lee el código línea por línea**
   - Todos los archivos tienen comentarios
   - Intenta entender cada función
   - Pregunta lo que no entiendas

4. **Próximos pasos**
   - Aprende sobre APIs REST
   - Estudia Node.js y Express
   - Aprende un framework (React, Vue)

---

## 🏆 ¡Buen trabajo!

Has completado un proyecto completo de e-commerce con JavaScript vanilla. Este es un gran paso en tu aprendizaje como desarrollador web.

**¡Sigue practicando! 💪**