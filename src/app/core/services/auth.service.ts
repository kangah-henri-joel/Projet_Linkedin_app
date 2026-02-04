import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly TOKEN_KEY = 'linkedin_token';
  private readonly USER_KEY = 'linkedin_user';

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  constructor() {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Simulation d'une requête API
    const mockUser: User = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'assets/images/KangahHenriJoel.jpg'
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token'
    };

    return of(response).pipe(
      tap(res => this.setAuth(res))
    );
  }

  register(userData: any): Observable<AuthResponse> {
    // Simulation d'inscription
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatar: 'assets/images/KangahHenriJoel.jpg'
    };

    const response: AuthResponse = {
      user: newUser,
      token: 'mock-jwt-token'
    };

    return of(response).pipe(
      tap(res => this.setAuth(res))
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private setAuth(auth: AuthResponse): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.TOKEN_KEY, auth.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    }
    this.currentUserSubject.next(auth.user);
  }

  private loadUserFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem(this.USER_KEY);
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }
}
