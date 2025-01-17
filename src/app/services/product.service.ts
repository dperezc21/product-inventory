import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {Product} from '../interfaces/product-model';
import {PRODUCT_BASE_URL} from '../constants/url-constants';

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCT_BASE_URL}/all`)
      .pipe(map(value => value as Product[]));
  }
}
