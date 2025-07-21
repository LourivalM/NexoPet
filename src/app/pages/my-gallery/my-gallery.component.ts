import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { Usuario } from '../../models/user';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostCardComponent } from '../../components/card/post-card/post-card.component';

@Component({
  selector: 'app-my-gallery',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './my-gallery.component.html',
  styleUrl: './my-gallery.component.css'
})
export class MyGalleryComponent implements OnInit {
  userPosts$: Observable<Post[]> | undefined;
  currentUserId: number | null = null;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: Usuario | null) => {
      console.log('Current User from UserService:', user); // Adicionado para depuração
      if (user) {
        this.currentUserId = user.id;
        console.log('Current User ID:', this.currentUserId); // Adicionado para depuração
        this.loadUserPosts();
      } else {
        console.log('No user logged in.'); // Adicionado para depuração
      }
    });
  }

  loadUserPosts(): void {
    if (this.currentUserId !== null) {
      this.userPosts$ = this.postService.getPosts().pipe(
        map(posts => {
          console.log('Posts from service (before filter):', posts); // Adicionado para depuração
          const filteredPosts = posts.filter(post => post.userId === this.currentUserId);
          console.log('Filtered Posts (after filter):', filteredPosts); // Adicionado para depuração
          return filteredPosts;
        })
      );
    }
  }

  deletePost(postId: number | undefined): void {
    if (postId !== undefined) {
      this.postService.deletePost(postId).subscribe(() => {
        console.log(`Post com ID: ${postId} deletado com sucesso.`);
        this.loadUserPosts(); // Recarrega os posts após a exclusão
      });
    }
  }
}