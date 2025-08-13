import { Component } from '@angular/core';
import { UserService } from '../user/user.service.js';
import { HomeComponent } from '../home/home.component.js';
import { CollectionComponent } from '../collection/collection.component.js';

@Component({
  selector: 'app-main',
  imports: [HomeComponent, CollectionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
