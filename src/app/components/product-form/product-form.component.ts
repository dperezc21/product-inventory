import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../../core/interfaces/category-model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Product} from '../../core/interfaces/product-model';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-form',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatCardActions,
    MatButton,
    MatLabel,
    NgForOf,
    MatIcon
  ],
  templateUrl: './product-form.component.html',
  standalone: true,
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() productToSave: EventEmitter<Product> = new EventEmitter();
  @Output() createCategory: EventEmitter<void> = new EventEmitter();
  @Input() categories!: Category[];
  @Input() productToEdit!: Product;
  productForm!: FormGroup;
  buttonAction!: string;

  constructor(private formBuilder: FormBuilder) {}

  findCategory(categoryId: number): Category {
    return this.categories.find(value => value.id == categoryId) as Category;
  }

  ngOnInit(): void {
    this.buttonAction = this.productToEdit?.id ? 'Edit' : 'Save'
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.productToEdit?.productName ?? '', [Validators.required]),
      price: new FormControl(this.productToEdit?.productPrice ?? '', [Validators.required]),
      stock: new FormControl(this.productToEdit?.stock ?? '', [Validators.required]),
      category: new FormControl(this.productToEdit?.category.id ?? '', [Validators.required])
    });
  }

  saveProduct(value: any) {
    const product: Product = {
      id: this.productToEdit?.id,
      productName: value.name,
      stock: value.stock,
      productPrice: value.price,
      category: this.findCategory(value.category)
    }
    this.productToSave.emit(product);
  }
}
