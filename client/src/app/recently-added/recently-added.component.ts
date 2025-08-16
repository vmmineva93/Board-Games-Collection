import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service.js';
import { Game } from '../types/games.js';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recently-added',
  imports: [RouterLink],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.css'
})
export class RecentlyAddedComponent implements OnInit{
  lastThree: Game[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getGames().subscribe(games => {
      this.lastThree = games.slice(-4); 
    });
  }
}
