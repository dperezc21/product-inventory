import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductController} from '../../core/controllers/product-controller';
import {Observable} from 'rxjs';
import {Product} from '../../core/interfaces/product-model';
import {AsyncPipe, NgIf} from '@angular/common';
import {ProductsTableComponent} from '../products-table/products-table.component';

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

  constructor(private productController: ProductController) {}

  ngOnInit(): void {
    this.products$ = this.productController.getProducts$();
    this.productController.getAllProduct();
  }

  ngOnDestroy(): void {
    this.productController.onDestroy();
  }

}
