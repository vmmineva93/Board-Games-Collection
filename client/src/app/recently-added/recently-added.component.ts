import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service.js';
import { Game } from '../types/games.js';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component.js';
import { SlicePipe } from '../shared/pipes/slice.pipe.js';

@Component({
  selector: 'app-recently-added',
  imports: [RouterLink, LoaderComponent, SlicePipe],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.css'
})
export class RecentlyAddedComponent implements OnInit{
  lastFour: Game[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getGames().subscribe(games => {
      this.isLoading = false;
      this.lastFour = games.slice(-4); 
      
    });
  }
}
