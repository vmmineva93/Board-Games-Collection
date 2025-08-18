import { Component, OnInit } from '@angular/core';
import { Game } from '../types/games.js';
import { ApiService } from '../api.service.js';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component.js';
import { SlicePipe } from '../shared/pipes/slice.pipe.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [RouterLink, LoaderComponent, SlicePipe, FormsModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  isLoading = true;
  searchText: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }



  ngOnInit() {

    this.apiService.getGames().subscribe((games) => {
      this.games = games;
      this.filteredGames = games;
      this.isLoading = false;
    });

  }

  onSearch() {
    const text = this.searchText.toLowerCase();
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(text)
    );
  }
}
