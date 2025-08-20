// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Game } from './types/games.js';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http: HttpClient) { }

//   getGames() {
//     return this.http.get<Game[]>(`/api/data/games`);
//   }

//   getSingleGame(id: string) {
//     return this.http.get<Game>(`/api/data/games/${id}`);
//   }

//   createGame(
//     title: string, 
//     players: string, 
//     playingTime: string, 
//     age: string, 
//     categories: string, 
//     imageUrl: string, 
//     description: string,
//   ) {
//     const payload = { title, players, playingTime, age, categories, imageUrl, description };

//     return this.http.post<Game>(`/api/data/games`, payload);
//   }

//   deleteGame(id: string) {
//     return this.http.delete(`/api/data/games/${id}`);
//   }

//   updateGame(
//     gameId: string,
//     title: string, 
//     players: string, 
//     playingTime: string, 
//     age: string, 
//     categories: string, 
//     imageUrl: string, 
//     description: string
//   ) {
//     const payload = { title, players, playingTime, age, categories, imageUrl, description };
//     return this.http.put<Game>(`/api/data/games/${gameId}`, payload);
//   }

//   likeGame<Game>(gameId: string) {
//     const payload = { gameId };

//     return this.http.post<Game>(`/api/data/likes`, payload);
//   }

//   getLikesOnGame(gameId: string) {
//     return this.http.get(`/api/data/likes?where=gameId%3D"${gameId}"`);
//   }


// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game, GamePayload, Like } from './types/games.js';
import { User } from './types/user.js';

// DTO (payload) за create / update


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '/api/data';

  constructor(private http: HttpClient) {}

  // ----------- Games -----------

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`);
  }

  getSingleGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/games/${id}`);
  }

  createGame(payload: GamePayload): Observable<Game> {
    return this.http.post<Game>(`${this.baseUrl}/games`, payload);
  }

  updateGame(gameId: string, payload: GamePayload): Observable<Game> {
    return this.http.put<Game>(`${this.baseUrl}/games/${gameId}`, payload);
  }

  deleteGame(gameId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/games/${gameId}`);
  }

  // ----------- Likes -----------

  likeGame(gameId: string): Observable<Like> {
    const payload = { gameId };
    return this.http.post<Like>(`${this.baseUrl}/likes`, payload);
  }

  getLikesOnGame(gameId: string): Observable<Like[]> {
    return this.http
      .get<Like[]>(`${this.baseUrl}/likes?where=gameId%3D"${gameId}"`)
      .pipe(
        map((likes) => likes || []) // гарантира масив, дори ако е празен
      );
  }
}
