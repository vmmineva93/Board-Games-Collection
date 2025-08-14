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

  getSingleGame(id: string) {
    return this.http.get<Game>(`/api/data/games/${id}`);
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

  deleteGame(id: string) {
    return this.http.delete(`/api/data/games/${id}`);
  }

  likeGame<Game>(gameId: string) {
    const payload = { gameId };

    return this.http.post<Game>(`/api/data/likes`, payload);
  }

  getLikesOnGame(gameId: string) {
    return this.http.get(`/api/data/likes?where=gameId%3D"${gameId}"`);
  }


}
