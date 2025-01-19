import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class ProductController {
  private unsubscribe$: Subject<void> = new Subject();
  private productListBS: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productService: ProductService,
              private snackBarService: SnackBarService) {}

  getAllProduct(): void {
    this.productService.getProductList()
      .pipe(takeUntil(this.unsubscribe$), tap({
        next: (products: Product[]) => this.setProducts$(products),
        error: () => this.snackBarService.showSnackBar("Error unexpected")
      })).subscribe();
  }

  createProduct(product: Product, closeDialog?: () => void): void {
    this.productService.saveProduct(product)
      .pipe(takeUntil(this.unsubscribe$),
        tap({
          next: (productCreated: Product) => {
            this.setNewProduct(productCreated);
            closeDialog?.();
            this.snackBarService.showSnackBar("product saved")
          },
          error: () => this.snackBarService.showSnackBar("product not saved")
        }))
      .subscribe();
  }

  deleteProduct(productId: number): Observable<any> {
    return this.productService.deleteProductById(productId)
      .pipe(tap({
        next: () => {
          this.removeProductOfList(productId);
          this.snackBarService.showSnackBar("product deleted")
        }, error: () => this.snackBarService.showSnackBar("Error unexpected")
      }));
  }

  editProduct(productToEdit: Product, closeDialog: () => void) {
    this.productService.editProduct(productToEdit.id, productToEdit)
      .pipe(takeUntil(this.unsubscribe$),
        tap({
          next: () => {
            closeDialog?.();
            this.setProductEdited(productToEdit)
            this.snackBarService.showSnackBar("product updated")
          },
          error: () => this.snackBarService.showSnackBar("product not updated")
        }))
      .subscribe();
  }

  setProducts$(products: Product[]): void {
    this.productListBS.next(products);
  }

  getProducts$(): Observable<Product[]> {
    return this.productListBS.asObservable();
  }

  setNewProduct(product: Product): void {
    this.setProducts$([...this.productListBS.getValue(), product]);
  }

  removeProductOfList(productId: number): void {
    const products: Product[]= this.productListBS.getValue().filter(product => product.id != productId);
    this.setProducts$(products);
  }

  setProductEdited(productEdited: Product): void {
    const products: Product[]= this.productListBS.getValue()
      .map(product => product.id == productEdited.id ? productEdited : product);
    this.setProducts$(products);
  }

  onDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
