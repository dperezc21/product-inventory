import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({ providedIn: "root"})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string = "Ok", duration: number = 2000) {
    this.snackBar.open(message, action, { duration });
  }
}
