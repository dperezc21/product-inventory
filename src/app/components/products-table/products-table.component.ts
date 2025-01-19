import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../core/interfaces/product-model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-products-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton,
    MatIconModule
  ],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @Output() addProduct: EventEmitter<void> = new EventEmitter();
  @Output() editProduct: EventEmitter<Product> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter();
  @Input() dataSource!: Product[];
  displayedColumns: string[] = ['name', 'price', 'stock', 'categoryName', 'menu'];

}
