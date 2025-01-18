import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../core/interfaces/product-model';
import {ProductController} from '../../core/controllers/product-controller';
import {Category} from '../../core/interfaces/category-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {CategoryController} from '../../core/controllers/category.controller';
import {Observable} from 'rxjs';
import {ProductFormComponent} from '../product-form/product-form.component';
import {CategoryFormComponent} from '../category-form/category-form.component';

@Component({
  selector: 'app-add-product',
  imports: [
    AsyncPipe,
    ProductFormComponent,
    NgIf,
    CategoryFormComponent
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);
  categories$!: Observable<Category[]>;
  isCreatingCategory!: boolean;

  constructor(private productController: ProductController,
              private categoryController: CategoryController) {}

  closeDialog() {
    this.dialogRef.close();
  }

  enableCreateCategory = () => {
    this.isCreatingCategory = !this.isCreatingCategory;
  }

  createCategory(categoryName: string) {
    this.categoryController.createCategory(categoryName, this.enableCreateCategory);
  }

  saveProduct(productToSave: Product) {
    this.productController.createProduct(productToSave, this.dialogRef);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryController.getCategoryList$();
  }

  ngOnDestroy(): void {
    this.categoryController.onDestroy();
  }
}
