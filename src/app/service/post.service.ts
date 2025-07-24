import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;
  private uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) { }

  private uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<{ imageUrl: string }>(this.uploadUrl, formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(postData: Post, file: File | null): Observable<Post> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          postData.imageUrl = uploadResponse.imageUrl;
          return this.http.post<Post>(this.apiUrl, postData);
        })
      );
    } else {
      return this.http.post<Post>(this.apiUrl, postData);
    }
  }

  likePost(postId: number, userId: number): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${postId}/like`, { userId });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: number, postData: any, file: File | null): Observable<Post> {
    if (file) {
      return this.uploadImage(file).pipe(
        switchMap(uploadResponse => {
          postData.imageUrl = uploadResponse.imageUrl;
          return this.http.patch<Post>(`${this.apiUrl}/${postId}`, postData);
        })
      );
    } else {
      return this.http.patch<Post>(`${this.apiUrl}/${postId}`, postData);
    }
  }
}
