import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashBoard {
  http=inject(HttpClient)

  getPets(): Observable <Pet[]> {
    return this.http.get<Pet[]>(`${environment.apiUrl}/pets`)
  }
}
