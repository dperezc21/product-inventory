import {Component, inject, model, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {Product} from '../../core/interfaces/product-model';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {ProductController} from '../../core/controllers/product-controller';
import {Category} from '../../core/interfaces/category-model';
import {AsyncPipe, NgForOf} from '@angular/common';
import {CategoryController} from '../../core/controllers/category.controller';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatCardActions,
    MatButton,
    MatLabel,
    MatInput,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);
  categories$!: Observable<Category[]>;
  addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productController: ProductController,
              private categoryController: CategoryController) {}

  close() {
    this.dialogRef.close();
  }

  saveProduct(value: any) {
    const productToSave: Product = {
      productName: value.name,
      stock: value.stock,
      productPrice: value.price,
      category: value.category
    }
    this.productController.createProduct(productToSave, this.close);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryController.getCategoryList$();
    this.addProductForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      //category: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.categoryController.onDestroy();
  }

}
