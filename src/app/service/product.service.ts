import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) { }

  private uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<{ imageUrl: string }>(this.uploadUrl, formData);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product, file: File | null): Observable<Product> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          product.imageUrl = uploadResponse.imageUrl;
          return this.http.post<Product>(this.apiUrl, product);
        })
      );
    } else {
      return this.http.post<Product>(this.apiUrl, product);
    }
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

  updateProduct(productId: number, productData: any, file: File | null): Observable<Product> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          productData.imageUrl = uploadResponse.imageUrl;
          return this.http.patch<Product>(`${this.apiUrl}/${productId}`, productData);
        })
      );
    } else {
      return this.http.patch<Product>(`${this.apiUrl}/${productId}`, productData);
    }
  }
}
