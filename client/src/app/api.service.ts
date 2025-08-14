import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './types/games.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getGames() {
    return this.http.get<Game[]>(`/api/data/games`);
  }

  createGame(
    title: string, 
    players: string, 
    playingTime: string, 
    age: string, 
    categories: string, 
    imageUrl: string, 
    description: string,
  ) {
    const payload = { title, players, playingTime, age, categories, imageUrl, description };

    return this.http.post<Game>(`/api/data/games`, payload);
  }

}
