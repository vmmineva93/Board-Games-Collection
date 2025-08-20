import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Game, GamePayload, Like } from './types/games.js';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '/api/data';

  constructor(private http: HttpClient) {}

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

  likeGame(gameId: string): Observable<Like> {
    const payload = { gameId };
    return this.http.post<Like>(`${this.baseUrl}/likes`, payload);
  }

  getLikesOnGame(gameId: string): Observable<Like[]> {
    return this.http
      .get<Like[]>(`${this.baseUrl}/likes?where=gameId%3D"${gameId}"`)
      .pipe(
        map((likes) => likes || []) 
      );
  }
}
