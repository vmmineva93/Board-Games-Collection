import { Component, OnInit } from '@angular/core';
import { Game } from '../types/games.js';
import { ApiService } from '../api.service.js';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component.js';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  games: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}



  ngOnInit() {
    
    this.apiService.getGames().subscribe((games) => {
      this.games = games;
      
      this.isLoading = false; 
    });

  }
}
