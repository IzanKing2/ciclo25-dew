export class Carrito {
    constructor() {
        this.products = {};
        this.total = 0;
    }

    /**
     * Método para añadir un producto al carrito
     * @param {string|number} productId
     */
    addProductToCarrito(productId) {
        if (this.products[productId]) {
            this.products[productId]++;
        } else {
            this.products[productId] = 1;
        }
        this.paintCarrito();
    }

    /**
     * Método para eliminar (restar) un producto del carrito
     * @param {string|number} productId
     */
    removeProductFromCarrito(productId) {
        if (this.products[productId]) {
            this.products[productId]--;
            if (this.products[productId] <= 0) {
                delete this.products[productId];
            }
        }
        this.paintCarrito();
    }

    /**
     * Método para vaciar el carrito
     */
    emptyCarrito() {
        this.products = {};
        this.paintCarrito();
    }

    paintCarrito() {
        const DOMcarrito = document.getElementById('carrito');
        const DOMtotal = document.getElementById('total');
        DOMcarrito.textContent = '';

        const storageProducts = JSON.parse(sessionStorage.getItem('productos'));
        let totalCarrito = 0;

        for (const id in this.products) {
            const quantity = this.products[id];
            const productInfo = storageProducts.find(p => p.id == id);

            if (productInfo) {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

                const text = document.createElement('span');
                text.textContent = `${quantity} x ${productInfo.name} - ${productInfo.price}€`;

                const btnRemove = document.createElement('button');
                btnRemove.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
                btnRemove.textContent = '-';
                btnRemove.style.marginLeft = '1rem';
                btnRemove.addEventListener('click', () => this.removeProductFromCarrito(id));

                li.appendChild(text);
                li.appendChild(btnRemove);
                DOMcarrito.appendChild(li);

                // Calculamos el subtotal de este producto
                totalCarrito += productInfo.price * quantity;
            }
        }

        if (DOMtotal) {
            DOMtotal.textContent = totalCarrito.toFixed(2);
        }
    }
}