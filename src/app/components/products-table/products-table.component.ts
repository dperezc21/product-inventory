import {Component, Input} from '@angular/core';
import {Product} from '../../core/interfaces/product-model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

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
    MatHeaderRowDef
  ],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @Input() dataSource!: Product[];
  displayedColumns: string[] = ['name', 'price', 'stock', 'categoryName'];

}
