import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  http=inject(HttpClient);
  platformId = inject(PLATFORM_ID);

  login(login: any, senha: any, manterConectado: boolean): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3001/login', { login, senha })
    .pipe( 
      tap( 
        (user)=> {
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

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
    }
  }

  getUser(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
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
}