import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject, Observable, take, tap} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class ProductController {

  private productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productService: ProductService,
              private snackBarService: SnackBarService) {}

  getAllProduct(): void {
    this.productService.getProductList()
      .pipe(take(1), tap({
        next: (products: Product[]) => this.setProducts$(products),
        error: err => this.snackBarService.showSnackBar("Error unexpected")
      })).subscribe();
  }

  setProducts$(products: Product[]): void {
    this.productList$.next(products);
  }

  getProducts$(): Observable<Product[]> {
    return this.productList$.asObservable();
  }
}
