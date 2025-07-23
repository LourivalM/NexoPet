import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ong } from '../models/ong';

@Injectable({
  providedIn: 'root'
})
export class OngService {
  private apiUrl = 'https://backend-api-tcc.onrender.com/ongs';

  constructor(private http: HttpClient) { }

  getOngs(): Observable<Ong[]> {
    return this.http.get<Ong[]>(this.apiUrl);
  }

  getOngById(id: number): Observable<Ong> {
    return this.http.get<Ong>(`${this.apiUrl}/${id}`);
  }
}
