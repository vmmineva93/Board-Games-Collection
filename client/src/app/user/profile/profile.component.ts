import { Component, OnInit } from '@angular/core';
import { ProfileDetails } from '../../types/user.js';
import { UserService } from '../user.service.js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = this.userService.user;
    if (user) {
      this.profileDetails = { username: user.username, email: user.email };
    }
  }
}
