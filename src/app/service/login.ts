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

  login(nome: any, senha: any, manterConectado: boolean): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3001/login', { nome, senha })
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

  getUserType(): 'pessoa' | 'ong' | null {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (userString) {
        const user: Usuario = JSON.parse(userString);
        return user.tipo;
      }
    }
    return null;
  }
}