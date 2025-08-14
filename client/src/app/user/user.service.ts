import { Injectable } from '@angular/core';
import { User } from '../types/user.js';
import { BehaviorSubject, Observable, of, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SafeStorageService } from '../safe-storage.service.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<User | null>(null);
  readonly user$ = this.user$$.asObservable();


  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
   
  }

  constructor(private http: HttpClient, private safeStorage: SafeStorageService) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`/api/users/login`, { email, password })
      .pipe(tap((user) => {
        this.user$$.next(user);
      }));
         
  }

  register(
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<User>(`/api/users/register`, {
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.get<User>(`/api/users/logout`, {}).pipe(
      tap((user) => {
        this.safeStorage.removeItem('X-Authorization');
        this.user$$.next(null);
      })
    );
  }

  getProfile(): Observable<User | null> {
    if (!this.isLogged) {
      return of(null);
    }

    return this.http
      .get<User>(`/api/users/me`)
      .pipe(tap((user) => this.user$$.next(user)));
  }
  
}



