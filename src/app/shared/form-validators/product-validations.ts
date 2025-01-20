import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function validPositiveNumber(control: AbstractControl): ValidationErrors | null {
  const isValid = control.value >= 0;
  return isValid ? null : { invalidNumber: { value: control.value }};
}
