import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service.js';
import { RouterLink } from '@angular/router';
import { UserService } from '../user/user.service.js';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }


  constructor(private userService: UserService){}
}
