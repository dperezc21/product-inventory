import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProductController} from '../../core/controllers/product-controller';
import {combineLatestAll, concatMap, EMPTY, iif, map, mergeAll, Observable, of, switchMap, take, tap} from 'rxjs';
import {Product} from '../../core/interfaces/product-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProductsTableComponent} from '../products-table/products-table.component';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';
import {CategoryController} from '../../core/controllers/category.controller';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import {log} from 'node:util';

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

  deleteProduct(productToDelete: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "350px",
      height: "200px",
      disableClose: false
    });
    dialogRef.componentInstance.message = `Are you sure that would delete this product?`;
    dialogRef.componentInstance.title = `Delete ${productToDelete.productName}`;
    dialogRef.afterClosed().pipe(concatMap(value => {
      return iif(() => value,
        this.productController.deleteProduct(productToDelete.id as number), EMPTY)
    })).subscribe();
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
