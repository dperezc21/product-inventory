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
    NgForOf
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
  addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

  saveProduct(value: any) {
    const product: Product = {
      productName: value.name,
      stock: value.stock,
      productPrice: value.price,
      category: value.category
    }
    this.productToSave.emit(product);
  }
}
