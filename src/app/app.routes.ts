import { Routes } from '@angular/router';
import {ProductMainContainerComponent} from './components/product-main-container/product-main-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: "full"
  },
  {
    path: 'products',
    component: ProductMainContainerComponent
  }
];
