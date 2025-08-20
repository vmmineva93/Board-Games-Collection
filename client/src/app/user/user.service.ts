import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SafeStorageService } from '../safe-storage.service.js';

import { User, UserCredentials, RegisterPayload, AuthResponse } from '../types/user.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly AUTH_TOKEN = 'X-Authorization';
  private readonly USER = 'user';
  private user$$ = new BehaviorSubject<User | null>(null);
  readonly user$ = this.user$$.asObservable();

  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private safeStorage: SafeStorageService) {
    this.user$$.next(this.getLocalUser());
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`/api/users/login`, credentials)
      .pipe(
        tap(user => {
          this.storeLocalUser(user);
          this.user$$.next(user);
        })
      );
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`/api/users/register`, payload)
      .pipe(
        tap(user => {
          this.storeLocalUser(user);
          this.user$$.next(user);
        })
      );
  }

  logout(): Observable<void> {
    return this.http.get<void>(`/api/users/logout`).pipe(
      tap(() => {
        this.safeStorage.removeItem(this.AUTH_TOKEN);
        this.safeStorage.removeItem(this.USER);
        this.user$$.next(null);
      })
    );
  }

  getProfile(): Observable<User | null> {
    if (!this.user$$.value) {
      return of(null);
    }

    return this.http.get<User>(`/api/users/me`).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  private storeLocalUser(user: User): void {
    this.safeStorage.setItem(this.USER, JSON.stringify(user));
  }

  private getLocalUser(): User | null {
    try {
      const userJson = this.safeStorage.getItem(this.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }
}



