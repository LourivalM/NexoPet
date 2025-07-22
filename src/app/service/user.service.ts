import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/user';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private _currentUser = new BehaviorSubject<Usuario | null>(this.getStoredUser());
  readonly currentUser = this._currentUser.asObservable();

  constructor() { }

  private getStoredUser(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
    }
    return null;
  }

  login(login: any, senha: any, manterConectado: boolean): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/login`, { login, senha })
      .pipe(
        tap(
          (user) => {
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem('user', JSON.stringify(user));
              if (manterConectado) {
                localStorage.setItem('user', JSON.stringify(user));
              } else {
                localStorage.removeItem('user');
              }
            }
            this._currentUser.next(user);
          }
        )
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
    }
    this._currentUser.next(null);
  }

  setCurrentUser(user: Usuario | null): void {
    this._currentUser.next(user);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUser(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        return user;
      }
    }
    return null;
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(userId: number, userData: any): Observable<Usuario> {
    return this.http.patch<Usuario>(`${environment.apiUrl}/users/${userId}`, userData)
      .pipe(
        tap(updatedUser => {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            if (localStorage.getItem('user')) {
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
            this._currentUser.next(updatedUser);
          }
        })
      );
  }

  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email?email=${email}`);
  }

  requestPasswordReset(email: string): Observable<{ exists: boolean }> {
    return this.checkEmailExists(email);
  }
}
