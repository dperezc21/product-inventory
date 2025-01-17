import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class ProductController {
  private unsubscribe$: Subject<void> = new Subject();
  private productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productService: ProductService,
              private snackBarService: SnackBarService) {}

  getAllProduct(): void {
    /*const product: Product[] = [
      {productName: "hola", productPrice: 199, category: {categoryName: "name", id: 0}, stock: 21}
    ];
    this.setProducts$(product);*/
    this.productService.getProductList()
      .pipe(takeUntil(this.unsubscribe$), tap({
        next: (products: Product[]) => this.setProducts$(products),
        error: () => this.snackBarService.showSnackBar("Error unexpected")
      })).subscribe();
  }

  setProducts$(products: Product[]): void {
    this.productList$.next(products);
  }

  getProducts$(): Observable<Product[]> {
    return this.productList$.asObservable();
  }

  onDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
