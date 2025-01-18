import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {Product} from '../../core/interfaces/product-model';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    /*MatSelect,
    MatOption,*/
    MatCardActions,
    MatButton,
    MatLabel,
    MatInput
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<this>);
  addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  close() {
    this.dialogRef.close();
  }

  saveProduct(value: any) {
    const productToSave: Product = {
      productName: value.name,
      stock: value.stock,
      productPrice: value.price,
      category: value.category
    }

    this.dialogRef.close(productToSave);
  }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    });
  }

}
