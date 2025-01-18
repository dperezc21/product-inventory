import {Injectable} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from 'rxjs';
import {Category} from '../interfaces/category-model';

@Injectable({ providedIn: "root"})
export class CategoryController {
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private categoryService: CategoryService) {}

  getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.unsubscribe$), tap(value => this.setCategories$(value)))
      .subscribe();
  }

  getCategoryList$(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  setCategories$(categories: Category[]): void {
    this.categories$.next(categories);
  }

  onDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
