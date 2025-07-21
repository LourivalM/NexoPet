import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { loginService } from '../../../service/login';
import { Usuario } from '../../../models/user';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: Post;
  currentUser: Usuario | null = null;
  showConfirmationModal: boolean = false;

  private postService = inject(PostService);
  private loginService = inject(loginService);

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

  isMyPost(): boolean {
    return this.currentUser?.id === this.post.userId;
  }

  openDeleteConfirmation(): void {
    this.showConfirmationModal = true;
  }

  closeDeleteConfirmation(): void {
    this.showConfirmationModal = false;
  }

  confirmDelete(): void {
    if (this.post && this.post.id) {
      this.postService.deletePost(this.post.id).subscribe({
        next: () => {
          console.log('Post deletado com sucesso!');
          // TODO: Emitir evento para o componente pai recarregar a lista de posts
          this.closeDeleteConfirmation();
        },
        error: (err: any) => {
          console.error('Erro ao deletar post:', err);
          this.closeDeleteConfirmation();
        }
      });
    }
  }
}
