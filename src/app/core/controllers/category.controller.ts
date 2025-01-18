import {Injectable} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from 'rxjs';
import {Category} from '../interfaces/category-model';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root"})
export class CategoryController {
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private categoryService: CategoryService,
              private snackBarService: SnackBarService) {}

  getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(takeUntil(this.unsubscribe$), tap(value => this.setCategories$(value)))
      .subscribe();
  }

  createCategory(categoryName: string, goBack?:() => void) {
    const category: Category = { categoryName: categoryName };
    this.categoryService.saveCategory(category).pipe(takeUntil(this.unsubscribe$),
      tap({
        next: value => {
          if(value.id) {
            this.setNewCategory$(value);
            goBack?.();
            this.snackBarService.showSnackBar("category created")
          }
        }
      })).subscribe();
  }

  getCategoryList$(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  setCategories$(categories: Category[]): void {
    this.categories$.next(categories);
  }

  setNewCategory$(categoryAdded: Category): void {
    this.categories$.next([...this.categories$.getValue(), categoryAdded]);
  }

  onDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
