import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { loginService } from '../../../service/login'; // Importar loginService
import { Usuario } from '../../../models/user';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: Post;
  currentUser: Usuario | null = null; // Propriedade para armazenar o usuário logado

  private postService = inject(PostService);
  private loginService = inject(loginService); // Injetar loginService

  constructor() {
    this.loginService.currentUser.subscribe((user: Usuario | null) => {
      this.currentUser = user;
    });
  }

  get imageUrl(): string {
    return `/assets/images/uploads/${this.post.imageUrl}`;
  }

  onLikeClick(): void {
    if (this.post.id !== undefined && this.currentUser && this.currentUser.id !== undefined) {
      this.postService.likePost(this.post.id, this.currentUser.id).subscribe(updatedPost => {
        this.post.likes = updatedPost.likes;
        this.post.likedByUsers = updatedPost.likedByUsers;
      });
    }
  }

  hasLiked(): boolean {
    if (this.currentUser && this.post.likedByUsers) {
      return this.post.likedByUsers.includes(this.currentUser.id);
    }
    return false;
  }
}
