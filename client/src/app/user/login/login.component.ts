import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service.js';
import { DOMAINS } from '../../constants.js';
import { EmailValidationDirective } from '../../directives/email-validation.directive.js';
import { SafeStorageService } from '../../safe-storage.service.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, EmailValidationDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string | null = null;
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router, private safeStorage: SafeStorageService) {}

  login(form: NgForm) {
    
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    
    this.userService.login(email, password).subscribe((data) => {
      const token = data.accessToken;
      this.safeStorage.setItem('X-Authorization', token);
      this.router.navigate(['/home']);
    })
  }

}
