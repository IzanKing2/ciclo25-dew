import { Carrito } from "./Carrito.js";

export class Product {
    static count = 0;

    constructor(name, price) {
        this.id = Product.count++;
        this.name = name;
        this.price = price;
    }

    // Productos MOC de prueba
    productos() {
        return [
            new Product('Papas', 1),
            new Product('Cliper de fresa', 1.2),
            new Product('Chorizo Teror', 2.1),
            new Product('Queso', 0.6),
        ];
    }

    /**
     * Método para añadir productos a sessionStorage
     */
    addProductToSessionStorage() {
        if (!sessionStorage.getItem('productos')) {
            const productos = this.productos();
            sessionStorage.setItem('productos', JSON.stringify(productos));
        } else {
            const productos = JSON.parse(sessionStorage.getItem('productos'));
        }
    }

    /**
     * Método para pintar todos los productos dinámicamente
     */
    paintAllProuducts(carrito) {
        const DOMitems = document.getElementById('items');
        const productos = JSON.parse(sessionStorage.getItem('productos'));

        DOMitems.textContent = '';
        for (const product of productos) {
            const item = document.createElement('div');
            item.classList.add('card', 'col-sm-3', 'mb-3', 'text-center', 'p-2');

            const itemName = document.createElement('h5');
            itemName.classList.add('card-title');
            itemName.textContent = product.name;

            const itemIcon = document.createElement('i');
            itemIcon.classList.add('bi', 'bi-box-seam', 'mb-2');
            itemIcon.style.fontSize = '2rem';

            const itemPrice = document.createElement('p');
            itemPrice.textContent = product.price + '€';

            const itemButton = document.createElement('button');
            itemButton.classList.add('btn', 'btn-primary');
            itemButton.textContent = '+';
            itemButton.setAttribute('data-id', product.id);
            itemButton.addEventListener('click', () => carrito.addProductToCarrito(product.id));

            item.appendChild(itemIcon);
            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(itemButton);

            DOMitems.appendChild(item);
        }
    }
}