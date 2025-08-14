import { Component } from '@angular/core';
import { ApiService } from '../../api.service.js';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.css'
})
export class AddGameComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addGame(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    const { title, players, playingTime, age, categories, imageUrl, description } = form.value;
   
    this.apiService.createGame(title, players, playingTime, age, categories, imageUrl, description).subscribe(() => {
      this.router.navigate(['/collection']);
    });
  }
}
