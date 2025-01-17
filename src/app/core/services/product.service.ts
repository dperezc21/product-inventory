import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {PRODUCT_BASE_URL} from '../../shared/constants/url-constants';

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCT_BASE_URL}/all`)
      .pipe(map(value => value as Product[]));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${PRODUCT_BASE_URL}`, product)
      .pipe(map((value: Product) => value));
  }

  deleteProductById(productId: number): Observable<any> {
    return this.http.delete(`${PRODUCT_BASE_URL}/${productId}` ).pipe(map(value => value));
  }

  editProduct(id: number | undefined, productToSave: Product): Observable<any> {
    return this.http.put(`${PRODUCT_BASE_URL}/${id}`, productToSave).pipe(map(value => value));
  }
}
