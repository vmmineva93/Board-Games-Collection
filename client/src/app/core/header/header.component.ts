import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service.js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
