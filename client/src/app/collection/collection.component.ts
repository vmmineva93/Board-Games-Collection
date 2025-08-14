import { Component, OnInit } from '@angular/core';
import { Game } from '../types/games.js';
import { ApiService } from '../api.service.js';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}



  ngOnInit() {
    this.apiService.getGames().subscribe((games) => {
      this.games = games;
      
      this.isLoading = false; 
    });

  }
}
