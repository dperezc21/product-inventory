import {Component, inject} from '@angular/core';
import {MatCardTitle} from '@angular/material/card';
import {MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatCardTitle,
    MatButton
  ],
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  message!: string;
  title!: string;
}
