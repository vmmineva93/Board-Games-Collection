import { Injectable } from '@angular/core';
import { User, UserForAuth } from '../types/user.js';
import { BehaviorSubject, Observable, of, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SafeStorageService } from '../safe-storage.service.js';

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
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }


  login(email: string, password: string) {
    return this.http
      .post<User>(`/api/users/login`, { email, password })
      .pipe(tap((user) => {
        this.storeLocalUser(user);
        this.user$$.next(user);
      }));
         
  }

  register(
    username: string,
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
      .pipe(tap((user) => {
        this.storeLocalUser(user);
        this.user$$.next(user);
      }));
  }

  logout() {
    return this.http.get<User>(`/api/users/logout`, {}).pipe(
      tap((user) => {
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

    return this.http
      .get<User>(`/api/users/me`)
      .pipe(tap((user) => this.user$$.next(user)));
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



