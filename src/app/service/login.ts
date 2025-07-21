import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../models/user';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  http=inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  router = inject(Router);

  login(login: any, senha: any, manterConectado: boolean): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/login`, { login, senha })
    .pipe(
      tap(
        (user)=> {
          console.log('LoginService: Usuário recebido da API:', user);
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('user', JSON.stringify(user));
            if (manterConectado) {
              localStorage.setItem('user', JSON.stringify(user));
            } else {
              localStorage.removeItem('user');
            }
          }
        }
      )
    )
  }

  updateUser(userId: number, userData: any): Observable<Usuario> {
    return this.http.patch<Usuario>(`${environment.apiUrl}/users/${userId}`, userData)
      .pipe(
        tap(updatedUser => {
          console.log('LoginService: Usuário atualizado recebido da API:', updatedUser);
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            if (localStorage.getItem('user')) {
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }
          }
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    }
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

  getUserType(): 'pessoa' | 'ong' | 'parceiro' | null {
    const user = this.getUser();
    return user ? user.tipo : null;
  }

  getUserNickname(): string | null {
    const user = this.getUser();
    return user ? user.nickname || user.nome || user.nomeInstituicao || null : null;
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/users/${id}`);
  }
}