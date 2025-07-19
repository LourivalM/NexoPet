import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/user';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  http=inject(HttpClient);
  platformId = inject(PLATFORM_ID);

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
        const user = JSON.parse(userString);
        console.log('LoginService: Usuário recuperado do Storage:', user);
        return user;
      }
    }
    console.log('LoginService: Nenhum usuário encontrado no Storage.');
    return null;
  }

  getUserType(): 'pessoa' | 'ong' | 'parceiro' | null {
    const user = this.getUser();
    console.log('LoginService: Tipo de usuário:', user?.tipo);
    return user ? user.tipo : null;
  }

  getUserNickname(): string | null {
    const user = this.getUser();
    console.log('LoginService: Nickname de usuário:', user?.nickname);
    return user ? user.nickname || user.nome || user.nomeInstituicao || null : null;
  }
}