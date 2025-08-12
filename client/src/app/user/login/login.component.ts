import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service.js';
import { DOMAINS } from '../../constants.js';
import { EmailValidationDirective } from '../../directives/email-validation.directive.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, EmailValidationDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.login(email, password);
  }

}
