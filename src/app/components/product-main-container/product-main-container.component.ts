import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProductController} from '../../core/controllers/product-controller';
import {Observable, take, tap} from 'rxjs';
import {Product} from '../../core/interfaces/product-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';

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

  constructor(private productController: ProductController) {}

  ngOnInit(): void {
    this.products$ = this.productController.getProducts$();
    this.productController.getAllProduct();
  }

  ngOnDestroy(): void {
    this.productController.onDestroy();
  }

  createProduct() {
    this.dialog.open(AddProductComponent, {
      height: "600px",
      width: "350px",
    });
  }
}
