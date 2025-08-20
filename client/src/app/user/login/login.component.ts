import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service.js';
import { DOMAINS } from '../../constants.js';
import { EmailValidationDirective } from '../../directives/email-validation.directive.js';
import { SafeStorageService } from '../../safe-storage.service.js';
import { emailValidator } from '../../utils/emailValidator.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string | null = null;

  form = new FormGroup ({
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private userService: UserService, private router: Router, private safeStorage: SafeStorageService) {}

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  get isNotMinPassword() {
    return (
      this.form.get('password')?.touched &&
      this.form.get('password')?.errors?.['minlength']
    );
  }



  login() {
    
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;
    
    this.userService.login({email: email!, password: password!}).subscribe((data) => {
      const token = data.accessToken;
      this.safeStorage.setItem('X-Authorization', token);
      this.router.navigate(['/home']);
    })
  }

}
