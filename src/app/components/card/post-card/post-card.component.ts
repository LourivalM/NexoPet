import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { UserService } from '../../../service/user.service'; // Importar UserService
import { Usuario } from '../../../models/user';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  currentUser: Usuario | null = null;
  postOwnerName: string = 'Desconhecido';
  postOwnerType: string = ''; // Adicionado para armazenar o tipo do usuário
  showConfirmationModal: boolean = false;

  private postService = inject(PostService);
  private userService = inject(UserService); // Injetar UserService

  constructor() {
    this.userService.currentUser.subscribe((user: Usuario | null) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    if (this.post && this.post.userId) {
      this.userService.getUserById(this.post.userId).subscribe(user => {
        if (user) {
          this.postOwnerName = user.nickname || user.nome || 'Usuário';
          this.postOwnerType = user.tipo; // Armazena o tipo do usuário
          console.log(`Post ID: ${this.post.id}, Owner Type: ${this.postOwnerType}`); // Adicionado para depuração
        }
      });
    }
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
