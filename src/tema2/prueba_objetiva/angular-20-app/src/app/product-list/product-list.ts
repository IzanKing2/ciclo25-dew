import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CategoryDetail } from '../category-detail/category-detail';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, CategoryDetail], // Importar CategoryDetail
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: Product[] = [];
  selected?: Product;

  constructor() {
    // Inicializa las categorías
    const cat1: Category = { id: 1, name: 'Tecnología', description: 'Productos electrónicos y gadgets' };
    const cat2: Category = { id: 2, name: 'Hogar', description: 'Artículos para el hogar' };

    // Inicializa la lista de productos
    this.products = [
      { id: 1, name: 'Laptop', price: 1200, category: cat1},
      { id: 2, name: 'Aspiradora', price: 250, category: cat2},
      { id: 3, name: 'Smartphone', price: 900, category: cat1},
    ];
  }

  // Selecciona un producto
  select(product: Product) {
    this.selected = product;
  }
}
