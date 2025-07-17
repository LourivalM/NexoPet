import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashBoard {
  http=inject(HttpClient)

  getPets(): Observable <Pet[]> {
    return this.http.get<Pet[]>('http://localhost:3001/pets')
  }
}
