import {Category} from './category-model';

export interface Product {
  id: number;
  productName: string;
  stock: number;
  productPrice: number;
  category: Category;
}
