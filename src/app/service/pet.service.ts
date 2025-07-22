import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) { }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  // Você pode adicionar mais métodos aqui, como updatePet, deletePet, getPetById

  deletePet(petId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${petId}`);
  }

  updatePet(petId: number, petData: any): Observable<Pet> {
    return this.http.patch<Pet>(`${this.apiUrl}/${petId}`, petData);
  }
}
