import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProductController} from '../../core/controllers/product-controller';
import {Observable, take, tap} from 'rxjs';
import {Product} from '../../core/interfaces/product-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';
import {Category} from '../../core/interfaces/category-model';
import {CategoryController} from '../../core/controllers/category.controller';

@Component({
  selector: 'app-product-main-container',
  imports: [
    NgIf,
    AsyncPipe,
    ProductsTableComponent
  ],
  templateUrl: './product-main-container.component.html',
  standalone: true,
  styleUrl: './product-main-container.component.css'
})
export class ProductMainContainerComponent implements OnInit, OnDestroy {

  products$!: Observable<Product[]>;
  private readonly dialog: MatDialog = inject(MatDialog);

  constructor(private productController: ProductController,
              private categoryController: CategoryController) {}

  createProduct() {
    this.dialog.open(AddProductComponent, {
      height: "450px",
      width: "350px",
    });
  }

  ngOnInit(): void {
    this.products$ = this.productController.getProducts$();
    this.productController.getAllProduct();
    this.categoryController.getCategories();
  }

  ngOnDestroy(): void {
    this.productController.onDestroy();
  }
}
