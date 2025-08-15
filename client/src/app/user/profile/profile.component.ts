import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileDetails } from '../../types/user.js';
import { emailValidator } from '../../utils/emailValidator.js';
import { DOMAINS } from '../../constants.js';
import { UserService } from '../user.service.js';
import { Router } from '@angular/router';
import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {


    const { username, email } = this.userService.user!;
    this.profileDetails = { username, email };

    this.form.setValue({
      username,
      email,
    });
  }
}
