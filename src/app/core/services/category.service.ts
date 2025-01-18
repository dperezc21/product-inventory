import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../interfaces/category-model';
import {map, Observable} from 'rxjs';
import {CATEGORY_BASE_URL} from '../../shared/constants/url-constants';

@Injectable({ providedIn: "root"})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${CATEGORY_BASE_URL}/all`)
      .pipe(map(value => value));
  }
}
