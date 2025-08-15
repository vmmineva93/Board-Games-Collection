import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailValidationDirective } from '../../directives/email-validation.directive.js';
import { DOMAINS } from '../../constants.js';
import { UserService } from '../user.service.js';
import { SafeStorageService } from '../../safe-storage.service.js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailValidationDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm | undefined;

  errorMessage: string | undefined

  domains = DOMAINS;

  get passwordsDontMatch(): boolean {
    return this.registerForm?.controls['password'].value !== this.registerForm?.controls['rePassword'].value
  }

  constructor(private userService: UserService, private router: Router, private safeStorage: SafeStorageService) { }

  register() {
    const { username, email, password, rePassword } = this.registerForm?.form.value;

    this.userService
      .register(username, email, password, rePassword)
      .subscribe((data) => {
        const token = data.accessToken;
        this.safeStorage.setItem('X-Authorization', token);
        this.router.navigate(['/home']);
      });
  }
}
