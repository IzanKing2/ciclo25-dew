import { Component, Input, input } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-detail',
  imports: [],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.css',
})
export class CategoryDetail {
    @Input() category!: Category;
}
