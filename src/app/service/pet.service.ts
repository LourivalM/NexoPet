import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Pet } from '../models/pet';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = `${environment.apiUrl}/pets`;
  private uploadUrl = `${environment.apiUrl}/upload`;
  private _pets = new BehaviorSubject<Pet[]>([]);
  readonly pets$ = this._pets.asObservable();

  constructor(private http: HttpClient) { }

  private uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<{ imageUrl: string }>(this.uploadUrl, formData);
  }

  loadPets(): void {
    this.http.get<Pet[]>(this.apiUrl).subscribe(pets => {
      this._pets.next(pets);
    });
  }

  addPet(pet: Pet, file: File | null): Observable<Pet> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          pet.img = uploadResponse.imageUrl;
          return this.http.post<Pet>(this.apiUrl, pet);
        }),
        tap(newPet => {
          const currentPets = this._pets.getValue();
          this._pets.next([...currentPets, newPet]);
        })
      );
    } else {
      return this.http.post<Pet>(this.apiUrl, pet).pipe(
        tap(newPet => {
          const currentPets = this._pets.getValue();
          this._pets.next([...currentPets, newPet]);
        })
      );
    }
  }

  deletePet(petId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${petId}`).pipe(
      tap(() => {
        const currentPets = this._pets.getValue();
        this._pets.next(currentPets.filter(p => p.id !== petId));
      })
    );
  }

  updatePet(petId: number, petData: any, file: File | null): Observable<Pet> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          petData.img = uploadResponse.imageUrl;
          return this.http.patch<Pet>(`${this.apiUrl}/${petId}`, petData);
        }),
        tap(updatedPet => {
          const currentPets = this._pets.getValue();
          const index = currentPets.findIndex(p => p.id === updatedPet.id);
          if (index > -1) {
            currentPets[index] = updatedPet;
            this._pets.next([...currentPets]);
          }
        })
      );
    } else {
      return this.http.patch<Pet>(`${this.apiUrl}/${petId}`, petData).pipe(
        tap(updatedPet => {
          const currentPets = this._pets.getValue();
          const index = currentPets.findIndex(p => p.id === updatedPet.id);
          if (index > -1) {
            currentPets[index] = updatedPet;
            this._pets.next([...currentPets]);
          }
        })
      );
    }
  }
}
