import { Directive } from '@angular/core';

import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { imageValidator } from '../utils/imageValidator.js';


@Directive({
  selector: '[appImageValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ImageUrlValidationDirective,
    },
  ],
})
export class ImageUrlValidationDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {

    const validatorFn = imageValidator();
    return validatorFn(control);

  }
}
