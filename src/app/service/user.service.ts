import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/user';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { loginService } from './login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private platformId = inject(PLATFORM_ID);
  private _currentUser = new BehaviorSubject<Usuario | null>(this.getStoredUser());
  readonly currentUser = this._currentUser.asObservable();

  constructor(private http: HttpClient, private loginService: loginService) { }

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
    return this.loginService.login(login, senha, manterConectado).pipe(
      tap(user => {
        this._currentUser.next(user);
      })
    );
  }

  logout(): void {
    this.loginService.logout();
    this._currentUser.next(null);
  }

  setCurrentUser(user: Usuario | null): void {
    this._currentUser.next(user);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
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
}
