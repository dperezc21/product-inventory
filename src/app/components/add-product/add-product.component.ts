import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../core/interfaces/product-model';
import {ProductController} from '../../core/controllers/product-controller';
import {Category} from '../../core/interfaces/category-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {CategoryController} from '../../core/controllers/category.controller';
import {Observable} from 'rxjs';
import {MatTabGroup} from '@angular/material/tabs';
import {ProductFormComponent} from '../product-form/product-form.component';

@Component({
  selector: 'app-add-product',
  imports: [
    AsyncPipe,
    MatTabGroup,
    ProductFormComponent,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);
  categories$!: Observable<Category[]>;
  createCategory!: boolean;

  constructor(private productController: ProductController,
              private categoryController: CategoryController) {}

  closeDialog() {
    this.dialogRef.close();
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

  enableCreateCategory() {
    this.createCategory = !this.createCategory;
  }
}
