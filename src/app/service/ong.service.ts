import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ong } from '../models/ong';

@Injectable({
  providedIn: 'root'
})
export class OngService {
  private apiUrl = 'http://localhost:3001/ongs'; // Assumindo que sua API Node.js está rodando na porta 3000

  constructor(private http: HttpClient) { }

  getOngs(): Observable<Ong[]> {
    return this.http.get<Ong[]>(this.apiUrl);
  }

  getOngById(id: number): Observable<Ong> {
    return this.http.get<Ong>(`${this.apiUrl}/${id}`);
  }
}
