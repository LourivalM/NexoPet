import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  http = inject(HttpClient);

  login(login: any, senha: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/login`, { login, senha });
  }
}