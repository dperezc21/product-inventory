import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {SnackBarService} from '../services/snack-bar.service';
import {MatDialogRef} from '@angular/material/dialog';

@Injectable({ providedIn: "root" })
export class ProductController {
  private unsubscribe$: Subject<void> = new Subject();
  private productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productService: ProductService,
              private snackBarService: SnackBarService) {}

  getAllProduct(): void {
    this.productService.getProductList()
      .pipe(takeUntil(this.unsubscribe$), tap({
        next: (products: Product[]) => this.setProducts$(products),
        error: () => this.snackBarService.showSnackBar("Error unexpected")
      })).subscribe();
  }

  createProduct(product: Product, dialog?: MatDialogRef<any>): void {
    this.productService.saveProduct(product)
      .pipe(takeUntil(this.unsubscribe$),
        tap({
          next: (productCreated: Product) => {
            this.setNewProduct(productCreated);
            dialog?.close();
            this.snackBarService.showSnackBar("product saved")
          },
          error: () => this.snackBarService.showSnackBar("product not saved")
        }))
      .subscribe();
  }

  setProducts$(products: Product[]): void {
    this.productList$.next(products);
  }

  getProducts$(): Observable<Product[]> {
    return this.productList$.asObservable();
  }

  setNewProduct(product: Product): void {
    this.setProducts$([...this.productList$.getValue(), product]);
  }

  onDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
