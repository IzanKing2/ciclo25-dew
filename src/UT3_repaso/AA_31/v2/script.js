// Elementos del DOM
const formSection = document.getElementById('formSection');
const tableSection = document.getElementById('tableSection');
const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', (e) => {
    e.preventDefault;

    const errorMessage =  document.getElementById('errorMessage');
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const stock = document.getElementById('stock').value;
    const price = document.getElementById('price').value;
    const featured = document.getElementById('featured').value;

    if (stock < 1) {
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = 'El stock debe ser superior a 1';
    }

    const PRODUCT = {
        name: name,
        description: description,
        stock: stock,
        price: price,
        featured: featured
    };
});