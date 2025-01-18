import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCardActions} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './category-form.component.html',
  standalone: true,
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  categoryNameForm!: FormControl;
  @Output() categoryToSave: EventEmitter<string> = new EventEmitter();
  @Output() goBack: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.categoryNameForm = new FormControl('', [Validators.required]);
  }

}
