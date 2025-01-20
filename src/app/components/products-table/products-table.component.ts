import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Product} from '../../core/interfaces/product-model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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
    MatIconModule,
    MatNoDataRow,
    MatPaginator
  ],
  templateUrl: './products-table.component.html',
  standalone: true,
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() addProduct: EventEmitter<void> = new EventEmitter();
  @Output() editProduct: EventEmitter<Product> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter();
  @Input() products!: Product[];
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'price', 'stock', 'categoryName', 'menu'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["products"]?.currentValue && !changes["products"].firstChange) {
      this.dataSource = new MatTableDataSource(changes["products"].currentValue);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
