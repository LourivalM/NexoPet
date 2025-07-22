import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../service/post.service';
import { UserService } from '../../../service/user.service';
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
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
  @Output() liked = new EventEmitter<Post>();
  currentUser: Usuario | null = null;
  postOwnerName: string = 'Desconhecido';
  postOwnerType: string = '';
  showConfirmationModal: boolean = false;

  private postService = inject(PostService);
  private userService = inject(UserService);

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
          this.postOwnerType = user.tipo;
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
        this.liked.emit(this.post);
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

  onEditClick(): void {
    this.edit.emit(this.post);
  }

  openDeleteConfirmation(): void {
    this.showConfirmationModal = true;
  }

  closeDeleteConfirmation(): void {
    this.showConfirmationModal = false;
  }

  confirmDelete(): void {
    if (this.post && this.post.id) {
      this.delete.emit(this.post.id);
      this.closeDeleteConfirmation();
    }
  }
}

